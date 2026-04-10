import { fetchAdminCategories } from "@/modules/admin/categories/actions";
import { ProductForm } from "@/modules/admin/products/components/ProductForm";
import { productService } from "@/services/supabase/products/service";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { slug } = await params;
  const product = await productService.getProduct(slug);
  const categorias = await fetchAdminCategories();

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gris-calido"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">
            Editar Producto
          </h1>
          <p className="text-gris-calido mt-1">
            Actualiza la información del producto "{product.nombre}".
          </p>
        </div>
      </div>

      <ProductForm initialData={product} categorias={categorias} />
    </div>
  );
}
