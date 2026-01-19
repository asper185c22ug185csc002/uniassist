import { useEffect, useMemo, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  // 1) Auth session lifecycle (MUST be sync-only inside onAuthStateChange)
  useEffect(() => {
    let isMounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      const nextUser = nextSession?.user ?? null;
      setUser(nextUser);

      // Important: avoid a render where user is set but role check hasn't started yet.
      // If a user exists, mark role as loading immediately so protected routes don't misfire.
      if (nextUser?.id) {
        setRoleLoading(true);
        setIsAdmin(false);
      } else {
        setRoleLoading(false);
        setIsAdmin(false);
      }

      setAuthLoading(false);
    });

    // After listener is set, fetch existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      if (!isMounted) return;
      setSession(existingSession);
      const existingUser = existingSession?.user ?? null;
      setUser(existingUser);

      if (existingUser?.id) {
        setRoleLoading(true);
        setIsAdmin(false);
      } else {
        setRoleLoading(false);
        setIsAdmin(false);
      }

      setAuthLoading(false);
    }).catch((error) => {
      // Avoid leaking sensitive details; log minimal info
      console.error('Auth getSession failed');
      if (isMounted) {
        setAuthLoading(false);
        setRoleLoading(false);
        setIsAdmin(false);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // 2) Role check happens OUTSIDE the auth callback to avoid deadlocks
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!user?.id) {
        setIsAdmin(false);
        setRoleLoading(false);
        return;
      }

      // roleLoading is set to true as soon as a user is detected (see auth effect)
      try {
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin',
        });

        if (!cancelled) setIsAdmin(!error && data === true);
      } catch {
        if (!cancelled) setIsAdmin(false);
      } finally {
        if (!cancelled) setRoleLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const loading = useMemo(() => authLoading || roleLoading, [authLoading, roleLoading]);

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
        emailRedirectTo: redirectUrl,
      },
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
    signIn,
    signUp,
    signOut,
  };
};

