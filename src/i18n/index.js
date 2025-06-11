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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    lng: localStorage.getItem('i18nextLng') || 'zh',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;