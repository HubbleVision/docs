---
sidebar_position: 2
---

# API 在线测试工具

在这里你可以直接测试 Hubble Gateway API，无需安装任何工具。

## 🧪 交易数据查询测试

### 基础查询

<details>
<summary>点击展开测试表单</summary>

**请求配置：**
- **方法**: POST
- **URL**: `https://api.hubble.vision/tx/api/v1/sol/tx`
- **请求头**: 
  ```
  X-API-Key: your-api-key-here
  Content-Type: application/json
  ```

**请求体示例：**

```json
{
  "symbol": "SOL",
  "page": 1,
  "pageSize": 10
}
```

**使用 curl 测试：**

```bash
curl -X POST "https://api.hubble.vision/tx/api/v1/sol/tx" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "SOL",
    "page": 1,
    "pageSize": 10
  }'
```

</details>

### 高级查询

<details>
<summary>时间范围查询</summary>

```json
{
  "symbol": "SOL",
  "startTime": "2024-01-01T00:00:00Z",
  "endTime": "2024-01-02T00:00:00Z",
  "page": 1,
  "pageSize": 20,
  "sortBy": "blockTime",
  "sortOrder": "desc"
}
```

**curl 命令：**

```bash
curl -X POST "https://api.hubble.vision/tx/api/v1/sol/tx" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "SOL",
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-01-02T00:00:00Z",
    "page": 1,
    "pageSize": 20,
    "sortBy": "blockTime",
    "sortOrder": "desc"
  }'
```

</details>

<details>
<summary>金额过滤查询</summary>

```json
{
  "symbol": "SOL",
  "minAmount": 1000000000,
  "maxAmount": 10000000000,
  "page": 1,
  "pageSize": 15
}
```

**curl 命令：**

```bash
curl -X POST "https://api.hubble.vision/tx/api/v1/sol/tx" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "SOL",
    "minAmount": 1000000000,
    "maxAmount": 10000000000,
    "page": 1,
    "pageSize": 15
  }'
```

</details>

## 📋 请求参数说明

### 必需参数

| 参数名 | 类型 | 描述 | 示例 |
|--------|------|------|------|
| symbol | string | 代币符号 | "SOL" |

### 可选参数

| 参数名 | 类型 | 描述 | 默认值 | 示例 |
|--------|------|------|-------|------|
| page | integer | 页码 | 1 | 1 |
| pageSize | integer | 每页记录数 | 10 | 20 |
| startTime | string | 开始时间 (ISO 8601) | - | "2024-01-01T00:00:00Z" |
| endTime | string | 结束时间 (ISO 8601) | - | "2024-01-02T00:00:00Z" |
| transactionType | string | 交易类型 | - | "transfer" |
| minAmount | number | 最小金额 (lamports) | - | 1000000000 |
| maxAmount | number | 最大金额 (lamports) | - | 10000000000 |
| status | string | 交易状态 | - | "confirmed" |
| sortBy | string | 排序字段 | "blockTime" | "blockTime", "amount", "fee" |
| sortOrder | string | 排序方向 | "desc" | "asc", "desc" |

## 📊 响应格式说明

### 成功响应

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "signature": "交易签名",
        "blockTime": 1640995200,
        "slot": 111111111,
        "fee": 5000,
        "status": "confirmed",
        "amount": 1000000000,
        "from": "发送方地址",
        "to": "接收方地址",
        "instructions": [...],
        "meta": {...}
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 1000,
      "totalPages": 100,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "Invalid request parameters",
  "error": "详细错误信息"
}
```

## 🔧 常用测试场景

### 1. 获取最新交易

```json
{
  "symbol": "SOL",
  "page": 1,
  "pageSize": 10,
  "sortBy": "blockTime",
  "sortOrder": "desc"
}
```

### 2. 查询大额交易

```json
{
  "symbol": "SOL",
  "minAmount": 10000000000,
  "page": 1,
  "pageSize": 20,
  "sortBy": "amount",
  "sortOrder": "desc"
}
```

### 3. 查询特定时间段

```json
{
  "symbol": "SOL",
  "startTime": "2024-01-01T00:00:00Z",
  "endTime": "2024-01-01T23:59:59Z",
  "page": 1,
  "pageSize": 50
}
```

### 4. 查询失败交易

```json
{
  "symbol": "SOL",
  "status": "failed",
  "page": 1,
  "pageSize": 10
}
```

## 🛠️ 开发工具推荐

### Postman 集合

你可以导入以下 Postman 集合来快速开始测试：

```json
{
  "info": {
    "name": "Hubble Gateway API",
    "description": "Hubble Gateway API 测试集合"
  },
  "item": [
    {
      "name": "Get Transactions",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "X-API-Key",
            "value": "{{api_key}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"symbol\": \"SOL\",\n  \"page\": 1,\n  \"pageSize\": 10\n}"
        },
        "url": {
          "raw": "https://api.hubble.vision/tx/api/v1/sol/tx",
          "protocol": "https",
          "host": ["api", "hubble", "vision"],
          "path": ["tx", "api", "v1", "sol", "tx"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "api_key",
      "value": "your-api-key-here"
    }
  ]
}
```

### Insomnia 配置

```json
{
  "_type": "request",
  "name": "Get Transactions",
  "method": "POST",
  "url": "https://api.hubble.vision/tx/api/v1/sol/tx",
  "headers": [
    {
      "name": "X-API-Key",
      "value": "{{ api_key }}"
    },
    {
      "name": "Content-Type", 
      "value": "application/json"
    }
  ],
  "body": {
    "mimeType": "application/json",
    "text": "{\n  \"symbol\": \"SOL\",\n  \"page\": 1,\n  \"pageSize\": 10\n}"
  }
}
```

## 🐛 调试技巧

### 1. 检查 API 密钥

确保你的 API 密钥：
- 格式正确
- 没有多余的空格
- 具有正确的权限

### 2. 验证请求格式

- Content-Type 必须是 `application/json`
- 请求体必须是有效的 JSON
- 时间格式必须是 ISO 8601

### 3. 处理分页

```javascript
// JavaScript 示例：获取所有数据
async function getAllTransactions(baseParams) {
  let allRecords = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch('https://api.hubble.vision/tx/api/v1/sol/tx', {
      method: 'POST',
      headers: {
        'X-API-Key': 'your-api-key',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...baseParams,
        page,
        pageSize: 100
      })
    });

    const data = await response.json();
    allRecords.push(...data.data.records);
    
    hasMore = data.data.pagination.hasNext;
    page++;
  }

  return allRecords;
}
```

## 💡 最佳实践

1. **使用合适的分页大小**: 建议使用 10-50 的 pageSize
2. **实现重试机制**: 处理网络错误和临时服务不可用
3. **缓存结果**: 对于不经常变化的数据，考虑客户端缓存
4. **监控配额**: 注意 API 调用限制，避免超出配额
5. **错误处理**: 始终检查响应状态码和错误信息

## 🔗 相关链接

- [API 概览](/api/overview)
- [认证指南](/getting-started/authentication)
- [JavaScript 示例](/examples/javascript)
