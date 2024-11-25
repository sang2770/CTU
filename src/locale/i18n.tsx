import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { defaultLang } from './locale';
import enLocales from './language/en.json';
import vnLocales from './language/vn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      vn: { translations: vnLocales },
    },
    lng: typeof window !== 'undefined' ?
      localStorage.getItem('i18nextLng')?.toString() : defaultLang.value.toString(),
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
