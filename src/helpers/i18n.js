import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import IntlPolyfill from 'intl-pluralrules'; 

import en from '../locales/en.json';
import es from '../locales/es.json';


Intl.NumberFormat = IntlPolyfill;

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const { languageTag } = Localization.getLocales()[0];
    callback(languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
