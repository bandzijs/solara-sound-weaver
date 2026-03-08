import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Callback session:', session?.user?.email, error);
      navigate('/', { replace: true });
    });
  }, [navigate]);

  return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '200px', fontSize: '20px' }}>
      Pierakstāmies...
    </div>
  );
}
