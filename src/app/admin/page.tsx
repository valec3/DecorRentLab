import { Package, FolderTree, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Productos", value: "48", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Categorías", value: "12", icon: FolderTree, color: "text-dorado", bg: "bg-dorado/10" },
    { label: "Cotizaciones Hoy", value: "5", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Visitas", value: "1.2k", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-carbon">Dashboard</h1>
        <p className="text-gris-calido mt-1">Bienvenido al centro de control de Decor Rent Lab.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-borde/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gris-calido">{stat.label}</p>
                <p className="text-3xl font-bold text-carbon mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-borde/50 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-carbon mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-borde/20 last:border-0 text-sm">
                <div className="w-2 h-2 rounded-full bg-dorado" />
                <p className="flex-1 text-carbon">Nuevo producto <span className="font-semibold">Panel Shimmer</span> agregado.</p>
                <span className="text-gris-calido text-xs">Hace 2h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-borde/50 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-carbon mb-4">Accesos Directos</h2>
          <div className="flex flex-wrap gap-3">
             {/* Botones de acción rápida */}
             <button className="px-4 py-2 bg-dorado/10 text-dorado-oscuro rounded-lg text-sm font-medium hover:bg-dorado/20 transition-colors">
               + Nuevo Producto
             </button>
             <button className="px-4 py-2 bg-carbon/5 text-carbon rounded-lg text-sm font-medium hover:bg-carbon/10 transition-colors">
               Gestionar Stock
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
