import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? '';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  displayName: string | null;
  nickname: string | null;
  avatarUrl: string | null;
  needsNickname: boolean;
  setNickname: (name: string) => void;
  signInWithOtp: (email: string) => Promise<{ error: Error | null }>;
  verifyOtp: (email: string, token: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNicknameState] = useState<string | null>(null);
  const [profileChecked, setProfileChecked] = useState(false);

  const fetchNickname = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      console.error("[AuthContext] Failed to fetch nickname:", error.message);
    }
    setNicknameState(data?.nickname ?? null);
    setProfileChecked(true);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        fetchNickname(session.user.id);
      } else {
        setNicknameState(null);
        setProfileChecked(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        fetchNickname(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithOtp = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    return { error: error as Error | null };
  };

  const verifyOtp = async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const setNickname = (name: string) => {
    setNicknameState(name);
  };

  const isAdmin = user?.email === ADMIN_EMAIL;
  const displayName = nickname ?? "Anonīms";
  const avatarUrl = user?.user_metadata?.avatar_url ?? null;
  const needsNickname = !!user && profileChecked && !nickname;

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, displayName, nickname, avatarUrl, needsNickname, setNickname, signInWithOtp, verifyOtp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
