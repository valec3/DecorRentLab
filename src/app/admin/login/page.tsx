"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === "Invalid login credentials" 
          ? "Credenciales incorrectas. Verifica tu email y contraseña." 
          : authError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-carbon">
            Decor<span className="text-dorado">Admin</span>
          </h1>
          <p className="text-gris-calido mt-2">Acceso al panel de gestión</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl border border-borde/50 shadow-strong">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle size={18} className="flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-calido/40" size={18} />
                <Input
                  type="email"
                  placeholder="admin@decorrentlab.com"
                  className="pl-10 h-11 border-slate-200 focus:border-dorado focus:ring-dorado/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-calido/40" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 border-slate-200 focus:border-dorado focus:ring-dorado/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-carbon hover:bg-carbon-oscuro text-white rounded-xl transition-all font-semibold"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Entrar al Panel"
              )}
            </Button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gris-calido mt-8">
          &copy; {new Date().getFullYear()} Decor Rent Lab. Reservado para personal autorizado.
        </p>
      </div>
    </div>
  );
}
