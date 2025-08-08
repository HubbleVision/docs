# OHLCV 程序化调用参考（用于本网站在线测试）

- 认证 Header：`HUBBLE-API-KEY: <your-key>`
- 本网站内置规范文件：`/api/solana-candle-api.swagger.json`

## curl 示例
```bash
curl -X POST 'https://api.hubble-rpc.xyz/candle/api/v1/sol/candle' \
  -H 'Content-Type: application/json' \
  -H 'HUBBLE-API-KEY: YOUR_KEY' \
  -d '{
    "symbol": "SOL/USDC",
    "interval": "1m",
    "limit": 100
  }'
```
