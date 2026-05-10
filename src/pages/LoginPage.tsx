import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import '../styles/components/auth.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    if (!password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <PageWrapper>
      <main className="auth-layout">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="auth-card__logo">Learn<span>Craft</span></p>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">Sign in to continue learning</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="form-field__label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={`form-field__input${errors.email ? ' form-field__input--error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className="form-field__error">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={`form-field__input${errors.password ? ' form-field__input--error' : ''}`}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {errors.password && <p className="form-field__error">{errors.password}</p>}
            </div>

            <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
              Sign in
            </Button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-footer__link">Create one free</Link>
          </p>
        </motion.div>
      </main>
    </PageWrapper>
  );
}
