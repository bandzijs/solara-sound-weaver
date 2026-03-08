import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        console.log('Exchanged code, session:', data?.session?.user?.email, error);
      } else {
        console.log('No code in callback URL');
      }

      navigate('/', { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '200px', fontSize: '20px' }}>
      Pierakstāmies...
    </div>
  );
}
