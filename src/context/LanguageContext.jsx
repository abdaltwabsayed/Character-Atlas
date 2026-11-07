import { createContext, useContext, useEffect, useState } from 'react';
import { translate } from '../i18n/translations.js';

const LanguageContext = createContext(null);
const languageStorageKey = 'character-atlas-language';

function updateMeta(selector, content) {
  const element = document.head.querySelector(selector);
  if (element) element.content = content;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => (window.localStorage.getItem(languageStorageKey) === 'ar' ? 'ar' : 'en'),
  );
  const t = (key, values) => translate(language, key, values);

  useEffect(() => {
    // Update document metadata because switching languages does not reload the page.
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem(languageStorageKey, language);
    document.title = translate(language, 'pageTitle');

    const metadata = [
      ['meta[name="description"]', 'pageDescription'],
      ['meta[name="application-name"]', 'siteName'],
      ['meta[property="og:title"]', 'pageTitle'],
      ['meta[property="og:site_name"]', 'siteName'],
      ['meta[property="og:description"]', 'pageDescription'],
      ['meta[property="og:image:alt"]', 'pageTitle'],
      ['meta[name="twitter:title"]', 'pageTitle'],
      ['meta[name="twitter:description"]', 'pageDescription'],
      ['meta[name="twitter:image:alt"]', 'pageTitle'],
    ];

    for (const [selector, value] of metadata) {
      updateMeta(selector, translate(language, value));
    }
    updateMeta('meta[property="og:locale"]', language === 'ar' ? 'ar_EG' : 'en_US');
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider.');
  }
  return context;
}
