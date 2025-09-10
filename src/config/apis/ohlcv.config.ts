/**
 * OHLCV API 配置
 */

import type { ApiConfig } from '../../types/api-playground.types';

export const ohlcvApiConfig: ApiConfig = {
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
        symbol: "So11111111111111111111111111111111111111112",
        interval: "1m",
        limit: 100,
      },
      requestParameters: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Trading pair symbol (e.g., So11111111111111111111111111111111111111112)",
        },
        {
          name: "interval",
          type: "string",
          required: true,
          description: "Time interval (e.g., 1m, 5m, 1h, 1d)",
        },
        {
          name: "limit",
          type: "number",
          required: false,
          description: "Number of candles to return",
          defaultValue: "100",
        },
        {
          name: "startTime",
          type: "integer",
          required: false,
          description: "Start time (Unix timestamp in seconds)",
        },
        {
          name: "endTime",
          type: "integer",
          required: false,
          description: "End time (Unix timestamp in seconds)",
        },
      ],
      codeExamples: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X POST "https://api.hubble-rpc.xyz/candle/api/v1/sol/candle" \\
  -H "Content-Type: application/json" \\
  -H "HUBBLE-API-KEY: your-api-key" \\
  -d '{
    "symbol": "So11111111111111111111111111111111111111112",
    "interval": "1m",
    "limit": 100
  }'`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `const response = await fetch('https://api.hubble-rpc.xyz/candle/api/v1/sol/candle', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'HUBBLE-API-KEY': 'your-api-key'
  },
  body: JSON.stringify({ 
    symbol: 'So11111111111111111111111111111111111111112',
    interval: '1h',
    limit: 168, // Last week of hourly data
    startTime: Date.now() / 1000 - 7 * 24 * 60 * 60 // 7 days ago
  })
});

const data = await response.json();
console.log(\`Retrieved \${data.data.length} candles for \${data.symbol}\`);`
        },
        {
          language: 'python',
          label: 'Python',
          code: `import requests
import time

url = "https://api.hubble-rpc.xyz/candle/api/v1/sol/candle"
headers = {
    "Content-Type": "application/json",
    "HUBBLE-API-KEY": "your-api-key"
}
data = {
    "symbol": "So11111111111111111111111111111111111111112",
    "interval": "1d",
    "limit": 30,  # Last 30 days
    "startTime": int(time.time()) - 30 * 24 * 60 * 60  # 30 days ago
}

response = requests.post(url, json=data, headers=headers)
result = response.json()

for candle in result['data']:
    print(f"Date: {candle['timestamp']}, Close: \${candle['close']:.2f}")`
        }
      ],
      responses: [
        {
          statusCode: 200,
          description: "Candle data retrieved successfully",
          body: {
            symbol: "So11111111111111111111111111111111111111112",
            interval: "1m",
            data: [
              {
                timestamp: 1642680000000,
                open: 150.25,
                high: 151.5,
                low: 149.8,
                close: 150.75,
                volume: 1250000.5,
              },
              {
                timestamp: 1642680060000,
                open: 150.75,
                high: 152.1,
                low: 150.3,
                close: 151.25,
                volume: 980000.25,
              },
            ],
            count: 100,
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 400,
          description: "Bad Request - Invalid parameters",
          body: {
            error: "Invalid symbol format or interval",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 401,
          description: "Unauthorized - Invalid API key",
          body: {
            error: "Invalid or missing API key",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 429,
          description: "Too Many Requests - Rate limit exceeded",
          body: {
            error: "Rate limit exceeded. Please try again in 60 seconds",
            retryAfter: 60,
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 500,
          description: "Internal Server Error",
          body: {
            error: "Failed to retrieve candle data",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
      ],
    },
  ],
};
