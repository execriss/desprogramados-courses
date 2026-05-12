import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import '../styles/components/auth.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Introduce un email válido';
    if (!password) errs.password = 'La contraseña es obligatoria';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      login({ email });
      navigate(searchParams.get('redirect') ?? '/dashboard');
    }, 800);
  };

  return (
    <PageWrapper>
      <MetaTags title="Iniciar sesión" description="Inicia sesión en LearnCraft para continuar aprendiendo." />
      <main className="auth-layout">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="auth-card__logo">Learn<span>Craft</span></p>
          <h1 className="auth-card__title">Bienvenido de vuelta</h1>
          <p className="auth-card__subtitle">Inicia sesión para continuar aprendiendo</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="form-field__label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={`form-field__input${errors.email ? ' form-field__input--error' : ''}`}
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className="form-field__error">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                className={`form-field__input${errors.password ? ' form-field__input--error' : ''}`}
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {errors.password && <p className="form-field__error">{errors.password}</p>}
            </div>

            <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
              Iniciar sesión
            </Button>
          </form>

          <p className="auth-footer">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="auth-footer__link">Créala gratis</Link>
          </p>
        </motion.div>
      </main>
    </PageWrapper>
  );
}
