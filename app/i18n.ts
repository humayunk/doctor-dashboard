import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import * as en from "./locales/en.json";

i18n
  .use(initReactI18next)
  // detect user language: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // all options: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true, // TODO: rely on env var for this
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    resources: {
      en: {
        translation: {
          ...en,
        },
      },
    },
  });

export default i18n;
