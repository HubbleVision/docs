import React from 'react';
import { API_CONFIGS } from '../../config/api-playground.config';
import styles from './styles.module.css';

interface RequestParametersTableProps {
  apiId: string;
  endpointId: string;
}

const RequestParametersTable: React.FC<RequestParametersTableProps> = ({ apiId, endpointId }) => {
  // 查找对应的 API 配置
  const apiConfig = API_CONFIGS.find(api => api.id === apiId);
  if (!apiConfig) {
    return <div>API configuration not found for {apiId}</div>;
  }

  // 查找对应的端点配置
  const endpointConfig = apiConfig.endpoints.find(endpoint => endpoint.id === endpointId);
  if (!endpointConfig) {
    return <div>Endpoint configuration not found for {endpointId}</div>;
  }

  const { requestParameters } = endpointConfig;

  // 如果没有请求参数，显示无参数信息
  if (!requestParameters || requestParameters.length === 0) {
    return <div className={styles.noParameters}>This endpoint does not require any parameters.</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.parametersTable}>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {requestParameters.map((param, index) => (
            <tr key={index}>
              <td>
                <code className={styles.parameterName}>{param.name}</code>
              </td>
              <td>
                <code className={styles.parameterType}>{param.type}</code>
              </td>
              <td>
                {param.required ? (
                  <span className={styles.required}>Yes</span>
                ) : (
                  <span className={styles.optional}>No</span>
                )}
              </td>
              <td>
                {param.description}
                {param.defaultValue && (
                  <div className={styles.defaultValue}>
                    Default: <code>{param.defaultValue}</code>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestParametersTable;
