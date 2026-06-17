"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "es" | "de";

const loadTranslations = async (lang: Language) => {
  try {
    const res = await fetch(`/locales/${lang}.json`);
    if (!res.ok) throw new Error("Failed to load translations");
    return await res.json();
  } catch (error) {
    console.error("Error loading translations:", error);
    return {};
  }
};

// Context
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    const initialLang = savedLang && ["en", "es", "de"].includes(savedLang) ? savedLang : "en";
    setLanguage(initialLang);
  }, []);

  useEffect(() => {
    loadTranslations(language).then((data) => setTranslations(data));
    localStorage.setItem("language", language);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t: translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};