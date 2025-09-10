# Transaction/Balance 程序化调用参考（用于本网站在线测试）

- 认证 Header：`HUBBLE-API-KEY: <your-key>`
- 本网站内置规范文件：`/api/solana-data-api.swagger.json`

## curl 示例

### 交易列表
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

### 余额查询（示例）
```bash
curl -X POST 'https://api.hubble-rpc.xyz/balance/api/v1/sol/balance' \
  -H 'Content-Type: application/json' \
  -H 'HUBBLE-API-KEY: YOUR_KEY' \
  -d '{
    "wallet": "<address>",
    "token": "<mint>"
  }'
```
