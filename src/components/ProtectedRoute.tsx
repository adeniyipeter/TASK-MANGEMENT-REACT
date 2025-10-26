import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  onUnauthorized: () => void;
};

export function ProtectedRoute({ children, onUnauthorized }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      onUnauthorized();
    }
  }, [user, loading, onUnauthorized]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
