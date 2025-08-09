---
sidebar_position: 1
---

# 认证方式

## API Key 传递

- `HUBBLE-API-Key: <your-key>`（Text2SQL）
- `HUBBLE-API-KEY: <your-key>`（Tx/Balance、OHLCV）

## 示例 Header

```http
HUBBLE-API-Key: YOUR_KEY
Content-Type: application/json
```

## 常见问题

- Key 大小写是否敏感？是，需与各 API 要求一致。
- Key 是否可放在 URL？不建议，建议放入 Header。

---

- [快速开始指南](./quick-start)
- [API 参考文档](/api/overview)
