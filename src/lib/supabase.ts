import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbqiyyqoqikrywefweii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicWl5eXFvcWlrcnl3ZWZ3ZWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjcxMDAsImV4cCI6MjA4ODU0MzEwMH0.m7_NfJs6fh8ZE198vG30K9uB2qfj2susDHMpoct0_bc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
