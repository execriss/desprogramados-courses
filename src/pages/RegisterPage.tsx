import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import '../styles/components/auth.css';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8) errs.password = 'Minimum 8 characters';
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
          <h1 className="auth-card__title">Create your account</h1>
          <p className="auth-card__subtitle">Start learning for free today</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="form-field__label" htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                className={`form-field__input${errors.name ? ' form-field__input--error' : ''}`}
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              {errors.name && <p className="form-field__error">{errors.name}</p>}
            </div>

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
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              {errors.password && <p className="form-field__error">{errors.password}</p>}
            </div>

            <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
              Create account
            </Button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-footer__link">Sign in</Link>
          </p>
        </motion.div>
      </main>
    </PageWrapper>
  );
}
