/**
 * API Playground 类型定义
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiKeyHeader = "HUBBLE-API-KEY";

export type ResponseExample = {
  statusCode: number;
  description: string;
  body: object | string;
};

export type CodeExample = {
  language: 'curl' | 'javascript' | 'python';
  label: string;
  code: string;
};

export type RequestParameter = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
};

export type EndpointConfig = {
  id: string;
  label: string;
  method: HttpMethod;
  path: string;
  description?: string;
  sampleBody?: object | null;
  supportsStream?: boolean;
  requestParameters?: RequestParameter[];
  responses?: ResponseExample[];
  codeExamples?: CodeExample[];
};

export type ApiConfig = {
  id: "text2sql" | "tx" | "ohlcv";
  label: string;
  baseUrl: string;
  apiKeyHeader: ApiKeyHeader;
  endpoints: EndpointConfig[];
};
