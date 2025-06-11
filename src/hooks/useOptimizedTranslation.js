import { useTranslation } from 'react-i18next';
import { useMemo, useCallback } from 'react';

/**
 * 优化的翻译Hook，减少不必要的重渲染
 */
export const useOptimizedTranslation = (namespace = 'translation') => {
  const { t, i18n } = useTranslation(namespace);
  
  // 缓存翻译函数，只在语言变化时重新创建
  const memoizedT = useMemo(() => {
    return (key, options = {}) => {
      try {
        return t(key, options);
      } catch (error) {
        console.warn('Translation error:', key, error);
        return typeof options === 'object' && options.defaultValue ? options.defaultValue : key;
      }
    };
  }, [t, i18n.language]);
  
  // 缓存语言切换函数
  const changeLanguage = useCallback((lng) => {
    return i18n.changeLanguage(lng);
  }, [i18n]);
  
  return { 
    t: memoizedT, 
    i18n: {
      ...i18n,
      changeLanguage
    }
  };
};
