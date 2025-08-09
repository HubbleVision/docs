---
sidebar_position: 1
---

# JavaScript Examples

> The following examples demonstrate how to call the APIs. Adjust parameters and error handling for your use case.

This page provides complete JavaScript examples for calling the Hubble Gateway API.

## Basic Setup

### Install dependencies

```bash
npm install axios
# or use fetch (Node.js 18+)
```

### Environment config

```javascript
// config.js
const config = {
  apiKey: process.env.HUBBLE_API_KEY,
  baseUrl: 'https://api.hubble.vision/tx/api/v1',
  timeout: 10000,
};

module.exports = config;
```

## API Client Wrapper

### Create API client

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
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API request failed:', error.response?.data || error.message);
        throw error;
      },
    );
  }

  // Get transactions
  async getTransactions(params) {
    return await this.client.post('/sol/tx', params);
  }

  // Get all pages
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

## Practical Examples

### 1. Basic query

```javascript
// examples/basic-query.js
const HubbleClient = require('../hubble-client');

async function basicQuery() {
  const client = new HubbleClient();

  try {
    const result = await client.getTransactions({
      symbol: 'SOL',
      page: 1,
      pageSize: 10,
    });

    console.log('Result:', result);
    console.log(`Total ${result.data.pagination.total} records`);

    return result;
  } catch (error) {
    console.error('Query failed:', error);
  }
}

basicQuery();
```

### 2. Time range query

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
      pageSize: 50,
    });

    console.log(`Transactions from ${startTime} to ${endTime}:`, result);
    return result;
  } catch (error) {
    console.error('Time range query failed:', error);
  }
}

timeRangeQuery();
```

### 3. Batch processing

```javascript
// examples/batch-processing.js
const HubbleClient = require('../hubble-client');

async function batchProcessing() {
  const client = new HubbleClient();

  try {
    console.log('Fetching data in batches...');

    const allTransactions = await client.getAllTransactions(
      {
        symbol: 'SOL',
        startTime: '2024-01-01T00:00:00Z',
        endTime: '2024-01-01T12:00:00Z',
      },
      5, // up to 5 pages
    );

    console.log(`Fetched ${allTransactions.length} transactions in total`);

    // Simple analysis
    const analysis = analyzeTransactions(allTransactions);
    console.log('Analysis:', analysis);

    return allTransactions;
  } catch (error) {
    console.error('Batch processing failed:', error);
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
    statusDistribution: statusCounts,
  };
}

batchProcessing();
```

### 4. Realtime monitoring

```javascript
// examples/real-time-monitor.js
const HubbleClient = require('../hubble-client');

class TransactionMonitor {
  constructor(interval = 30000) {
    this.client = new HubbleClient();
    this.interval = interval;
    this.isRunning = false;
    this.lastCheckTime = new Date();
  }

  async start() {
    this.isRunning = true;
    console.log('Start monitoring transactions...');

    while (this.isRunning) {
      try {
        await this.checkNewTransactions();
        await this.sleep(this.interval);
      } catch (error) {
        console.error('Monitor error:', error);
        await this.sleep(5000);
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
      pageSize: 100,
    });

    if (result.data.records.length > 0) {
      console.log(`Found ${result.data.records.length} new transactions`);
      this.processNewTransactions(result.data.records);
    }

    this.lastCheckTime = now;
  }

  processNewTransactions(transactions) {
    transactions.forEach((tx) => {
      console.log(`New tx: ${tx.signature.substring(0, 8)}... fee: ${tx.fee}`);
      // Custom handling here
    });
  }

  stop() {
    this.isRunning = false;
    console.log('Stop monitoring');
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Usage
const monitor = new TransactionMonitor(30000);
monitor.start();

process.on('SIGINT', () => {
  console.log('Shutting down monitor...');
  monitor.stop();
  process.exit(0);
});
```

### 5. Error handling & retry

```javascript
// examples/error-handling.js
const HubbleClient = require('../hubble-client');

class RobustHubbleClient extends HubbleClient {
  async getTransactionsWithRetry(params, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}...`);
        return await this.getTransactions(params);
      } catch (error) {
        lastError = error;
        if (this.isRetryableError(error) && attempt < maxRetries) {
          const delay = this.calculateBackoffDelay(attempt);
          console.log(`Retrying in ${delay}ms...`);
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
    return status >= 500 || status === 429 || !status;
  }

  calculateBackoffDelay(attempt) {
    return Math.min(1000 * Math.pow(2, attempt - 1), 10000);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

async function robustQuery() {
  const client = new RobustHubbleClient();

  try {
    const result = await client.getTransactionsWithRetry({
      symbol: 'SOL',
      page: 1,
      pageSize: 10,
    });

    console.log('Success:', result);
  } catch (error) {
    console.error('Final failure:', error.message);
  }
}

robustQuery();
```

## Next steps

- 📚 [Full API Reference](/api/overview)
