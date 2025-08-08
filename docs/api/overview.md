---
sidebar_position: 1
---

# API 概览

本网站汇集了 Hubble 的三类对外 API：Text2SQL、Transaction/Balance、OHLCV。

## 入口导航

- Text2SQL（智能 NL→SQL 与图表生成）
  - 参考文档：[/api/text2sql](/api/text2sql)
  - 基础路径：`https://api.hubble-rpc.xyz/agent/api/v1`
  - 认证 Header：`HUBBLE-API-Key: <your-key>`

- Transaction/Balance（交易与余额数据）
  - 参考文档：[/api/tx-balance](/api/tx-balance)
  - 基础路径：`https://api.hubble-rpc.xyz/`
  - 认证 Header：`HUBBLE-API-KEY: <your-key>`

- OHLCV（K 线数据）
  - 参考文档：[/api/ohlcv](/api/ohlcv)
  - 基础路径：`https://api.hubble-rpc.xyz/candle/api/v1`
  - 认证 Header：`HUBBLE-API-KEY: <your-key>`

> 注意：三个 API 的认证 Header 名区分大小写且不完全一致，请按上表使用。

---

## 统一说明

- 所有 API 均返回 JSON（除 Text2SQL 支持 SSE 流式）
- 分页字段与节流策略请以参考文档为准；速率限制达标时会返回 `429` 并包含 `Retry-After`
- 安全：不要在客户端硬编码敏感凭据；优先使用网关/代理下发临时凭据或服务端转发
