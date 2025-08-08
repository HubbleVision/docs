# Transaction/Balance 文本化介绍

## 接口含义
- 提供 Solana 交易数据与余额数据的查询能力。

## 认证
- Header：`HUBBLE-API-KEY: <your-key>`（区分大小写）
- 基础路径：`https://api.hubble-rpc.xyz/`

## 端点与参数（常见）

### 1) POST /balance/api/v1/sol/balance（余额查询）
- 含义：查询指定钱包地址与代币合约的余额
- 入参（application/json）：
  - 常见字段：`walletAddress`、`tokenAddress`（具体字段名以在线表单/接口文档为准）
- 返回：代币余额等字段

### 2) POST /tx/api/v1/sol/tx（交易列表）
- 含义：按条件分页获取 Solana 交易记录
- 入参（application/json）：
  - `symbol` string（如 "SOL"）
  - 分页：`page`、`pageSize`
  - 可选过滤：`startTime`、`endTime`、`transactionType`、`minAmount`、`maxAmount`、`status`
  - 排序：`sortBy`（如 `blockTime|amount|fee`）、`sortOrder`（`asc|desc`）
- 返回：
  - `records[]`：`signature`、`blockTime`、`slot`、`fee`、`status`、`amount`、`from`、`to`、`instructions[]`、`meta{...}` 等
  - `pagination`：`page`、`pageSize`、`total`、`totalPages`、`hasNext`、`hasPrev`

## 错误与速率
- 常见状态码：400/401/403/429/500
- 达到速率限制返回 429，并包含 `Retry-After` 指引
