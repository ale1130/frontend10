import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationAR from './public/locales/ar/translation.json';
import translationDE from './public/locales/de/translation.json';
import translationEN from './public/locales/en/translation.json';
import translationES from './public/locales/es/translation.json';
import translationFR from './public/locales/fr/translation.json';
import translationHU from './public/locales/hu/translation.json';
import translationIT from './public/locales/it/translation.json';
import translationPT from './public/locales/pt/translation.json';
import translationPTBR from './public/locales/pt-br/translation.json';
import translationRO from './public/locales/ro/translation.json';
import translationTR from './public/locales/tr/translation.json';
import translationZH from './public/locales/zh/translation.json';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ar: {
        translation: translationAR
      },
      de: {
        translation: translationDE
      },
      en: {
        translation: translationEN
      },
      es: {
        translation: translationES
      },
      fr: {
        translation: translationFR
      },
      hu: {
        translation: translationHU
      },
      it: {
        translation: translationIT
      },
      pt: {
        translation: translationPT
      },
      ptbr: {
        translation: translationPTBR
      },
      ro: {
        translation: translationRO
      },
      tr: {
        translation: translationTR
      },
      zh: {
        translation: translationZH
      }

    }
  });

export default i18n;