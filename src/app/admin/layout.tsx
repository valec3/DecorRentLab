"use client";

import Link from "next/link";
import {
  Package,
  FolderTree,
  LogOut,
  LayoutDashboard,
  Loader2,
  Menu,
  X,
  MessageSquare,
  Info,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <div className="h-screen w-full flex items-center justify-center bg-crema">
        <Loader2 className="animate-spin text-dorado" size={40} />
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Productos", href: "/admin/products", icon: Package },
    { label: "Categorías", href: "/admin/categories", icon: FolderTree },
    { label: "Testimonios", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Nosotros", href: "/admin/about", icon: Info },
  ];

  return (
    <div className="flex h-screen overflow-hidden w-full bg-crema text-carbon font-sans relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-carbon/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (30% Dark) */}
      <aside className={cn(
        "fixed lg:relative w-72 h-full bg-carbon flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out transform",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-20 flex items-center justify-between px-8 border-b border-white/5">
          <Link
            href="/admin"
            className="font-serif font-bold text-2xl text-white tracking-tight"
          >
            Decor<span className="text-dorado">Admin</span>
          </Link>
          <button 
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
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
                onClick={() => setIsSidebarOpen(false)}
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
      <main className="flex-1 overflow-y-auto w-full bg-crema relative h-full">
        {/* Mobile Header Trigger */}
        <div className="lg:hidden h-16 px-6 border-b border-slate-100 flex items-center bg-white sticky top-0 z-30 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-carbon hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-serif font-bold text-lg text-carbon">
            Decor<span className="text-dorado">Admin</span>
          </span>
        </div>

        <div className="p-4 md:p-8 lg:p-10 w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
