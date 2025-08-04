---
sidebar_position: 1
---

# API 认证

## 获取 API 密钥

要使用 Hubble Gateway API，您需要先获取 API 密钥。

### 申请步骤

1. 访问 [Hubble 开发者控制台](https://console.hubble.vision)
2. 注册或登录您的账户
3. 创建新的 API 密钥
4. 复制并安全保存您的密钥

## 使用 API 密钥

### HTTP 请求头

在所有 API 请求中，您需要在请求头中包含您的 API 密钥：

```http
X-API-Key: your-api-key-here
```

### 示例请求

```bash
curl -X POST "https://api.hubble.vision/tx/api/v1/sol/tx" \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"symbol": "SOL", "page": 1, "pageSize": 10}'
```

## 安全最佳实践

### 🔒 密钥安全

- **不要** 在客户端代码中硬编码 API 密钥
- **不要** 在公共仓库中提交 API 密钥
- **使用** 环境变量存储密钥
- **定期** 轮换您的 API 密钥

### 环境变量示例

```bash
# .env 文件
HUBBLE_API_KEY=your-api-key-here
```

```javascript
// Node.js 示例
const apiKey = process.env.HUBBLE_API_KEY;

const response = await fetch('https://api.hubble.vision/tx/api/v1/sol/tx', {
  headers: {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json'
  },
  // ...
});
```

## 错误处理

### 认证失败

如果 API 密钥无效或缺失，您将收到以下错误：

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing API key",
  "code": 401
}
```

### 配额限制

当达到 API 调用限制时：

```json
{
  "error": "Rate Limit Exceeded", 
  "message": "API rate limit exceeded",
  "code": 429,
  "retryAfter": 60
}
```

## 下一步

- [快速开始指南](./quick-start)
- [API 参考文档](/api/overview)
- [示例代码](/examples/javascript)
