import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.exchangeCodeForSession(
      window.location.search
    ).then(({ data, error }) => {
      console.log('Callback session:', data?.session?.user?.email, error);
      window.location.href = '/';
    });
  }, []);

  return <div className="min-h-screen flex items-center justify-center text-foreground">Pierakstāmies...</div>;
}
