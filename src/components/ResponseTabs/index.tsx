import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { API_CONFIGS } from '@site/api-playground.config';
import styles from './styles.module.css';

interface ResponseTabsProps {
  apiId: 'text2sql' | 'tx' | 'ohlcv';
  endpointId: string;
}

const ResponseTabs: React.FC<ResponseTabsProps> = ({ apiId, endpointId }) => {
  // 查找对应的 API 配置
  const apiConfig = API_CONFIGS.find(api => api.id === apiId);
  const endpoint = apiConfig?.endpoints.find(ep => ep.id === endpointId);
  
  if (!endpoint?.responses || endpoint.responses.length === 0) {
    return (
      <div className={styles.noResponses}>
        <p>No response examples available for this endpoint.</p>
      </div>
    );
  }

  return (
    <Tabs>
      {endpoint.responses.map((response) => (
        <TabItem 
          key={response.statusCode} 
          value={response.statusCode.toString()} 
          label={response.statusCode.toString()}
        >
          <div className={styles.responseDescription}>
            {response.description}
          </div>
          
          <pre className={styles.responseCode}>
            <code>
              {JSON.stringify(response.body, null, 2)}
            </code>
          </pre>
        </TabItem>
      ))}
    </Tabs>
  );
};

export default ResponseTabs;
