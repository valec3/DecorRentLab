import { testimonialService } from "@/services/supabase/testimonials/service";
import { TestimonialForm } from "@/modules/admin/testimonials/components/TestimonialForm";
import { MessageSquare } from "lucide-react";
import { notFound } from "next/navigation";

interface EditTestimonialPageProps {
  params: {
    id: string;
  };
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const testimonial = await testimonialService.getById(params.id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-10 w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-dorado/10 flex items-center justify-center text-dorado">
          <MessageSquare size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">Editar Testimonio</h1>
          <p className="text-gris-calido mt-1">
            Modifica la información de la reseña seleccionada.
          </p>
        </div>
      </div>

      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
