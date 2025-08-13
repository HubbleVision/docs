# Text2SQL 程序化调用参考（用于本网站在线测试）

- 基础路径：`https://api.hubble-rpc.xyz/agent/api/v1`
- 认证 Header：`HUBBLE-API-KEY: <your-key>`
- 本网站内置规范文件：`/api/text2sql.openapi.json`（SwaggerUI 读取）

## curl 示例

### 非流式 JSON
```bash
curl -X POST 'https://api.hubble-rpc.xyz/agent/api/v1/text2sql' \
  -H 'Content-Type: application/json' \
  -H 'HUBBLE-API-KEY: YOUR_KEY' \
  -d '{
    "query": "Show me the top 10 token trades by volume today",
    "stream": false
  }'
```

### 流式 SSE
```bash
curl -N -X POST 'https://api.hubble-rpc.xyz/agent/api/v1/text2sql' \
  -H 'Content-Type: application/json' \
  -H 'HUBBLE-API-KEY: YOUR_KEY' \
  -d '{
    "query": "Show me the top 10 token trades by volume today",
    "stream": true
  }'
```
