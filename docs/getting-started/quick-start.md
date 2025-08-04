---
sidebar_position: 2
---

# 快速开始

本指南将帮助您在几分钟内开始使用 Hubble Gateway API。

## 前置条件

- 有效的 API 密钥（[获取方式](./authentication)）
- 基本的 HTTP 请求知识
- 支持 JSON 的开发环境

## 第一个 API 调用

### 1. 基础请求

让我们从最简单的交易数据查询开始：

```bash
curl -X POST "https://api.hubble.vision/tx/api/v1/sol/tx" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "SOL",
    "page": 1,
    "pageSize": 5
  }'
```

### 2. 响应示例

成功的响应将返回以下格式的数据：

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
        "instructions": [...]
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 5,
      "total": 1000,
      "totalPages": 200
    }
  }
}
```

## 常用编程语言示例

### JavaScript/Node.js

```javascript
const axios = require('axios');

async function getTransactions() {
  try {
    const response = await axios.post(
      'https://api.hubble.vision/tx/api/v1/sol/tx',
      {
        symbol: 'SOL',
        page: 1,
        pageSize: 10
      },
      {
        headers: {
          'X-API-Key': process.env.HUBBLE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('交易数据:', response.data);
    return response.data;
  } catch (error) {
    console.error('请求失败:', error.response?.data || error.message);
  }
}

getTransactions();
```

### Python

```python
import requests
import os

def get_transactions():
    url = "https://api.hubble.vision/tx/api/v1/sol/tx"
    headers = {
        "X-API-Key": os.getenv("HUBBLE_API_KEY"),
        "Content-Type": "application/json"
    }
    data = {
        "symbol": "SOL",
        "page": 1,
        "pageSize": 10
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        
        result = response.json()
        print("交易数据:", result)
        return result
    except requests.exceptions.RequestException as e:
        print(f"请求失败: {e}")

get_transactions()
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

type TransactionRequest struct {
    Symbol   string `json:"symbol"`
    Page     int    `json:"page"`
    PageSize int    `json:"pageSize"`
}

func getTransactions() error {
    url := "https://api.hubble.vision/tx/api/v1/sol/tx"
    
    reqData := TransactionRequest{
        Symbol:   "SOL",
        Page:     1,
        PageSize: 10,
    }
    
    jsonData, err := json.Marshal(reqData)
    if err != nil {
        return err
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    
    req.Header.Set("X-API-Key", os.Getenv("HUBBLE_API_KEY"))
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    var result map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return err
    }
    
    fmt.Printf("交易数据: %+v\n", result)
    return nil
}

func main() {
    if err := getTransactions(); err != nil {
        fmt.Printf("请求失败: %v\n", err)
    }
}
```

## 高级查询

### 按时间范围查询

```json
{
  "symbol": "SOL",
  "startTime": "2024-01-01T00:00:00Z",
  "endTime": "2024-01-02T00:00:00Z",
  "page": 1,
  "pageSize": 20
}
```

### 按交易类型过滤

```json
{
  "symbol": "SOL", 
  "transactionType": "transfer",
  "page": 1,
  "pageSize": 10
}
```

## 错误处理

### 常见错误码

| 状态码 | 说明 | 解决方案 |
|--------|------|----------|
| 400 | 请求参数错误 | 检查请求参数格式 |
| 401 | 认证失败 | 验证 API 密钥 |
| 429 | 请求频率限制 | 降低请求频率 |
| 500 | 服务器错误 | 稍后重试或联系支持 |

### 错误响应示例

```json
{
  "code": 400,
  "message": "Invalid request parameters",
  "error": "symbol field is required"
}
```

## 下一步

- 🔍 [浏览完整 API 文档](/api/overview)
- ⚡ [在线测试 API](/api/playground)
- 💡 [查看更多示例](/examples/javascript)
