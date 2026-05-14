import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import '../styles/components/auth.css';

const AUTH_ERRORS: Record<string, string> = {
  'User already registered': 'Ya existe una cuenta con ese email',
  'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
  'Too many requests': 'Demasiados intentos. Espera unos minutos.',
};

function parseError(msg: string) {
  return AUTH_ERRORS[msg] ?? 'Ocurrió un error. Inténtalo de nuevo.';
}

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'El nombre es obligatorio';
    if (!email) errs.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Introduce un email válido';
    if (!password) errs.password = 'La contraseña es obligatoria';
    else if (password.length < 8) errs.password = 'Mínimo 8 caracteres';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setAuthError('');
    setLoading(true);
    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      setAuthError(parseError(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <MetaTags title="Crear cuenta" description="Únete a +60.000 desarrolladores que aprenden como se programa en producción." />
      <main className="auth-layout">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <img src="/logo.png" alt="Desprogramados" style={{ height: '64px', width: 'auto', margin: '0 auto 4px' }} />
          <h1 className="auth-card__title">Crea tu cuenta</h1>
          <p className="auth-card__subtitle">Empieza a aprender gratis hoy</p>

          {authError && <p className="auth-error">{authError}</p>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="form-field__label" htmlFor="name">Nombre completo</label>
              <input
                id="name" type="text"
                className={`form-field__input${errors.name ? ' form-field__input--error' : ''}`}
                placeholder="Juan García" value={name}
                onChange={(e) => setName(e.target.value)} autoComplete="name"
              />
              {errors.name && <p className="form-field__error">{errors.name}</p>}
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="email">Email</label>
              <input
                id="email" type="email"
                className={`form-field__input${errors.email ? ' form-field__input--error' : ''}`}
                placeholder="tu@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              />
              {errors.email && <p className="form-field__error">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="password">Contraseña</label>
              <input
                id="password" type="password"
                className={`form-field__input${errors.password ? ' form-field__input--error' : ''}`}
                placeholder="Mínimo 8 caracteres" value={password}
                onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"
              />
              {errors.password && <p className="form-field__error">{errors.password}</p>}
            </div>

            <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
              Crear cuenta
            </Button>
          </form>

          <p className="auth-footer">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="auth-footer__link">Iniciar sesión</Link>
          </p>
        </motion.div>
      </main>
    </PageWrapper>
  );
}
