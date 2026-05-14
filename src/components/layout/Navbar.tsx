import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import '../../styles/components/navbar.css';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/courses', label: 'Catálogo' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const scrolled = useScrollShadow();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const displayName = user?.user_metadata?.name as string | undefined;
  const initials = displayName
    ?.split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() ?? '?';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            <img src="/logo.png" alt="Desprogramados" className="navbar__logo-img" />
          </Link>

          <nav className="navbar__nav" aria-label="Navegación principal">
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
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  Mi aprendizaje
                </NavLink>
                <div className="navbar__avatar" title={displayName ?? ''}>
                  {initials}
                </div>
                <button
                  className="navbar__theme-btn"
                  onClick={handleLogout}
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Empezar gratis</Button>
                </Link>
              </>
            )}

            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú de navegación">
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
                <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
                  <img src="/logo.png" alt="Desprogramados" className="navbar__logo-img" />
                </Link>
                <button
                  className="mobile-menu__close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
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

              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                    <Button variant="secondary" size="md" fullWidth>Mi aprendizaje</Button>
                  </Link>
                  <Button variant="ghost" size="md" fullWidth onClick={() => { handleLogout(); setMenuOpen(false); }}>
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="secondary" size="md" fullWidth>Entrar</Button>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <Button variant="primary" size="md" fullWidth>Empezar gratis</Button>
                  </Link>
                </>
              )}

              <div className="mobile-menu__divider" />

              <button
                className="navbar__theme-btn mobile-menu__theme-row"
                onClick={toggleTheme}
                aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span className="mobile-menu__theme-label">
                  {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
