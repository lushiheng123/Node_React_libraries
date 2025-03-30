import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources: {
      en: { translation: en }, // 英文翻译
      zh: { translation: zh }, // 中文翻译
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'zh', // 如果当前语言翻译缺失，回退到英文
    interpolation: {
      escapeValue: false, // React 默认会处理 XSS，不需要额外转义
    },
  });

export default i18n;