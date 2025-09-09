/**
 * Text2SQL API 配置
 */

import type { ApiConfig } from '../../types/api-playground.types';

export const text2sqlApiConfig: ApiConfig = {
  id: "text2sql",
  label: "Text2SQL",
  baseUrl: "https://api.hubble-rpc.xyz/agent/api",
  apiKeyHeader: "HUBBLE-API-KEY",
  endpoints: [
    {
      id: "health-check",
      label: "GET /status",
      method: "GET",
      path: "/v2/status",
      description: "Health check",
      sampleBody: null,
      requestParameters: [],
      codeExamples: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X GET "https://api.hubble-rpc.xyz/agent/api/v2/status" \\
  -H "HUBBLE-API-KEY: your-api-key"`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `const response = await fetch('/agent/api/v2/status', {
  method: 'GET',
  headers: { 
    'HUBBLE-API-KEY': 'your-api-key'
  }
});

const data = await response.json();
console.log(data);`
        },
        {
          language: 'python',
          label: 'Python',
          code: `import requests

url = "https://api.hubble-rpc.xyz/agent/api/v2/status"
headers = {
    "HUBBLE-API-KEY": "your-api-key"
}

response = requests.get(url, headers=headers)
result = response.json()
print(result)`
        }
      ],
    },
    {
      id: "text2sql-conversion",
      label: "POST /text2sql",
      method: "POST",
      path: "/v2/text2sql",
      description: "Natural language to SQL to execution to results",
      sampleBody: {
        query: "Show me the top 10 token trades by volume today",
        stream: false,
      },
      supportsStream: true,
      requestParameters: [
        {
          name: "query",
          type: "string",
          required: true,
          description:
            "Natural language query to convert to SQL, like 'Show me the top 10 token trades by volume today'",
        },
        {
          name: "stream",
          type: "boolean",
          required: false,
          description: "Whether to return streaming response",
          defaultValue: "true",
        },
      ],
      codeExamples: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X POST "https://api.hubble-rpc.xyz/agent/api/v2/text2sql" \\
  -H "Content-Type: application/json" \\
  -H "HUBBLE-API-KEY: your-api-key" \\
  -d '{
    "query": "Show me the top 10 token trades by volume today",
    "stream": false
  }'`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `// Fetch + JSON (Non-streaming)
fetch("/agent/api/v2/text2sql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "HUBBLE-API-KEY": "your-api-key"
  },
  body: JSON.stringify({
    query: "Show me the top 10 token trades by volume today",
    stream: false
  })
}).then(res => res.json()).then(console.log);

// Fetch + SSE (Streaming)
fetch("/agent/api/v2/text2sql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "HUBBLE-API-KEY": "your-api-key"
  },
  body: JSON.stringify({
    query: "Show me the top 10 token trades by volume today",
    stream: true
  })
}).then(async response => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(decoder.decode(value));
  }
});`
        }
      ],
      responses: [
        {
          statusCode: 200,
          description: "Success (stream: false)",
          body: {
            id: "2dcc91df-6296-47ce-90b2-4a3e0b8b354c",
            status: "complete",
            query: "Show me the top 10 token trades by volume today",
            sql: "SELECT token_name, SUM(volume) as volume ... LIMIT 10",
            data: [
              { token_name: "Giggles", volume: "5344877.3 SOL" },
              { token_name: "DubX on SOL", volume: "4183920.3 SOL" },
              { token_name: "Polycule", volume: "3304656.1 SOL" },
            ],
            rowCount: 10,
            duration: 2700,
            timestamp: "2025-08-21T05:09:32.492Z",
          },
        },
        {
          statusCode: 200,
          description: "Success (stream: true)",
          body: `data: {"id":"...","phase":"plan","status":"start","message":"plan phase started",...}
data: {"id":"...","phase":"plan","status":"end","message":"plan phase completed","plan":["..."]}
data: {"id":"...","phase":"sql_generation","status":"start",...}
data: {"id":"...","phase":"sql_generation","status":"end","rowCount":10}
data: {"id":"...","phase":"data_display","status":"end","data":[{...},{...}],...}`,
        },
        {
          statusCode: 400,
          description: "Bad Request",
          body: {
            error: "Missing required field: query",
          },
        },
        {
          statusCode: 500,
          description: "Internal Server Error",
          body: {
            error: "Database connection failed",
          },
        },
      ],
    },
    {
      id: "generate-chart",
      label: "POST /generate-chart",
      method: "POST",
      path: "/v2/generate-chart",
      description:
        "Natural language to SQL to execution with automatic chart selection",
      sampleBody: {
        query: "Show token price trends over the last 30 days",
        stream: false,
      },
      supportsStream: true,
      requestParameters: [
        {
          name: "query",
          type: "string",
          required: true,
          description: "Natural language query",
        },
        {
          name: "stream",
          type: "boolean",
          required: false,
          description: "Whether to return streaming response",
          defaultValue: "true",
        },
      ],
      codeExamples: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X POST "https://api.hubble-rpc.xyz/agent/api/v2/generate-chart" \\
  -H "Content-Type: application/json" \\
  -H "HUBBLE-API-KEY: your-api-key" \\
  -d '{
    "query": "Show token price trends over the last 30 days",
    "stream": false
  }'`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `// Standard response
const response = await fetch('/agent/api/v2/generate-chart', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'HUBBLE-API-KEY': 'your-api-key'
  },
  body: JSON.stringify({ 
    query: 'Show token price trends over the last 30 days',
    stream: false
  })
});

const data = await response.json();
console.log(data);

// Streaming response
const streamResponse = await fetch('/agent/api/v2/generate-chart', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'HUBBLE-API-KEY': 'your-api-key'
  },
  body: JSON.stringify({ 
    query: 'Show token price trends over the last 30 days',
    stream: true
  })
});

const reader = streamResponse.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  console.log('Received:', chunk);
}`
        },
        {
          language: 'python',
          label: 'Python',
          code: `import requests
import json

url = "https://api.hubble-rpc.xyz/agent/api/v2/generate-chart"
headers = {
    "Content-Type": "application/json",
    "HUBBLE-API-KEY": "your-api-key"
}
data = {
    "query": "Show token price trends over the last 30 days",
    "stream": False
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(json.dumps(result, indent=2))

# For streaming response
data_stream = {
    "query": "Show token price trends over the last 30 days",
    "stream": True
}

stream_response = requests.post(url, json=data_stream, headers=headers, stream=True)
for line in stream_response.iter_lines():
    if line:
        print(line.decode('utf-8'))`
        }
      ],
      responses: [
        {
          statusCode: 200,
          description: "Chart generation successful",
          body: {
            sql: "SELECT date, price FROM token_prices WHERE date >= CURRENT_DATE - INTERVAL '30 days'",
            data: [
              { date: "2024-01-01", price: 100.5 },
              { date: "2024-01-02", price: 102.3 },
              { date: "2024-01-03", price: 98.7 },
            ],
            chart: {
              chartType: "line",
              htmlCode:
                '<div class="chart-container"><canvas id="chart"></canvas></div>',
              previewUrl: "https://charts.hubble-rpc.xyz/preview/abc123",
              dataInsights: [
                "Price shows upward trend",
                "Peak reached on January 15th",
                "Average daily volume: $2.5M",
              ],
              generationTime: 1500,
            },
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 400,
          description: "Bad Request - Invalid parameters",
          body: {
            error: "Query parameter cannot be empty",
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
            error: "Chart generation failed, please try again later",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
      ],
    },
  ],
};
