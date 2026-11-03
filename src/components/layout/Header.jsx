import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { franchiseList } from '../../data/franchises.js';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" onClick={closeMenu} aria-label="Character Atlas home">
          <span className="brand-mark" aria-hidden="true">CA</span>
          <span>Character Atlas</span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          {franchiseList.map((franchise) => (
            <NavLink key={franchise.id} to={franchise.route} onClick={closeMenu}>
              {franchise.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
