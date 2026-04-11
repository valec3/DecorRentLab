import { CategoryForm } from "@/modules/admin/categories/components/CategoryForm";
import { productService } from "@/services/supabase/products/service";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;
  const categories = await productService.getCategories();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gris-calido"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">
            Editar Categoría
          </h1>
          <p className="text-gris-calido mt-1">
            Actualiza los detalles de la categoría &quot;{category.nombre}&quot;.
          </p>
        </div>
      </div>

      <CategoryForm initialData={category} />
    </div>
  );
}
