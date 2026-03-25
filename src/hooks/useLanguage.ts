import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { buildLocalizedPath } from "@/utils/localeRouting";
// import useCachedTranslation from "@/hooks/useCachedTranslation";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState(i18n.language || "uk");
  // const loading = useCachedTranslation(language);

  useEffect(() => {
    const i18nLang = i18n.language;
    if (i18nLang) setLanguage(i18nLang);
  }, [i18n]);

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "uk" : "en";
    const localizedPath = buildLocalizedPath(location.pathname, newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
    navigate(`${localizedPath}${location.search}${location.hash}`);
  };

  return { language, changeLanguage };
};

export default useLanguage;
