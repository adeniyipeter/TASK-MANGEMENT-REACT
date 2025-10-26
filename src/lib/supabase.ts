import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Ticket = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
};
