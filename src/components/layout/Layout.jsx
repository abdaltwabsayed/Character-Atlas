import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { franchises } from '../../data/franchises.js';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { activeTheme, setActiveTheme } = useTheme();
  const { language } = useLanguage();
  const routeTheme = Object.values(franchises).find(
    (franchise) => franchise.route === pathname,
  )?.theme ?? 'home';

  useEffect(() => {
    setActiveTheme(routeTheme);
  }, [routeTheme, setActiveTheme]);

  return (
    <div className="app-shell" data-theme={activeTheme} lang={language}>
      <Header />
      <main>{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
