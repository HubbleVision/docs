import React, { useState, useEffect } from 'react';
import ApiPlayground from '../ApiPlayground';
import styles from './styles.module.css';

interface ApiPlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialApi?: 'text2sql' | 'tx' | 'ohlcv';
  initialEndpoint?: string;
}

// ApiPlayground 现在支持 props，不需要包装组件了

export default function ApiPlaygroundModal({
  isOpen,
  onClose,
  initialApi,
  initialEndpoint
}: ApiPlaygroundModalProps): React.ReactNode {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>API Playground</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="关闭弹窗"
            title="关闭弹窗 (ESC)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <ApiPlayground 
            initialApi={initialApi}
            initialEndpoint={initialEndpoint}
          />
        </div>
      </div>
    </div>
  );
}

// 导出一个便于使用的按钮组件
interface ApiPlaygroundButtonProps {
  children?: React.ReactNode;
  className?: string;
  initialApi?: 'text2sql' | 'tx' | 'ohlcv';
  initialEndpoint?: string;
  variant?: 'primary' | 'secondary';
}

export function ApiPlaygroundButton({
  children = '在线测试 API',
  className = '',
  initialApi = 'text2sql',
  initialEndpoint,
  variant = 'primary'
}: ApiPlaygroundButtonProps): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className={`${styles.button} ${styles[variant]} ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </button>
      <ApiPlaygroundModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialApi={initialApi}
        initialEndpoint={initialEndpoint}
      />
    </>
  );
}
