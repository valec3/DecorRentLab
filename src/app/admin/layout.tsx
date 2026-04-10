"use client";

import Link from "next/link";
import {
  Package,
  FolderTree,
  LogOut,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/admin/login");
        setUser(null);
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-dorado" size={40} />
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Productos", href: "/admin/products", icon: Package },
    { label: "Categorías", href: "/admin/categories", icon: FolderTree },
  ];

  return (
    <div className="flex h-screen overflow-hidden w-full bg-slate-50 text-carbon font-sans">
      {/* Sidebar (30% Dark) */}
      <aside className="w-72 bg-carbon flex flex-col shadow-2xl z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <Link
            href="/admin"
            className="font-serif font-bold text-2xl text-white tracking-tight"
          >
            Decor<span className="text-dorado">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-dorado text-white shadow-glow-sm"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    isActive ? "text-white" : "text-white/40"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="mb-4 px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Sesión activa</p>
            <p className="truncate text-xs text-white font-medium">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl text-red-400 hover:bg-red-400/10 w-full text-left transition-all"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area (70% Light) */}
      <main className="flex-1 overflow-y-auto w-full bg-[#fcfcfc] dark:bg-carbon relative">
        <div className="p-10 w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
