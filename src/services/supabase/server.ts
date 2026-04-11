import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createBaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Cliente para uso en procesos estáticos (build-time) como generateStaticParams
 * donde no hay acceso a cookies.
 */
export function createStaticClient() {
  return createBaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: "decor_store" }
    }
  );
}

/**
 * Cliente de servidor estándar que maneja cookies de sesión.
 * Incluye un fallback silencioso para cuando cookies() no está disponible (ej. generateStaticParams).
 */
export async function createClient() {
  let cookieStore;
  
  try {
    cookieStore = await cookies();
  } catch {
    // Fallback al cliente estático si cookies() falla
    return createStaticClient();
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: "decor_store" },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Se maneja silenciosamente ya que esto puede fallar en Server Components
          }
        },
      },
    },
  );
}
