import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ADMIN_EMAIL = 'egc.criss@gmail.com';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) return null;
  if (!user || user.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;
  return <>{children}</>;
}
