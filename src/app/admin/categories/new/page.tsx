import { CategoryForm } from "@/modules/admin/categories/components/CategoryForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gris-calido">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">Nueva Categoría</h1>
          <p className="text-gris-calido mt-1">Define el nombre y el slug de la nueva sección.</p>
        </div>
      </div>

      <CategoryForm />
    </div>
  );
}
