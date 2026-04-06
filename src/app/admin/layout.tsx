"use client";

import Link from 'next/link';
import { Package, FolderTree, LogOut, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Productos", href: "/admin/products", icon: Package },
    { label: "Categorías", href: "/admin/categories", icon: FolderTree },
  ];

  return (
    <div className="flex h-screen overflow-hidden w-full bg-slate-50 text-carbon font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-borde/50 bg-white flex flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-borde/50">
          <Link href="/admin" className="font-serif font-bold text-xl text-carbon">
            Decor<span className="text-dorado">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-dorado/10 text-dorado shadow-sm" 
                    : "text-gris-calido hover:bg-slate-50 hover:text-carbon"
                )}
              >
                <item.icon size={18} className={cn(isActive ? "text-dorado" : "text-gris-calido/70")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-borde/50">
          <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-red-500 hover:bg-red-50 w-full text-left transition-all">
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full p-8">
        {children}
      </main>
    </div>
  );
}
