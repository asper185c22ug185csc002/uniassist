import { createContext, createElement, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  adminCheckError: string | null;
  retryAdminCheck: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminCheckError, setAdminCheckError] = useState<string | null>(null);

  const checkAdminRole = useCallback(async (userId: string) => {
    setAdminCheckError(null);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        setAdminCheckError("Failed to verify admin status. Please check your connection.");
        setIsAdmin(false);
        return false;
      }

      setIsAdmin(!!data);
      return !!data;
    } catch {
      setAdminCheckError("Network error while checking admin status.");
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

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // If the stored refresh token is invalid/corrupted, clear it.
      if (error?.message?.includes("Refresh Token Not Found")) {
        await supabase.auth.signOut();
      }

      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }

      if (isMounted) setLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }

      if (isMounted) setLoading(false);
    });

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdminRole]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    setIsAdmin(false);
    return { error };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      isAdmin,
      loading,
      adminCheckError,
      retryAdminCheck,
      signIn,
      signUp,
      signOut,
    }),
    [user, session, isAdmin, loading, adminCheckError, retryAdminCheck, signIn, signUp, signOut]
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
