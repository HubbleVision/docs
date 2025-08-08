# OHLCV 文本化介绍

## 接口含义
- 提供 Solana 生态的 K 线（开高低收量）数据查询，便于行情图表渲染与回测。

## 认证
- Header：`HUBBLE-API-KEY: <your-key>`
- 基础路径：`https://api.hubble-rpc.xyz/candle/api/v1`

## 端点与参数

### 1) POST /sol/candle（获取 K 线）
- 入参（application/json）：
  - 常见字段：`symbol`（如 `SOL/USDC`）、`interval`（如 `1m|5m|1h|1d`）、`limit`、可选时间窗口 `startTime/endTime`
- 返回（数组）：每根 K 线的 `timestamp`、`open`、`high`、`low`、`close`、`volume` 等

## 错误与速率
- 常见状态码：400/401/403/429/500
