import { fetchAdminTestimonials } from "@/modules/admin/testimonials/actions";
import { TestimonialTable } from "@/modules/admin/testimonials/components/TestimonialTable";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await fetchAdminTestimonials();

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-dorado/10 rounded-xl text-dorado">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-carbon">Testimonios</h1>
            <p className="text-gris-calido mt-1">
              Gestiona las reseñas y comentarios de los clientes que se muestran en la web.
            </p>
          </div>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="bg-dorado hover:bg-dorado-oscuro text-white shadow-premium-sm transition-all">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Testimonio
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-premium-sm overflow-hidden p-6">
        <TestimonialTable data={testimonials} />
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-300">
          <div className="max-w-xs mx-auto space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <MessageSquare className="text-slate-300" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-carbon">Sin testimonios</h3>
              <p className="text-sm text-gris-calido">Todavía no has registrado ningún testimonio de cliente.</p>
            </div>
            <Link href="/admin/testimonials/new">
              <Button variant="outline" className="rounded-xl border-slate-200">
                Añadir el primero
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
