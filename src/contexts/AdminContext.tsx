import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "silavarv@gmail.com";

interface AdminContextType {
  isAdmin: boolean;
  adminLoading: boolean;
  loginAdmin: (email: string, password: string) => Promise<string | null>;
  logoutAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(session?.user?.email === ADMIN_EMAIL);
      setAdminLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(session?.user?.email === ADMIN_EMAIL);
      setAdminLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginAdmin = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  };

  const logoutAdmin = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLoading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
