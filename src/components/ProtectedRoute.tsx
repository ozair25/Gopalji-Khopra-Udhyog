import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const isOfflineAdmin = sessionStorage.getItem('isOfflineAdmin') === 'true';

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <Loader2 className="animate-spin text-gold-accent" size={40} />
      </div>
    );
  }

  if (!user && !isOfflineAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
