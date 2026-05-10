import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { Button } from '../ui/Button';
import '../../styles/components/navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Catalog' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const scrolled = useScrollShadow();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            Learn<span>Craft</span>
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">Get started</Button>
            </Link>

            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <motion.div
              className="mobile-menu__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu__panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="mobile-menu__header">
                <span className="navbar__logo">Learn<span>Craft</span></span>
                <button
                  className="mobile-menu__close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `mobile-menu__link${isActive ? ' mobile-menu__link--active' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="mobile-menu__divider" />

              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="secondary" size="md" fullWidth>Sign in</Button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" size="md" fullWidth>Get started</Button>
              </Link>

              <div className="mobile-menu__divider" />

              <button
                className="navbar__theme-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                style={{ width: '100%', borderRadius: '8px', padding: '10px', justifyContent: 'center' }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span style={{ marginLeft: '8px', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
