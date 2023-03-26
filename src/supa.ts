import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdbbdxcqjzezwxvhfczj.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkYmJkeGNxanplend4dmhmY3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4MzgxMDYsImV4cCI6MTk5NTQxNDEwNn0.NrfRxrLyEUKXGogaxXmWIhoFBRQ0BSRJI6Fi8cnqYgw';

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);
