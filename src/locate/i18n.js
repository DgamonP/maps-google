import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import languageES from './es/translate.json';
import languagePT from './pt/translate.json';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: languageES,
      'es-ES': languageES,
      'es-419': languageES,
      pt: languagePT,
      'pt-BR': languagePT,
      'pt-PT': languagePT,
    },
    /* default language when load the website in browser */
    lng: 'es',
    /* When react i18next not finding any language to as default in borwser */
    // fallbackLng: 'es',
    /* debugger For Development environment */
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    /* react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    }, */
    /* react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }, */
  });

export default i18n;
