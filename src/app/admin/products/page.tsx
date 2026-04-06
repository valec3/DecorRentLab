import { fetchAdminProducts } from "@/modules/admin/products/actions";
import { ProductTable } from "@/modules/admin/products/components/ProductTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await fetchAdminProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">Productos</h1>
          <p className="text-gris-calido mt-1">
            Gestiona el catálogo de artículos disponibles para alquiler.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-dorado hover:bg-dorado-oscuro text-white">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
          </Button>
        </Link>
      </div>

      <ProductTable data={products} />
    </div>
  );
}
