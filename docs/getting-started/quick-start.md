---
sidebar_position: 2
---

# Quick Start

> Ensure you have obtained an API Key before using the APIs.

## Install dependencies

```bash
npm init -y
npm install axios
```

## Make your first request (example)

```bash
curl -X POST 'https://api.hubble-rpc.xyz/tx/api/v1/sol/tx' \
  -H 'Content-Type: application/json' \
  -H 'HUBBLE-API-KEY: YOUR_KEY' \
  -d '{
    "symbol": "SOL",
    "page": 1,
    "pageSize": 20
  }'
```

## Next steps

- 🔍 Browse the sidebar for complete API documentation
