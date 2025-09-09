import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { API_CONFIGS } from '@site/src/config/api-playground.config';
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
      {endpoint.responses.map((response, index) => {
        // Check if there are multiple responses with the same status code
        const sameStatusResponses = endpoint.responses.filter(r => r.statusCode === response.statusCode);
        const needsNote = sameStatusResponses.length > 1;
        
        // Extract stream info from description
        let note = '';
        if (needsNote) {
          if (response.description.includes('stream: false')) {
            note = 'stream: false';
          } else if (response.description.includes('stream: true')) {
            note = 'stream: true';
          }
        }

        return (
          <TabItem 
            key={`${response.statusCode}-${response.description}`} 
            value={`${response.statusCode}-${response.description}`} 
            label={
              <div className={styles.tabLabel}>
                <div className={styles.statusCode}>{response.statusCode}</div>
                {note && <div className={styles.statusNote}>{note}</div>}
              </div>
            }
          >
            <div className={styles.responseDescription}>
              {response.description}
            </div>
            
            <pre className={styles.responseCode}>
              <code>
                {typeof response.body === 'string' 
                  ? response.body 
                  : JSON.stringify(response.body, null, 2)
                }
              </code>
            </pre>
          </TabItem>
        );
      })}
    </Tabs>
  );
};

export default ResponseTabs;
