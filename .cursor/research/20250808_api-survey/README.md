# API 整合调研（2025-08-08）

目录结构：
- text2sql/：在线文档页与尝试抓取的 openapi/swagger JSON
- tx-balance/：在线文档页、doc.json（Swagger）与固定版本 YAML（v9.0.0-prod）
- ohlcv/：在线文档页、doc.json（Swagger）与固定版本 YAML（v5.0.0-prod）

## 链接与本地缓存

- Text2SQL
  - 在线文档: https://api.hubble-rpc.xyz/agent/api/v1/docs
  - 期望 OpenAPI: /agent/api/v1/openapi.json 或 /agent/api/v1/swagger.json（已尝试抓取到 text2sql/ 下，如有为空则服务端未暴露）
  - 本地: text2sql/index.html, text2sql/openapi.json, text2sql/swagger.json

- Transaction / Balance
  - 在线文档: https://api.hubble-rpc.xyz/tx/api/v1/swagger/index.html
  - OpenAPI JSON: https://api.hubble-rpc.xyz/tx/api/v1/swagger/doc.json（本地 tx-balance/doc.json）
  - 固定版本 YAML（GitHub tag）: v9.0.0-prod（本地 tx-balance/swagger.v9.0.0-prod.yaml）

- OHLCV
  - 在线文档: https://api.hubble-rpc.xyz/candle/api/v1/swagger/index.html
  - OpenAPI JSON: https://api.hubble-rpc.xyz/candle/api/v1/swagger/doc.json（本地 ohlcv/doc.json）
  - 固定版本 YAML（GitHub tag）: v5.0.0-prod（本地 ohlcv/swagger.v5.0.0-prod.yaml）

## 初步判断（用于框架选择）
- tx-balance 与 ohlcv：已存在稳定 Swagger/OpenAPI 源（doc.json + 固定版本 YAML），可直接采用 docusaurus-plugin-openapi-docs 主方案（含 Try It）。
- text2sql：若 openapi.json/swagger.json 未成功抓取，先用 SwaggerUI 嵌入在线页面作为临时 Try It；拿到 spec 后切换至主方案。

## 待确认点
- Text2SQL 是否提供稳定的 OpenAPI 导出路径；如无，是否考虑从后端导出规范并纳入版本管理。
- CORS：Try It 需确认服务端是否允许本站域名跨域（Origin/Headers/Methods）。

