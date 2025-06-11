import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入所有语言资源
import zhResources from './resources/zh';
import jaResources from './resources/ja';
import enResources from './resources/en';

const resources = {
  zh: { translation: zhResources },
  ja: { translation: jaResources },
  en: { translation: enResources }
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
    }
  })
  .then(() => {
    console.log('i18n initialized successfully');
  })
  .catch((error) => {
    console.error('i18n initialization failed:', error);
  });

export default i18n;