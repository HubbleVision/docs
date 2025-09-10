/**
 * Transaction/Balance API 配置
 */

import type { ApiConfig } from '../../types/api-playground.types';

export const txBalanceApiConfig: ApiConfig = {
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
      requestParameters: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Token symbol (e.g., So11111111111111111111111111111111111111112)",
        },
        {
          name: "page",
          type: "number",
          required: false,
          description: "Page number for pagination",
          defaultValue: "1",
        },
        {
          name: "pageSize",
          type: "number",
          required: false,
          description: "Number of items per page",
          defaultValue: "20",
        },
        {
          name: "start_time",
          type: "integer",
          required: false,
          description: "Start time (Unix timestamp in seconds)",
        },
        {
          name: "end_time",
          type: "integer",
          required: false,
          description: "End time (Unix timestamp in seconds)",
        },
        {
          name: "min_amount",
          type: "number",
          required: false,
          description: "Minimum transaction amount (in SOL)",
        },
        {
          name: "max_amount",
          type: "number",
          required: false,
          description: "Maximum transaction amount (in SOL)",
        },
        {
          name: "min_value",
          type: "number",
          required: false,
          description: "Minimum transaction value (in USD)",
        },
        {
          name: "max_value",
          type: "number",
          required: false,
          description: "Maximum transaction value (in USD)",
        },
        {
          name: "trader",
          type: "string",
          required: false,
          description: "Filter by specific trader address",
        },
        {
          name: "source",
          type: "string",
          required: false,
          description: "Filter by DEX (Raydium, Pump Fun, Orca, etc.)",
        },
        {
          name: "types",
          type: "array",
          required: false,
          description:
            "Filter by transaction types (buy, sell, trade, add_liquidity, remove_liquidity)",
        },
        {
          name: "sort_by",
          type: "string",
          required: false,
          description: "Sort field: time, amount, value",
          defaultValue: "time",
        },
        {
          name: "sort_order",
          type: "string",
          required: false,
          description: "Sort direction: asc, desc",
          defaultValue: "desc",
        },
      ],
      codeExamples: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X POST "https://api.hubble-rpc.xyz/tx/api/v1/sol/tx" \\
  -H "Content-Type: application/json" \\
  -H "HUBBLE-API-KEY: your-api-key" \\
  -d '{
    "symbol": "So11111111111111111111111111111111111111112",
    "page": 1,
    "pageSize": 20
  }'`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `const response = await fetch('https://api.hubble-rpc.xyz/tx/api/v1/sol/tx', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'HUBBLE-API-KEY': 'your-api-key'
  },
  body: JSON.stringify({ 
    symbol: 'So11111111111111111111111111111111111111112',
    page: 1,
    pageSize: 20,
    start_time: 1642680000,
    end_time: 1642766400,
    types: ['buy', 'sell']
  })
});

const data = await response.json();`
        },
        {
          language: 'python',
          label: 'Python',
          code: `import requests

url = "https://api.hubble-rpc.xyz/tx/api/v1/sol/tx"
headers = {
    "Content-Type": "application/json",
    "HUBBLE-API-KEY": "your-api-key"
}
data = {
    "symbol": "So11111111111111111111111111111111111111112",
    "page": 1,
    "pageSize": 20,
    "start_time": 1642680000,
    "end_time": 1642766400,
    "types": ["buy", "sell"]
}

response = requests.post(url, json=data, headers=headers)
result = response.json()`
        }
      ],
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
                to: "Def456...uvw012",
              },
            ],
            pagination: {
              page: 1,
              pageSize: 20,
              total: 150,
              totalPages: 8,
            },
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 400,
          description: "Bad Request - Invalid parameters",
          body: {
            error: "Invalid symbol or pagination parameters",
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
          statusCode: 500,
          description: "Internal Server Error",
          body: {
            error: "Failed to retrieve transaction data",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
      ],
    },
    {
      id: "balance",
      label: "POST /balance/api/v1/sol/balance",
      method: "POST",
      path: "/balance/api/v1/sol/balance",
      description: "Get balance for a wallet address/token",
      sampleBody: {
        wallet: "FZ1t8TZtx7VSCQdBsxvFJiezj9paUBF6Ub7RKA2eTGyE",
        token: "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn",
      },
      requestParameters: [
        {
          name: "wallet",
          type: "string",
          required: true,
          description: "Solana wallet address",
        },
        {
          name: "token",
          type: "string",
          required: true,
          description: "Token mint address",
        },
      ],
      codeExamples: [
        {
          language: 'curl',
          label: 'cURL',
          code: `curl -X POST "https://api.hubble-rpc.xyz/balance/api/v1/sol/balance" \\
  -H "Content-Type: application/json" \\
  -H "HUBBLE-API-KEY: your-api-key" \\
  -d '{
    "wallet": "FZ1t8TZtx7VSCQdBsxvFJiezj9paUBF6Ub7RKA2eTGyE",
    "token": "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn"
  }'`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `const response = await fetch('https://api.hubble-rpc.xyz/balance/api/v1/sol/balance', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'HUBBLE-API-KEY': 'your-api-key'
  },
  body: JSON.stringify({ 
    wallet: 'FZ1t8TZtx7VSCQdBsxvFJiezj9paUBF6Ub7RKA2eTGyE',
    token: 'pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn'
  })
});

const data = await response.json();
console.log(\`Balance: \${data.uiAmount} \${data.symbol}\`);`
        },
        {
          language: 'python',
          label: 'Python',
          code: `import requests

url = "https://api.hubble-rpc.xyz/balance/api/v1/sol/balance"
headers = {
    "Content-Type": "application/json",
    "HUBBLE-API-KEY": "your-api-key"
}
data = {
    "wallet": "FZ1t8TZtx7VSCQdBsxvFJiezj9paUBF6Ub7RKA2eTGyE",
    "token": "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn"
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(f"Balance: {result['uiAmount']} {result['symbol']}")`
        }
      ],
      responses: [
        {
          statusCode: 200,
          description: "Balance retrieved successfully",
          body: {
            wallet: "FZ1t8TZtx7VSCQdBsxvFJiezj9paUBF6Ub7RKA2eTGyE",
            token: "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn",
            balance: "1250000000",
            decimals: 9,
            uiAmount: 1.25,
            symbol: "SOL",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 400,
          description: "Bad Request - Invalid wallet or token address",
          body: {
            error: "Invalid wallet address format",
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
          statusCode: 404,
          description: "Token account not found",
          body: {
            error:
              "Token account not found for the specified wallet and token",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
        {
          statusCode: 500,
          description: "Internal Server Error",
          body: {
            error: "Failed to retrieve balance data",
            timestamp: "2024-01-20T10:30:00Z",
          },
        },
      ],
    },
  ],
};
