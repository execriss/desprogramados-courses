import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { Button } from '../components/ui/Button';
import '../styles/components/auth.css';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError('No se pudo enviar el email. Verificá la dirección.');
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <PageWrapper>
      <MetaTags title="Recuperar contraseña" />
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">Recuperar contraseña</h1>

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
                Te enviamos un email a <strong>{email}</strong> con el enlace para restablecer tu contraseña.
              </p>
              <Link to="/login">
                <Button variant="primary" size="md">Volver al inicio de sesión</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <label className="auth-label">
                Email
                <input
                  type="email"
                  className="auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  autoFocus
                />
              </label>

              {error && <p className="auth-error">{error}</p>}

              <Button type="submit" variant="primary" size="md" fullWidth disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </Button>

              <p className="auth-footer-text">
                <Link to="/login" className="auth-link">Volver al inicio de sesión</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
