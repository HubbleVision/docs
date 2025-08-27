/**
 * API Playground 配置文件
 *
 * 此文件包含了所有 API 接口的配置信息，便于后续添加新的 API 接口
 */

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiKeyHeader = "HUBBLE-API-KEY";

type ResponseExample = {
  statusCode: number;
  description: string;
  body: object;
};

type EndpointConfig = {
  id: string;
  label: string;
  method: HttpMethod;
  path: string;
  description?: string;
  sampleBody?: object | null;
  supportsStream?: boolean;
  responses?: ResponseExample[];
};

type ApiConfig = {
  id: "text2sql" | "tx" | "ohlcv";
  label: string;
  baseUrl: string;
  apiKeyHeader: ApiKeyHeader;
  endpoints: EndpointConfig[];
};

export const API_CONFIGS: ApiConfig[] = [
  {
    id: "text2sql",
    label: "Text2SQL",
    baseUrl: "https://api.hubble-rpc.xyz/agent/api/v1",
    apiKeyHeader: "HUBBLE-API-KEY",
    endpoints: [
      {
        id: "health-check",
        label: "GET /status",
        method: "GET",
        path: "/status",
        description: "Health check",
        sampleBody: null,
      },
      {
        id: "text2sql-conversion",
        label: "POST /text2sql",
        method: "POST",
        path: "/text2sql",
        description: "Natural language to SQL to execution to results",
        sampleBody: {
          query: "Show me the top 10 token trades by volume today",
          stream: false,
        },
        supportsStream: true,
        responses: [
          {
            statusCode: 200,
            description: "Query executed successfully",
            body: {
              data: [
                { token: "SOL", volume: 1500000.50, date: "2024-01-20" },
                { token: "ETH", volume: 2500000.75, date: "2024-01-20" }
              ],
              sql: "SELECT token, volume, date FROM trades WHERE date = CURRENT_DATE ORDER BY volume DESC LIMIT 10",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 400,
            description: "Bad Request - Invalid parameters",
            body: {
              error: "Query parameter cannot be empty",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 401,
            description: "Unauthorized - Invalid API key",
            body: {
              error: "Invalid or missing API key",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 500,
            description: "Internal Server Error",
            body: {
              error: "SQL generation failed, please try again later",
              timestamp: "2024-01-20T10:30:00Z"
            }
          }
        ]
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
        responses: [
          {
            statusCode: 200,
            description: "Chart generation successful",
            body: {
              sql: "SELECT date, price FROM token_prices WHERE date >= CURRENT_DATE - INTERVAL '30 days'",
              data: [
                { date: "2024-01-01", price: 100.5 },
                { date: "2024-01-02", price: 102.3 },
                { date: "2024-01-03", price: 98.7 }
              ],
              chart: {
                chartType: "line",
                htmlCode: "<div class=\"chart-container\"><canvas id=\"chart\"></canvas></div>",
                previewUrl: "https://charts.hubble-rpc.xyz/preview/abc123",
                dataInsights: ["Price shows upward trend", "Peak reached on January 15th", "Average daily volume: $2.5M"],
                generationTime: 1500
              },
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 400,
            description: "Bad Request - Invalid parameters",
            body: {
              error: "Query parameter cannot be empty",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 401,
            description: "Unauthorized - Invalid API key",
            body: {
              error: "Invalid or missing API key",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 429,
            description: "Too Many Requests - Rate limit exceeded",
            body: {
              error: "Rate limit exceeded. Please try again in 60 seconds",
              retryAfter: 60,
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 500,
            description: "Internal Server Error",
            body: {
              error: "Chart generation failed, please try again later",
              timestamp: "2024-01-20T10:30:00Z"
            }
          }
        ]
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
        responses: [
          {
            statusCode: 200,
            description: "Transaction list retrieved successfully",
            body: {
              data: [
                {
                  signature: "5J8QhZrKhFz3sGd7vNjMxBpKqL9wXyEpF4H8VqMgGpJxD2",
                  blockTime: 1642680000,
                  slot: 123456789,
                  fee: 5000,
                  status: "confirmed",
                  amount: 1000000000,
                  from: "Abc123...xyz789",
                  to: "Def456...uvw012"
                }
              ],
              pagination: {
                page: 1,
                pageSize: 20,
                total: 150,
                totalPages: 8
              },
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 400,
            description: "Bad Request - Invalid parameters",
            body: {
              error: "Invalid symbol or pagination parameters",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 401,
            description: "Unauthorized - Invalid API key",
            body: {
              error: "Invalid or missing API key",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 500,
            description: "Internal Server Error",
            body: {
              error: "Failed to retrieve transaction data",
              timestamp: "2024-01-20T10:30:00Z"
            }
          }
        ]
      },
      {
        id: "balance",
        label: "POST /balance/api/v1/sol/balance",
        method: "POST",
        path: "/balance/api/v1/sol/balance",
        description: "Get balance for a wallet address/token",
        sampleBody: {
          walletAddress: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
          tokenAddress: "So11111111111111111111111111111111111111112",
        },
        responses: [
          {
            statusCode: 200,
            description: "Balance retrieved successfully",
            body: {
              walletAddress: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
              tokenAddress: "So11111111111111111111111111111111111111112",
              balance: "1250000000",
              decimals: 9,
              uiAmount: 1.25,
              symbol: "SOL",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 400,
            description: "Bad Request - Invalid wallet or token address",
            body: {
              error: "Invalid wallet address format",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 401,
            description: "Unauthorized - Invalid API key",
            body: {
              error: "Invalid or missing API key",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 404,
            description: "Token account not found",
            body: {
              error: "Token account not found for the specified wallet and token",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 500,
            description: "Internal Server Error",
            body: {
              error: "Failed to retrieve balance data",
              timestamp: "2024-01-20T10:30:00Z"
            }
          }
        ]
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
        responses: [
          {
            statusCode: 200,
            description: "Candle data retrieved successfully",
            body: {
              symbol: "SOL/USDC",
              interval: "1m",
              data: [
                {
                  timestamp: 1642680000000,
                  open: 150.25,
                  high: 151.50,
                  low: 149.80,
                  close: 150.75,
                  volume: 1250000.50
                },
                {
                  timestamp: 1642680060000,
                  open: 150.75,
                  high: 152.10,
                  low: 150.30,
                  close: 151.25,
                  volume: 980000.25
                }
              ],
              count: 100,
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 400,
            description: "Bad Request - Invalid parameters",
            body: {
              error: "Invalid symbol format or interval",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 401,
            description: "Unauthorized - Invalid API key",
            body: {
              error: "Invalid or missing API key",
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 429,
            description: "Too Many Requests - Rate limit exceeded",
            body: {
              error: "Rate limit exceeded. Please try again in 60 seconds",
              retryAfter: 60,
              timestamp: "2024-01-20T10:30:00Z"
            }
          },
          {
            statusCode: 500,
            description: "Internal Server Error",
            body: {
              error: "Failed to retrieve candle data",
              timestamp: "2024-01-20T10:30:00Z"
            }
          }
        ]
      },
    ],
  },
];

// 导出类型以供其他文件使用
export type { HttpMethod, ApiKeyHeader, ResponseExample, EndpointConfig, ApiConfig };
