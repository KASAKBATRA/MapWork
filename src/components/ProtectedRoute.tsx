import React from 'react';
import { User } from '../types/auth';

interface ProtectedRouteProps {
  user: User | null;
  loading: boolean;
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, loading, children, fallback }) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <>{fallback}</>;
};

export default ProtectedRoute;