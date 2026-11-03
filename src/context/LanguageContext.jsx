import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translate } from '../i18n/translations.js';

const LanguageContext = createContext(null);
const languageStorageKey = 'character-atlas-language';
const siteUrl = 'https://abdaltwabsayed.github.io/Pokemon-Fetcher/';

function getInitialLanguage() {
  return window.localStorage.getItem(languageStorageKey) === 'ar' ? 'ar' : 'en';
}

function updateMeta(selector, content) {
  const element = document.head.querySelector(selector);
  if (element) element.content = content;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const t = useCallback((key, values) => translate(language, key, values), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.title = t('pageTitle');
    updateMeta('meta[name="description"]', t('pageDescription'));
    updateMeta('meta[name="application-name"]', t('siteName'));
    updateMeta('meta[property="og:title"]', t('pageTitle'));
    updateMeta('meta[property="og:site_name"]', t('siteName'));
    updateMeta('meta[property="og:description"]', t('pageDescription'));
    updateMeta('meta[property="og:locale"]', language === 'ar' ? 'ar_EG' : 'en_US');
    updateMeta('meta[property="og:image:alt"]', t('pageTitle'));
    updateMeta('meta[name="twitter:title"]', t('pageTitle'));
    updateMeta('meta[name="twitter:description"]', t('pageDescription'));
    updateMeta('meta[name="twitter:image:alt"]', t('pageTitle'));
  }, [direction, language, t]);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  const value = useMemo(
    () => ({ language, direction, setLanguage, t, siteUrl }),
    [direction, language, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider.');
  }
  return context;
}
