---
sidebar_position: 1
---

# Hubble Gateway API 文档

欢迎使用 **Hubble Gateway API**！这是一个强大的 Solana 区块链数据网关服务。

## 🚀 快速开始

Hubble Gateway 提供了完整的 Solana 区块链数据访问接口，让您可以轻松获取交易数据、账户信息等。

### 主要特性

- 🔍 **交易数据查询** - 支持多种条件的交易数据检索
- 📊 **实时数据** - 提供最新的区块链数据
- 🔐 **API 密钥认证** - 安全的访问控制
- 📈 **分页支持** - 高效的大数据集处理
- 🎯 **RESTful API** - 标准的 HTTP 接口

## 🔧 API 基础信息

### 基础 URL
```
https://api.hubble.vision/tx/api/v1
```

### 认证方式
所有 API 请求都需要在请求头中包含 API 密钥：
```http
X-API-Key: your-api-key-here
```

### 响应格式
所有 API 响应都使用 JSON 格式，并包含标准的状态码和错误信息。

## 📚 API 文档

### [🔗 完整 API 参考](/api/overview)
查看完整的 API 规范，包括所有端点、参数和响应格式。

### [⚡ 在线调试](/api/playground)
直接在浏览器中测试 API 接口，无需额外工具。

## 🎯 快速示例

### 获取交易数据

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

### JavaScript 示例

```javascript
const response = await fetch('https://api.hubble.vision/tx/api/v1/sol/tx', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    symbol: 'SOL',
    page: 1,
    pageSize: 10
  })
});

const data = await response.json();
console.log(data);
```

## 🆘 需要帮助？

- 📧 **技术支持**: support@hubble.vision
- 🌐 **官方网站**: [https://hubble.vision](https://hubble.vision)
- 📖 **API 规范**: 查看左侧导航中的 API 文档

开始探索 Hubble Gateway API 的强大功能吧！
