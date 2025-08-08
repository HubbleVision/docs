# Text2SQL 文本化介绍

## 接口含义
- 将自然语言转为 SQL 并执行，返回查询结果；可选自动生成可视化图表（返回 HTML 片段、预览地址与洞察）。
- 支持两种返回模式：
  - 流式 SSE（实时事件流）
  - 常规 JSON（一次性返回）

## 认证
- Header：`HUBBLE-API-Key: <your-key>`（区分大小写）
- 基础路径：`https://api.hubble-rpc.xyz/agent/api/v1`

## 端点与参数

### 1) GET /status（健康检查）
- 作用：检查服务可用性
- 认证：需要 `HUBBLE-API-Key`
- 返回（JSON）：
  - `status` string
  - `message` string
  - `timestamp` string

### 2) POST /text2sql（自然语言 → SQL → 执行）
- 认证：`HUBBLE-API-Key`
- 入参（application/json）：
  - `query` string，必填，自然语言描述
  - `stream` boolean，默认 true；true 返回 SSE 事件流，false 返回 JSON
- 返回：
  - SSE 模式：事件类型包括 `workflow_start`、`node_execution`、`plan_created`、`step_completed`、`llm_start`、`token`、`llm_end`、`node_error`、`result`、`complete`、`error`
  - JSON 模式：`{ data: any[], sql?: string, timestamp: string }`

### 3) POST /generate-chart（自然语言 → 图表）
- 认证：`HUBBLE-API-Key`
- 入参（application/json）：
  - `query` string，必填，自然语言描述
  - `stream` boolean，默认 true；同上
- 返回：
  - SSE 模式：除通用事件外，包含 `chart_start`、`chart_sql_complete`、`chart_generation_start`、`chart_generation_complete`、`chart_complete`、`chart_error` 等
  - JSON 模式：
    ```json
    {
      "sql": "SELECT ...",
      "data": [...],
      "chart": {
        "chartType": "line|bar|pie|scatter|area",
        "htmlCode": "<div>...图表...</div>",
        "previewUrl": "https://...",
        "dataInsights": ["..."],
        "generationTime": 1234
      },
      "timestamp": "..."
    }
    ```

## 错误格式（统一）
- `400`：参数错误 `{ error, timestamp }`
- `500`：服务器错误 `{ error, timestamp }`
