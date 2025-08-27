---
sidebar_position: 1
---

# Authentication

## API Key header

- `HUBBLE-API-KEY: <your-key>` (Text2SQL, Tx/Balance, OHLCV)

## Example headers

```http
HUBBLE-API-KEY: YOUR_KEY
Content-Type: application/json
```

## FAQ

- Is the key case-sensitive? Yes. It must match the required header name per API.
- Can I put the key in URL? Not recommended. Use headers.

---

- [Quick Start](./quick-start)
