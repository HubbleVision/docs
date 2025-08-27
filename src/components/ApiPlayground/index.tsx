import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import {
  API_CONFIGS,
  type HttpMethod,
  type ApiConfig,
} from "../../../api-playground.config";

function pretty(obj: unknown) {
  try {
    if (typeof obj === "string") {
      return JSON.stringify(JSON.parse(obj), null, 2);
    }
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

interface ApiPlaygroundProps {
  initialApi?: ApiConfig["id"];
  initialEndpoint?: string;
}

export default function ApiPlayground({
  initialApi: propInitialApi,
  initialEndpoint: propInitialEndpoint,
}: ApiPlaygroundProps = {}): React.ReactNode {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = useMemo(() => new URLSearchParams(search), [search]);

  // Priority: props -> URL params -> default value
  const initialApi =
    propInitialApi || (params.get("api") as ApiConfig["id"]) || "text2sql";
  const [apiId, setApiId] = useState<ApiConfig["id"]>(initialApi);
  const api = useMemo(() => API_CONFIGS.find((a) => a.id === apiId)!, [apiId]);

  const initialEndpoint =
    propInitialEndpoint || params.get("endpoint") || api.endpoints[0].id;
  const [endpointId, setEndpointId] = useState<string>(initialEndpoint);
  const endpoint = useMemo(
    () => api.endpoints.find((e) => e.id === endpointId)!,
    [api, endpointId]
  );

  const [apiKey, setApiKey] = useState<string>("");
  const [url, setUrl] = useState<string>(api.baseUrl + endpoint.path);
  const [method, setMethod] = useState<HttpMethod>(endpoint.method);
  const [headersText, setHeadersText] = useState<string>("{}");
  const [bodyText, setBodyText] = useState<string>(
    endpoint.sampleBody ? pretty(endpoint.sampleBody) : ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [statusLine, setStatusLine] = useState<string>("");
  const [respHeaders, setRespHeaders] = useState<string>("");
  const [respBody, setRespBody] = useState<string>("");
  const outputRef = useRef<HTMLDivElement | null>(null);

  // Keep URL/method/body in sync with selection
  useEffect(() => {
    setUrl(api.baseUrl + endpoint.path);
    setMethod(endpoint.method);
    setBodyText(endpoint.sampleBody ? pretty(endpoint.sampleBody) : "");
  }, [api.baseUrl, endpoint]);

  // Ensure API header exists in headers JSON
  useEffect(() => {
    try {
      const obj = headersText ? JSON.parse(headersText) : {};
      if (apiKey) {
        obj[api.apiKeyHeader] = apiKey;
      } else {
        delete obj[api.apiKeyHeader];
      }
      setHeadersText(pretty(obj));
      // eslint-disable-next-line no-empty
    } catch {}
    // Only update when API changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId, apiKey]);

  const sendRequest = useCallback(async () => {
    setLoading(true);
    setStatusLine("");
    setRespHeaders("");
    setRespBody("");

    const start = performance.now();
    try {
      let headers: Record<string, string> = {};
      try {
        headers = headersText ? JSON.parse(headersText) : {};
      } catch {
        setRespBody("Headers is not valid JSON");
        setLoading(false);
        return;
      }
      const init: RequestInit = { method, headers };
      if (method !== "GET" && bodyText) {
        init.body = bodyText;
        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "application/json";
        }
      }

      // Detect stream flag in JSON body for Text2SQL
      const isStream =
        endpoint.supportsStream &&
        (() => {
          try {
            const o = JSON.parse(bodyText || "{}");
            return Boolean(o.stream);
          } catch {
            return false;
          }
        })();

      if (isStream) {
        const res = await fetch(url, init);
        const time = Math.round(performance.now() - start);
        setStatusLine(`${res.status} ${res.statusText} · ${time} ms`);
        const headerLines: string[] = [];
        res.headers.forEach((v, k) => headerLines.push(`${k}: ${v}`));
        setRespHeaders(headerLines.join("\n"));
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (reader) {
          let aggregate = "";
          // Stream chunks
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            aggregate += chunk;
            setRespBody((prev) => prev + chunk);
            if (outputRef.current)
              outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
        } else {
          setRespBody("SSE stream is not available (Response.body is empty)");
        }
      } else {
        const res = await fetch(url, init);
        const time = Math.round(performance.now() - start);
        setStatusLine(`${res.status} ${res.statusText} · ${time} ms`);
        const headerLines: string[] = [];
        res.headers.forEach((v, k) => headerLines.push(`${k}: ${v}`));
        setRespHeaders(headerLines.join("\n"));
        const contentType = res.headers.get("content-type") || "";
        const text = await res.text();
        if (contentType.includes("application/json")) {
          setRespBody(pretty(text));
        } else {
          setRespBody(text);
        }
      }
    } catch (e: any) {
      setRespBody(`Request failed: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }, [bodyText, endpoint.supportsStream, headersText, method, url]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {/* <div className={styles.block}>
          <div className={styles.blockTitle}>Select API</div>
          <div className={styles.apiTabs}>
            {API_CONFIGS.map((a) => (
              <button
                key={a.id}
                className={`${styles.apiTab} ${apiId === a.id ? styles.active : ''}`}
                onClick={() => setApiId(a.id)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div> */}
        <div className={styles.block}>
          <div className={styles.blockTitle}>
            <span>🔗</span>
            Endpoint
          </div>
          <div className={styles.endpointDropdown}>
            <div className={styles.customSelectWrapper}>
              <select
                value={endpointId}
                onChange={(e) => setEndpointId(e.target.value)}
                className={styles.endpointSelect}
              >
                {api.endpoints.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.method} {ep.path}{" "}
                    {ep.description ? `- ${ep.description}` : ""}
                  </option>
                ))}
              </select>
              <div className={styles.selectIcon}></div>
            </div>
            <div className={styles.endpointPreview}>
              <div className={styles.endpointPreviewHeader}>
                <span
                  className={`${styles.endpointMethod} ${
                    styles[endpoint.method.toLowerCase()]
                  }`}
                >
                  {endpoint.method === "GET" && "📄"}
                  {endpoint.method === "POST" && "📝"}
                  {endpoint.method === "PUT" && "✏️"}
                  {endpoint.method === "PATCH" && "🔧"}
                  {endpoint.method === "DELETE" && "🗑️"}
                  {endpoint.method}
                </span>
                <span className={styles.endpointPath}>{endpoint.path}</span>
              </div>
              {endpoint.description && (
                <div className={styles.endpointDescription}>
                  {endpoint.description}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>
            <span>🔐</span>
            Authentication
          </div>
          <div className={styles.kvRow}>
            <div className={styles.kvKey}>{api.apiKeyHeader}</div>
            <input
              className={styles.input}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={"your-api-key"}
            />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>
            <span>📋</span>
            Headers (JSON)
          </div>
          <textarea
            className={styles.textarea}
            value={headersText}
            onChange={(e) => setHeadersText(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.method}>{method}</div>
          <input
            className={styles.urlInput}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled
          />
          <button
            className={styles.sendBtn}
            disabled={loading}
            onClick={sendRequest}
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </div>

        {method !== "GET" && (
          <div className={styles.block}>
            <div className={styles.blockTitle}>
              <span>📝</span>
              Body (JSON)
            </div>
            <textarea
              className={styles.codeArea}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
            />
            {endpoint.supportsStream && (
              <div className={styles.muted}>
                Tip: Text2SQL/Chart will return SSE stream when "stream": true.
              </div>
            )}
          </div>
        )}

        <div className={styles.block}>
          <div className={styles.blockTitle}>
            <span>📤</span>
            Response
          </div>
          {statusLine && (
            <div className={styles.statusLine}>{statusLine}</div>
          )}
          {respHeaders && (
            <details className={styles.details}>
              <summary>📋 Response Headers</summary>
              <pre className={styles.pre}>{respHeaders}</pre>
            </details>
          )}
          <div ref={outputRef} className={styles.responseBox}>
            {!respBody && !loading && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>💭</div>
                <div className={styles.emptyTitle}>Waiting for Response</div>
                <div className={styles.emptySubtitle}>
                  Click the "Send" button to send a request and view the response
                </div>
              </div>
            )}
            {loading && (
              <div className={styles.loadingState}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingText}>Sending request...</div>
              </div>
            )}
            {respBody && !loading && (
              <div className={styles.responseContent}>
                <div className={styles.responseHeader}>
                  <span className={styles.responseLabel}>📄 Response Content</span>
                  <button
                    className={styles.copyButton}
                    onClick={() => navigator.clipboard.writeText(respBody)}
                    title="Copy response content"
                  >
                    📋
                  </button>
                </div>
                <pre className={styles.pre}>{respBody}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
