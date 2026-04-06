import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isUrlValid = (url: string) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

if (!supabaseUrl) console.warn('NEXT_PUBLIC_SUPABASE_URL is missing');
if (!supabaseAnonKey) console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');

export const supabase = isUrlValid(supabaseUrl) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      db: { schema: 'decor_store' }
    }) 
  : null; 

if (!supabase) {
  if (typeof window === 'undefined') {
    console.error('❌ ERROR CRÍTICO: El cliente de Supabase no se pudo inicializar en el SERVIDOR. Revisa .env.local y REINICIA el servidor (npm run dev).');
  }
} else {
  if (typeof window === 'undefined') {
    console.log('✅ Cliente de Supabase inicializado correctamente (Schema: decor_store)');
  }
}
