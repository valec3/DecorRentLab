import { fetchAdminCategories } from "@/modules/admin/categories/actions";
import { CategoryTable } from "@/modules/admin/categories/components/CategoryTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminCategoriesPage() {
  const categories = await fetchAdminCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">Categorías</h1>
          <p className="text-gris-calido mt-1">
            Organiza tus productos en colecciones y tipos de decoración.
          </p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="bg-dorado hover:bg-dorado-oscuro text-white">
            <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
          </Button>
        </Link>
      </div>

      <CategoryTable data={categories} />
    </div>
  );
}
