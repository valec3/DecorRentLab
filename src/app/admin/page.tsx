import {
  Package,
  FolderTree,
  PlusCircle,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-carbon">Panel de Control</h1>
        <p className="text-gris-calido max-w-lg mx-auto">
          Gestiona el catálogo de Decor Rent Lab. Selecciona una acción para comenzar.
        </p>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Productos Quick Access */}
        <div className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm hover:shadow-premium-md transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-dorado/5 rounded-full blur-3xl group-hover:bg-dorado/10 transition-colors" />
          
          <div className="relative space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-dorado/10 flex items-center justify-center text-dorado">
              <Package size={28} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-carbon">Productos</h2>
              <p className="text-sm text-gris-calido">Administra, crea y edita los artículos de tu catálogo.</p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Link href="/admin/products/new">
                <button className="w-full flex items-center justify-center gap-2 h-14 bg-carbon text-white rounded-2xl font-bold hover:bg-black transition-all shadow-strong">
                  <PlusCircle size={20} />
                  Añadir Producto
                </button>
              </Link>
              <Link href="/admin/products">
                <button className="w-full flex items-center justify-center gap-2 h-14 border border-slate-100 text-carbon rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  <LayoutGrid size={20} />
                  Ver Todos
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Categorías Quick Access */}
        <div className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm hover:shadow-premium-md transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-carbon/5 rounded-full blur-3xl group-hover:bg-carbon/10 transition-colors" />

          <div className="relative space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-carbon/5 flex items-center justify-center text-carbon">
              <FolderTree size={28} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-carbon">Categorías</h2>
              <p className="text-sm text-gris-calido">Organiza tu catálogo mediante categorías y slugs personalizados.</p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Link href="/admin/categories/new">
                <button className="w-full flex items-center justify-center gap-2 h-14 bg-dorado text-white rounded-2xl font-bold hover:bg-dorado-oscuro transition-all shadow-strong">
                  <PlusCircle size={20} />
                  Nueva Categoría
                </button>
              </Link>
              <Link href="/admin/categories">
                <button className="w-full flex items-center justify-center gap-2 h-14 border border-slate-100 text-carbon rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  <LayoutGrid size={20} />
                  Gestionar Lista
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Footer Info */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100 text-[10px] font-bold text-green-700 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Sistema Conectado a Supabase
        </div>
      </div>
    </div>
  );
}
