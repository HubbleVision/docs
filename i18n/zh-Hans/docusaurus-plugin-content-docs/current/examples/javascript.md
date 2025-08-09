---
sidebar_position: 1
---

# JavaScript 示例

> 以下示例仅用于演示如何调用 API，请根据实际业务调整参数与错误处理。

本页面提供了使用 JavaScript 调用 Hubble Gateway API 的完整示例。

## 基础设置

### 安装依赖

```bash
npm install axios
# 或者使用 fetch (Node.js 18+)
```

### 环境配置

```javascript
// config.js
const config = {
  apiKey: process.env.HUBBLE_API_KEY,
  baseUrl: 'https://api.hubble.vision/tx/api/v1',
  timeout: 10000
};

module.exports = config;
```

## API 客户端封装

### 创建 API 客户端

```javascript
// hubble-client.js
const axios = require('axios');
const config = require('./config');

class HubbleClient {
  constructor() {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'X-API-Key': config.apiKey,
        'Content-Type': 'application/json'
      }
    });

    // 响应拦截器
    this.client.interceptors.response.use(
      response => response.data,
      error => {
        console.error('API 请求失败:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  // 获取交易数据
  async getTransactions(params) {
    return await this.client.post('/sol/tx', params);
  }

  // 分页获取所有数据
  async getAllTransactions(baseParams, maxPages = 10) {
    const results = [];
    let page = 1;

    while (page <= maxPages) {
      const params = { ...baseParams, page, pageSize: 100 };
      const response = await this.getTransactions(params);
      
      results.push(...response.data.records);
      
      if (page >= response.data.pagination.totalPages) {
        break;
      }
      page++;
    }

    return results;
  }
}

module.exports = HubbleClient;
```

## 实用示例

### 1. 基础查询

```javascript
// examples/basic-query.js
const HubbleClient = require('../hubble-client');

async function basicQuery() {
  const client = new HubbleClient();
  
  try {
    const result = await client.getTransactions({
      symbol: 'SOL',
      page: 1,
      pageSize: 10
    });
    
    console.log('查询结果:', result);
    console.log(`总计 ${result.data.pagination.total} 条记录`);
    
    return result;
  } catch (error) {
    console.error('查询失败:', error);
  }
}

basicQuery();
```

### 2. 时间范围查询

```javascript
// examples/time-range-query.js
const HubbleClient = require('../hubble-client');

async function timeRangeQuery() {
  const client = new HubbleClient();
  
  const startTime = new Date('2024-01-01').toISOString();
  const endTime = new Date('2024-01-02').toISOString();
  
  try {
    const result = await client.getTransactions({
      symbol: 'SOL',
      startTime,
      endTime,
      page: 1,
      pageSize: 50
    });
    
    console.log(`时间范围 ${startTime} 到 ${endTime} 的交易:`, result);
    return result;
  } catch (error) {
    console.error('时间范围查询失败:', error);
  }
}

timeRangeQuery();
```

### 3. 批量数据处理

```javascript
// examples/batch-processing.js
const HubbleClient = require('../hubble-client');

async function batchProcessing() {
  const client = new HubbleClient();
  
  try {
    console.log('开始批量获取数据...');
    
    const allTransactions = await client.getAllTransactions({
      symbol: 'SOL',
      startTime: '2024-01-01T00:00:00Z',
      endTime: '2024-01-01T12:00:00Z'
    }, 5); // 最多获取5页
    
    console.log(`总共获取 ${allTransactions.length} 条交易记录`);
    
    // 数据分析示例
    const analysis = analyzeTransactions(allTransactions);
    console.log('数据分析结果:', analysis);
    
    return allTransactions;
  } catch (error) {
    console.error('批量处理失败:', error);
  }
}

function analyzeTransactions(transactions) {
  const totalFees = transactions.reduce((sum, tx) => sum + (tx.fee || 0), 0);
  const avgFee = totalFees / transactions.length;
  
  const statusCounts = transactions.reduce((counts, tx) => {
    counts[tx.status] = (counts[tx.status] || 0) + 1;
    return counts;
  }, {});
  
  return {
    totalTransactions: transactions.length,
    totalFees,
    averageFee: avgFee,
    statusDistribution: statusCounts
  };
}

batchProcessing();
```

### 4. 实时数据监控

```javascript
// examples/real-time-monitor.js
const HubbleClient = require('../hubble-client');

class TransactionMonitor {
  constructor(interval = 30000) { // 30秒间隔
    this.client = new HubbleClient();
    this.interval = interval;
    this.isRunning = false;
    this.lastCheckTime = new Date();
  }

  async start() {
    this.isRunning = true;
    console.log('开始实时监控交易数据...');
    
    while (this.isRunning) {
      try {
        await this.checkNewTransactions();
        await this.sleep(this.interval);
      } catch (error) {
        console.error('监控过程中出错:', error);
        await this.sleep(5000); // 出错时等待5秒后重试
      }
    }
  }

  async checkNewTransactions() {
    const now = new Date();
    
    const result = await this.client.getTransactions({
      symbol: 'SOL',
      startTime: this.lastCheckTime.toISOString(),
      endTime: now.toISOString(),
      page: 1,
      pageSize: 100
    });
    
    if (result.data.records.length > 0) {
      console.log(`发现 ${result.data.records.length} 条新交易`);
      this.processNewTransactions(result.data.records);
    }
    
    this.lastCheckTime = now;
  }

  processNewTransactions(transactions) {
    transactions.forEach(tx => {
      console.log(`新交易: ${tx.signature.substring(0, 8)}... 费用: ${tx.fee}`);
      
      // 这里可以添加自定义的处理逻辑
      // 例如：发送通知、存储到数据库、触发其他操作等
    });
  }

  stop() {
    this.isRunning = false;
    console.log('停止实时监控');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 使用示例
const monitor = new TransactionMonitor(30000);
monitor.start();

// 优雅关闭
process.on('SIGINT', () => {
  console.log('收到中断信号，正在关闭监控...');
  monitor.stop();
  process.exit(0);
});
```

### 5. 错误处理和重试机制

```javascript
// examples/error-handling.js
const HubbleClient = require('../hubble-client');

class RobustHubbleClient extends HubbleClient {
  async getTransactionsWithRetry(params, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`尝试第 ${attempt} 次请求...`);
        return await this.getTransactions(params);
      } catch (error) {
        lastError = error;
        
        if (this.isRetryableError(error) && attempt < maxRetries) {
          const delay = this.calculateBackoffDelay(attempt);
          console.log(`请求失败，${delay}ms 后重试...`);
          await this.sleep(delay);
        } else {
          break;
        }
      }
    }
    
    throw lastError;
  }

  isRetryableError(error) {
    const status = error.response?.status;
    return status >= 500 || status === 429 || !status; // 服务器错误、限流或网络错误
  }

  calculateBackoffDelay(attempt) {
    return Math.min(1000 * Math.pow(2, attempt - 1), 10000); // 指数退避，最大10秒
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function robustQuery() {
  const client = new RobustHubbleClient();
  
  try {
    const result = await client.getTransactionsWithRetry({
      symbol: 'SOL',
      page: 1,
      pageSize: 10
    });
    
    console.log('查询成功:', result);
  } catch (error) {
    console.error('最终查询失败:', error.message);
  }
}

robustQuery();
```

## 性能优化

### 1. 请求缓存

```javascript
// utils/cache.js
class SimpleCache {
  constructor(ttl = 60000) { // 默认1分钟过期
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  generateKey(params) {
    return JSON.stringify(params);
  }
}

// 使用缓存的客户端
class CachedHubbleClient extends HubbleClient {
  constructor() {
    super();
    this.cache = new SimpleCache(60000); // 1分钟缓存
  }

  async getTransactions(params) {
    const cacheKey = this.cache.generateKey(params);
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      console.log('使用缓存数据');
      return cached;
    }
    
    const result = await super.getTransactions(params);
    this.cache.set(cacheKey, result);
    
    return result;
  }
}
```

### 2. 并发请求控制

```javascript
// utils/rate-limiter.js
class RateLimiter {
  constructor(maxConcurrent = 5, minInterval = 100) {
    this.maxConcurrent = maxConcurrent;
    this.minInterval = minInterval;
    this.running = 0;
    this.queue = [];
    this.lastRequestTime = 0;
  }

  async execute(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const { fn, resolve, reject } = this.queue.shift();
    this.running++;

    try {
      // 确保请求间隔
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      if (timeSinceLastRequest < this.minInterval) {
        await this.sleep(this.minInterval - timeSinceLastRequest);
      }
      this.lastRequestTime = Date.now();

      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.processQueue(); // 处理下一个请求
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 使用限流的客户端
class RateLimitedHubbleClient extends HubbleClient {
  constructor() {
    super();
    this.rateLimiter = new RateLimiter(3, 200); // 最多3个并发，间隔200ms
  }

  async getTransactions(params) {
    return this.rateLimiter.execute(() => super.getTransactions(params));
  }
}
```

## 完整应用示例

```javascript
// app.js
const RobustHubbleClient = require('./examples/error-handling');
const { analyzeTransactions } = require('./examples/batch-processing');

async function main() {
  const client = new RobustHubbleClient();
  
  console.log('🚀 Hubble Gateway API 示例应用启动');
  
  try {
    // 1. 获取最新交易
    console.log('\n📊 获取最新交易数据...');
    const recent = await client.getTransactionsWithRetry({
      symbol: 'SOL',
      page: 1,
      pageSize: 20
    });
    console.log(`获取到 ${recent.data.records.length} 条最新交易`);
    
    // 2. 分析数据
    console.log('\n🔍 分析交易数据...');
    const analysis = analyzeTransactions(recent.data.records);
    console.log('分析结果:', analysis);
    
    // 3. 导出数据
    console.log('\n💾 导出数据到文件...');
    const fs = require('fs');
    fs.writeFileSync(
      'transactions.json', 
      JSON.stringify(recent.data.records, null, 2)
    );
    console.log('数据已导出到 transactions.json');
    
  } catch (error) {
    console.error('❌ 应用执行失败:', error.message);
  }
}

if (require.main === module) {
  main();
}
```

## 下一步

- 📚 [完整 API 文档](/api/overview)
