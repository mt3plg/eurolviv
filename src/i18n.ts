import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { resources } from "@/locales/locales";
import { getLocaleFromPath } from "@/utils/localeRouting";

const savedLanguage = localStorage.getItem("i18nextLng");
const pathLanguage = getLocaleFromPath(window.location.pathname);
const initialLanguage = pathLanguage === "en" ? "en" : savedLanguage === "en" ? "en" : "uk";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: "uk",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
