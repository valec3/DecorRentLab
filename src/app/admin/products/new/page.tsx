import { fetchAdminCategories } from "@/modules/admin/categories/actions";
import { ProductForm } from "@/modules/admin/products/components/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NewProductPage() {
  const categorias = await fetchAdminCategories();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gris-calido">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">Nuevo Producto</h1>
          <p className="text-gris-calido mt-1">Completa los datos para añadir un nuevo artículo al catálogo.</p>
        </div>
      </div>

      <ProductForm categorias={categorias} />
    </div>
  );
}
