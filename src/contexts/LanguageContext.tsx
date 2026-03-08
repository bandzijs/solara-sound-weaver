import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language, type Translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("solara-lang");
    return (saved === "en" ? "en" : "lv") as Language;
  });

  useEffect(() => {
    localStorage.setItem("solara-lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "lv" ? "en" : "lv"));

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
