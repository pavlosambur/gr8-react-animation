import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const fallbackLng = "en";
const supportedLanguages = ["en", "uk"]; // Укажи поддерживаемые языки

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng,
        supportedLngs: supportedLanguages,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/gr8-react-animation/locales/{{lng}}/translation.json",
        },
        detection: {
            order: ["path", "cookie", "localStorage", "navigator"],
            lookupFromPathIndex: 0, // Берёт язык из первого сегмента пути
            caches: ["cookie"],
        },
    });

export default i18n;
