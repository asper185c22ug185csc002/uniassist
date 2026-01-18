import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminCheckError, setAdminCheckError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      // Get the current session first
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // If the stored refresh token is invalid/corrupted, clear it so sign-in works again.
      if (error?.message?.includes('Refresh Token Not Found')) {
        await supabase.auth.signOut();
      }

      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await checkAdminRole(session.user.id);
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await checkAdminRole(session.user.id);
        } else {
          setIsAdmin(false);
        }
        
        if (isMounted) {
          setLoading(false);
        }
      }
    );

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminRole = useCallback(async (userId: string) => {
    setAdminCheckError(null);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (error) {
        setAdminCheckError('Failed to verify admin status. Please check your connection.');
        setIsAdmin(false);
        return false;
      }
      
      setIsAdmin(!!data);
      return !!data;
    } catch (err) {
      setAdminCheckError('Network error while checking admin status.');
      setIsAdmin(false);
      return false;
    }
  }, []);

  const retryAdminCheck = useCallback(async () => {
    if (user) {
      setLoading(true);
      await checkAdminRole(user.id);
      setLoading(false);
    }
  }, [user, checkAdminRole]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setIsAdmin(false);
    return { error };
  };

  return {
    user,
    session,
    isAdmin,
    loading,
    adminCheckError,
    retryAdminCheck,
    signIn,
    signUp,
    signOut,
  };
};
