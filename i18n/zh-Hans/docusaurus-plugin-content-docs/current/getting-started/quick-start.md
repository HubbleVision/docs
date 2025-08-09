---
sidebar_position: 2
---

# 快速开始

> 使用前请确保已获取 API Key。

## 安装依赖

```bash
npm init -y
npm install axios
```

## 发起第一个请求（示例）

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

## 下一步

- 🔍 [浏览完整 API 文档](/api/overview)
