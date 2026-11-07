import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { franchiseList } from '../../data/franchises.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleLanguage() {
    setLanguage((current) => (current === 'en' ? 'ar' : 'en'));
    closeMenu();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" onClick={closeMenu} aria-label={t('homeAria')}>
          <img className="brand-logo" src={`${import.meta.env.BASE_URL}brand/atlas-mark.svg`} alt="" />
          <span>{t('siteName')}</span>
        </NavLink>
        <div className="header-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={toggleLanguage}
            aria-label={t('switchLanguage')}
            lang={language === 'en' ? 'ar' : 'en'}
          >
            <span className="language-globe" aria-hidden="true">◎</span>
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? t('menuClose') : t('menuOpen')}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          aria-label={t('home')}
        >
          <NavLink to="/" end onClick={closeMenu}>{t('home')}</NavLink>
          {franchiseList.map((franchise) => (
            <NavLink key={franchise.id} to={franchise.route} onClick={closeMenu}>
              {t(franchise.nameKey)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
