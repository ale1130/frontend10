<<<<<<< HEAD
import i18n from "i18next";

import Backend from "i18next-xhr-backend";

import { initReactI18next } from "react-i18next";


i18n

  .use(Backend)

  .use(initReactI18next)

  .init({

    lng: "en",   //default language

    fallbackLng: "en", //when specified language translations not present 

//then fallbacklang translations loaded.

    debug: true,


       backend: {

      /* translation file path */

      loadPath: "https://cdn.mindbowser.com/assets/i18n/{{ns}}/{{lng}}.json",

    },
 

/* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */


    ns: ["translations"],

    defaultNS: "translations",

    keySeparator: false,

    interpolation: {

      escapeValue: false,

      formatSeparator: ",",

    },

    react: {

      wait: true,

    },

  });


export default i18n;
=======
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './public/locales/en/translation.json';
import translationIT from './public/locales/it/translation.json';

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
      en: {
        translation: translationEN
      },
      it: {
        translation: translationIT
      }
    }
  });

export default i18n;
>>>>>>> parent of b700e5a (error)
