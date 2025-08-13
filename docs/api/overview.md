---
sidebar_position: 1
---

# API Overview

This site aggregates three categories of public APIs from Hubble: Text2SQL, Transaction/Balance, and OHLCV.

## Entry points

- Text2SQL (Natural language → SQL and chart generation)
  - Docs: [/api/text2sql](/api/text2sql)
  - Base URL: `https://api.hubble-rpc.xyz/agent/api/v1`
  - Auth header: `HUBBLE-API-KEY: <your-key>`

- Transaction/Balance
  - Docs: [/api/tx-balance](/api/tx-balance)
  - Base URL: `https://api.hubble-rpc.xyz/`
  - Auth header: `HUBBLE-API-KEY: <your-key>`

- OHLCV (K-line data)
  - Docs: [/api/ohlcv](/api/ohlcv)
  - Base URL: `https://api.hubble-rpc.xyz/candle/api/v1`
  - Auth header: `HUBBLE-API-KEY: <your-key>`

> Note: The three APIs use slightly different, case-sensitive auth header names. Please follow the table above.

---

## General notes

- All APIs return JSON (Text2SQL also supports SSE streaming)
- Pagination fields and rate limits follow the specific reference pages; when throttled, you'll receive `429` with `Retry-After`
- Security: never hardcode credentials in clients; prefer gateway/proxy-issued temporary credentials or server-side forwarding
