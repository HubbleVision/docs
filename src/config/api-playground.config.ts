/**
 * API Playground 主配置文件
 *
 * 此文件导入并组合所有 API 配置，提供统一的配置入口
 */

import { text2sqlApiConfig } from './apis/text2sql.config';
import { txBalanceApiConfig } from './apis/tx-balance.config';
import { ohlcvApiConfig } from './apis/ohlcv.config';

import type { ApiConfig } from '../types/api-playground.types';

export const API_CONFIGS: ApiConfig[] = [
  text2sqlApiConfig,
  txBalanceApiConfig,
  ohlcvApiConfig,
];

// 重新导出类型以供其他文件使用
export type {
  HttpMethod,
  ApiKeyHeader,
  ResponseExample,
  RequestParameter,
  EndpointConfig,
  ApiConfig,
  CodeExample,
} from '../types/api-playground.types';
