import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PageWrapper } from '../components/layout/PageWrapper';
import { MetaTags } from '../components/seo/MetaTags';
import { Button } from '../components/ui/Button';
import '../styles/components/auth.css';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError('No se pudo actualizar la contraseña. El enlace puede haber expirado.');
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <PageWrapper>
      <MetaTags title="Nueva contraseña" />
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">Nueva contraseña</h1>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-label">
              Nueva contraseña
              <input
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                autoFocus
              />
            </label>

            <label className="auth-label">
              Confirmar contraseña
              <input
                type="password"
                className="auth-input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repetí la contraseña"
                required
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <Button type="submit" variant="primary" size="md" fullWidth disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
