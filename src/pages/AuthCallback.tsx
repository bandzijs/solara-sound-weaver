import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.exchangeCodeForSession(
      window.location.search
    ).then(({ data, error }) => {
      console.log('Callback:', data?.session?.user?.email, error);
      if (data?.session) {
        navigate('/', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '200px', fontSize: '20px' }}>
      Pierakstāmies...
    </div>
  );
}
