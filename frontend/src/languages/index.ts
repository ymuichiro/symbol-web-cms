import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/languages/_en';
import ja from '@/languages/_ja';
import ko from '@/languages/_ko';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof ja;
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en,
      ja,
      ko,
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(console.error);

export default i18n;
