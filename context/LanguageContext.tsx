import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { Language, LocalizedString } from '../types';
import { translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  tObj: <T extends LocalizedString>(obj: T) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'udaanMithraLanguage';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem(LANGUAGE_KEY);
    return (savedLang && ['en', 'hi', 'pa'].includes(savedLang) ? savedLang : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    let template = translations[key]?.[language] || key;
    if (replacements) {
      for (const placeholder of Object.keys(replacements)) {
        const value = replacements[placeholder];
        const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
        template = template.replace(regex, String(value));
      }
    }
    return template;
  }, [language]);

  const tObj = useCallback(<T extends LocalizedString>(obj: T): string => {
      return obj[language];
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t, tObj }), [language, setLanguage, t, tObj]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
