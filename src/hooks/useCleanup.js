import { useRef, useEffect } from 'react';

/**
 * 通用清理Hook，确保组件卸载时正确清理资源
 */
export const useCleanup = () => {
  const cleanupFunctions = useRef([]);

  const addCleanup = (cleanupFn) => {
    cleanupFunctions.current.push(cleanupFn);
  };

  const removeCleanup = (cleanupFn) => {
    const index = cleanupFunctions.current.indexOf(cleanupFn);
    if (index > -1) {
      cleanupFunctions.current.splice(index, 1);
    }
  };

  useEffect(() => {
    return () => {
      // 执行所有清理函数
      cleanupFunctions.current.forEach(cleanup => {
        try {
          if (typeof cleanup === 'function') {
            cleanup();
          }
        } catch (error) {
          console.warn('Cleanup function failed:', error);
        }
      });
      cleanupFunctions.current = [];
    };
  }, []);

  return { addCleanup, removeCleanup };
};