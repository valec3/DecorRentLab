import {
  Package,
  FolderTree,
  TrendingUp,
  Users,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { productService } from "@/services/supabase/products/service";
import { categoryService } from "@/services/supabase/categories/service";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const productsResult = await productService.getPaginatedProducts(1, 100);
  const categories = await categoryService.getCategories();

  const stats = [
    {
      label: "Total Productos",
      value: productsResult.count.toString(),
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Categorías",
      value: categories.length.toString(),
      icon: FolderTree,
      color: "text-dorado",
      bg: "bg-dorado/10",
    },
    {
      label: "Cotizaciones Hoy",
      value: "5",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Visitas",
      value: "1.2k",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8 w-full" >
      <div>
        <h1 className="text-3xl font-serif font-bold text-carbon">Dashboard</h1>
        <p className="text-gris-calido mt-1">
          Bienvenido al centro de control de Decor Rent Lab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-borde/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gris-calido">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-carbon mt-1">
                  {stat.value}
                </p>
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
          <h2 className="text-xl font-serif font-bold text-carbon mb-4">
            Últimos Productos
          </h2>
          <div className="space-y-4">
            {productsResult.data.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 py-3 border-b border-borde/20 last:border-0 text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-dorado" />
                <p className="flex-1 text-carbon">
                  Producto <span className="font-semibold">{p.nombre}</span> en{" "}
                  {p.categoriaSlug}.
                </p>
                <Link
                  href={`/admin/products/${p.slug}`}
                  className="text-dorado hover:underline flex items-center gap-1 text-xs"
                >
                  Editar <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
          <Link href="/admin/products">
            <Button
              variant="ghost"
              className="w-full mt-4 text-xs text-gris-calido"
            >
              Ver todos los productos
            </Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-borde/50 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-carbon mb-4">
            Accesos Directos
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/products/new" className="flex-1 min-w-[150px]">
              <button className="w-full flex items-center justify-center gap-2 p-4 bg-dorado text-white rounded-xl text-sm font-bold hover:bg-dorado-oscuro transition-all shadow-sm">
                <PlusCircle size={20} />
                Nuevo Producto
              </button>
            </Link>
            <Link href="/admin/categories/new" className="flex-1 min-w-[150px]">
              <button className="w-full flex items-center justify-center gap-2 p-4 bg-carbon text-white rounded-xl text-sm font-bold hover:bg-carbon-900 transition-all shadow-sm">
                <FolderTree size={20} />
                Nueva Categoría
              </button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-crema rounded-xl border border-dorado/10">
            <h3 className="text-sm font-bold text-carbon mb-2">
              Estado del Sistema
            </h3>
            <div className="flex items-center gap-2 text-xs text-gris-calido">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Conectado a Supabase
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
