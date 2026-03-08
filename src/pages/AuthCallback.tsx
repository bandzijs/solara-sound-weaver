import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log('Delayed session check:', session?.user?.email);

      if (!session) {
        const { data } = await supabase.auth.getUser();
        console.log('User:', data?.user?.email);
      }

      navigate('/', { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '200px', fontSize: '20px' }}>
      Pierakstāmies...
    </div>
  );
}
