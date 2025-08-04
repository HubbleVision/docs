---
sidebar_position: 1
---

# API 概览

Hubble Gateway API 提供了完整的 Solana 区块链数据访问接口。

## 基础信息

### 服务端点
```
https://api.hubble.vision/tx/api/v1
```

### 认证方式
所有 API 请求都需要在请求头中包含 API 密钥：
```http
X-API-Key: your-api-key-here
```

### 响应格式
所有 API 响应都使用 JSON 格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 实际数据内容
  }
}
```

## 可用端点

### 交易数据 API

#### POST /sol/tx
获取 Solana 交易数据，支持多种查询条件和分页。

**请求参数：**

| 参数名 | 类型 | 必需 | 描述 |
|--------|------|------|------|
| symbol | string | 是 | 代币符号，例如 "SOL" |
| page | integer | 否 | 页码，默认为 1 |
| pageSize | integer | 否 | 每页记录数，默认为 10，最大 100 |
| startTime | string | 否 | 开始时间 (ISO 8601 格式) |
| endTime | string | 否 | 结束时间 (ISO 8601 格式) |
| transactionType | string | 否 | 交易类型过滤 |
| minAmount | number | 否 | 最小金额过滤 |
| maxAmount | number | 否 | 最大金额过滤 |
| status | string | 否 | 交易状态过滤 |
| sortBy | string | 否 | 排序字段 |
| sortOrder | string | 否 | 排序方向 ("asc" 或 "desc") |

**请求示例：**

```bash
curl -X POST "https://api.hubble.vision/tx/api/v1/sol/tx" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "SOL",
    "page": 1,
    "pageSize": 20,
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-01-02T00:00:00Z",
    "sortBy": "blockTime",
    "sortOrder": "desc"
  }'
```

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "signature": "5j7s1QjCeeSgZ1qiLwuWZRxkcKRtqSAWjy8V4FXcRtEr...",
        "blockTime": 1640995200,
        "slot": 111111111,
        "fee": 5000,
        "status": "confirmed",
        "amount": 1000000000,
        "from": "11111111111111111111111111111112",
        "to": "22222222222222222222222222222223",
        "instructions": [
          {
            "programId": "11111111111111111111111111111111",
            "accounts": ["..."],
            "data": "..."
          }
        ],
        "meta": {
          "err": null,
          "fee": 5000,
          "preBalances": [1000000000, 0],
          "postBalances": [999995000, 1000000000],
          "logMessages": ["..."]
        }
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 1000,
      "totalPages": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 错误处理

### 错误响应格式

```json
{
  "code": 400,
  "message": "Invalid request parameters",
  "error": "symbol field is required"
}
```

### 常见错误码

| 状态码 | 错误类型 | 描述 | 解决方案 |
|--------|----------|------|----------|
| 400 | Bad Request | 请求参数错误 | 检查请求参数格式和必需字段 |
| 401 | Unauthorized | 认证失败 | 验证 API 密钥是否正确 |
| 403 | Forbidden | 权限不足 | 检查 API 密钥权限 |
| 429 | Too Many Requests | 请求频率限制 | 降低请求频率，遵守速率限制 |
| 500 | Internal Server Error | 服务器内部错误 | 稍后重试或联系技术支持 |
| 503 | Service Unavailable | 服务不可用 | 服务维护中，稍后重试 |

## 速率限制

为了确保服务稳定性，API 实施了以下速率限制：

- **每分钟**: 最多 60 次请求
- **每小时**: 最多 1000 次请求  
- **每天**: 最多 10000 次请求

当达到速率限制时，API 会返回 429 状态码，并在响应头中包含重试信息：

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640995260
Retry-After: 60
```

## 分页说明

所有返回列表数据的 API 都支持分页：

### 分页参数
- `page`: 页码，从 1 开始
- `pageSize`: 每页记录数，默认 10，最大 100

### 分页响应
```json
{
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 1000,
    "totalPages": 100,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 时间格式

所有时间字段都使用 ISO 8601 格式：

```
2024-01-01T00:00:00Z        # UTC 时间
2024-01-01T08:00:00+08:00   # 带时区的时间
```

## 下一步

- 🚀 [快速开始](/getting-started/quick-start)
- 🧪 [在线测试工具](/api/playground)
- 💡 [代码示例](/examples/javascript)
- 📧 [技术支持](mailto:support@hubble.vision)
