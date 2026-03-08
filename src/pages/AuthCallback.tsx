import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.exchangeCodeForSession(
      window.location.search
    ).then(async ({ data, error }) => {
      console.log('Session after exchange:', data?.session?.user?.email, error);

      if (data?.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
      }

      navigate('/', { replace: true });
    });
  }, [navigate]);

  return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '200px', fontSize: '20px' }}>
      Pierakstāmies...
    </div>
  );
}
