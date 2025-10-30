import { useState, useEffect } from 'react';
import { authService } from '../lib/supabaseClient';
import { User, AuthState } from '../types/auth';

export const useAuth = (): AuthState & {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string, company: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
} => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check current user on mount
    authService.getCurrentUser().then(({ user, error }) => {
      if (error) {
        setState(prev => ({ ...prev, loading: false, error: error.message }));
      } else {
        setState(prev => ({
          ...prev,
          user: user ? {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name,
            company: user.user_metadata?.company,
            role: user.user_metadata?.role || 'Viewer'
          } : null,
          loading: false
        }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setState(prev => ({
          ...prev,
          user: {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
            company: session.user.user_metadata?.company,
            role: session.user.user_metadata?.role || 'Viewer'
          },
          loading: false,
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          user: null,
          loading: false,
          error: null
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    const { data, error } = await authService.signIn(email, password);
    
    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error: error.message };
    }
    
    return { success: true };
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    const { data, error } = await authService.signUp(email, password, { name, company });
    
    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error: error.message };
    }
    
    return { success: true };
  };

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true }));
    await authService.signOut();
    setState(prev => ({ ...prev, user: null, loading: false }));
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut
  };
};