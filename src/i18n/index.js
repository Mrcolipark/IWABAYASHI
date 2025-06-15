import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入所有语言资源
import zhResources from './resources/zh';
import jaResources from './resources/ja';
import enResources from './resources/en';
import zhCms from './resources/zh/cms.json';
import jaCms from './resources/ja/cms.json';
import enCms from './resources/en/cms.json';

const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
};

const resources = {
  zh: { translation: deepMerge(zhResources, zhCms) },
  ja: { translation: deepMerge(jaResources, jaCms) },
  en: { translation: deepMerge(enResources, enCms) }
};

// 初始化 i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    lng: localStorage.getItem('i18nextLng') || 'zh',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false
    },

    // 添加返回对象选项，支持数组翻译
    returnObjects: true
  })
  .then(() => {
    console.log('i18n initialized successfully');
  })
  .catch((error) => {
    console.error('i18n initialization failed:', error);
  });

export default i18n;