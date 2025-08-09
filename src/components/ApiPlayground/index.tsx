import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiKeyHeader = "HUBBLE-API-Key" | "HUBBLE-API-KEY";

type EndpointConfig = {
  id: string;
  label: string;
  method: HttpMethod;
  path: string;
  description?: string;
  sampleBody?: object | null;
  supportsStream?: boolean;
};

type ApiConfig = {
  id: "text2sql" | "tx" | "ohlcv";
  label: string;
  baseUrl: string;
  apiKeyHeader: ApiKeyHeader;
  endpoints: EndpointConfig[];
};

const API_CONFIGS: ApiConfig[] = [
  {
    id: "text2sql",
    label: "Text2SQL",
    baseUrl: "https://api.hubble-rpc.xyz/agent/api/v1",
    apiKeyHeader: "HUBBLE-API-Key",
    endpoints: [
      {
        id: "status",
        label: "GET /status",
        method: "GET",
        path: "/status",
        description: "Health check",
        sampleBody: null,
      },
      {
        id: "text2sql",
        label: "POST /text2sql",
        method: "POST",
        path: "/text2sql",
        description: "Natural language to SQL to execution to results",
        sampleBody: {
          query: "Show me the top 10 token trades by volume today",
          stream: false,
        },
        supportsStream: true,
      },
      {
        id: "generate-chart",
        label: "POST /generate-chart",
        method: "POST",
        path: "/generate-chart",
        description:
          "Natural language to SQL to execution with automatic chart selection",
        sampleBody: {
          query: "Show token price trends over the last 30 days",
          stream: false,
        },
        supportsStream: true,
      },
    ],
  },
  {
    id: "tx",
    label: "Transaction/Balance",
    baseUrl: "https://api.hubble-rpc.xyz",
    apiKeyHeader: "HUBBLE-API-KEY",
    endpoints: [
      {
        id: "tx-list",
        label: "POST /tx/api/v1/sol/tx",
        method: "POST",
        path: "/tx/api/v1/sol/tx",
        description: "Get transaction list (paginated)",
        sampleBody: {
          symbol: "SOL",
          page: 1,
          pageSize: 20,
        },
      },
      {
        id: "balance",
        label: "POST /balance/api/v1/sol/balance",
        method: "POST",
        path: "/balance/api/v1/sol/balance",
        description: "Get balance for a wallet address/token",
        sampleBody: {
          walletAddress: "<address>",
          tokenAddress: "<mint>",
        },
      },
    ],
  },
  {
    id: "ohlcv",
    label: "OHLCV",
    baseUrl: "https://api.hubble-rpc.xyz/candle/api/v1",
    apiKeyHeader: "HUBBLE-API-KEY",
    endpoints: [
      {
        id: "candle",
        label: "POST /sol/candle",
        method: "POST",
        path: "/sol/candle",
        description: "Fetch OHLCV candle data",
        sampleBody: {
          symbol: "SOL/USDC",
          interval: "1m",
          limit: 100,
        },
      },
    ],
  },
];

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

export default function ApiPlayground(): React.ReactNode {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const initialApi = (params.get("api") as ApiConfig["id"]) || "text2sql";
  const [apiId, setApiId] = useState<ApiConfig["id"]>(initialApi);
  const api = useMemo(() => API_CONFIGS.find((a) => a.id === apiId)!, [apiId]);
  const initialEndpoint = params.get("endpoint") || api.endpoints[0].id;
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

  // keep url/method/body in sync with selection
  useEffect(() => {
    setUrl(api.baseUrl + endpoint.path);
    setMethod(endpoint.method);
    setBodyText(endpoint.sampleBody ? pretty(endpoint.sampleBody) : "");
  }, [api.baseUrl, endpoint]);

  // ensure api header exists in headers JSON
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
    // only update when api changes
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

      // detect stream flag in JSON body for Text2SQL
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
          // stream chunks
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
        <div className={styles.block}>
          <div className={styles.blockTitle}>Select API</div>
          <select
            value={apiId}
            onChange={(e) => setApiId(e.target.value as any)}
            className={styles.select}
          >
            {API_CONFIGS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>Endpoint</div>
          <select
            value={endpointId}
            onChange={(e) => setEndpointId(e.target.value)}
            className={styles.select}
          >
            {api.endpoints.map((ep) => (
              <option key={ep.id} value={ep.id}>
                {ep.label}
              </option>
            ))}
          </select>
          {endpoint.description && (
            <div className={styles.muted}>{endpoint.description}</div>
          )}
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>Authentication</div>
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
          <div className={styles.blockTitle}>Headers (JSON)</div>
          <textarea
            className={styles.textarea}
            value={headersText}
            onChange={(e) => setHeadersText(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.row}>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className={styles.methodSelect}
          >
            {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            className={styles.urlInput}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
            <div className={styles.blockTitle}>Body (JSON)</div>
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
          <div className={styles.blockTitle}>Response</div>
          <div className={styles.statusLine}>{statusLine}</div>
          {respHeaders && (
            <details className={styles.details}>
              <summary>Response Headers</summary>
              <pre className={styles.pre}>{respHeaders}</pre>
            </details>
          )}
          <div ref={outputRef} className={styles.responseBox}>
            <pre className={styles.pre}>{respBody}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
