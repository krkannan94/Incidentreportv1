import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Report {
  id: string;
  user_name: string;
  report_type: 'written' | 'vocal';
  incident_type: string;
  description: string;
  location: string;
  incident_date: string;
  language?: string;
  created_at: string;
  updated_at: string;
}
