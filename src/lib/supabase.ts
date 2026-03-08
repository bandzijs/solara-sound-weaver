import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cbqiyyqoqikrywefweii.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicWl5eXFvcWlrcnl3ZWZ3ZWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjcxMDAsImV4cCI6MjA4ODU0MzEwMH0.m7_NfJs6fh8ZE198vG30K9uB2qfj2susDHMpoct0_bc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
  },
});
