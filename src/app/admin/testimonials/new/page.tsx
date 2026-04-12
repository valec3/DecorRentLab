import { TestimonialForm } from "@/modules/admin/testimonials/components/TestimonialForm";
import { MessageSquare } from "lucide-react";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-10 w-full mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-dorado/10 flex items-center justify-center text-dorado">
          <MessageSquare size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-carbon">
            Añadir Testimonio
          </h1>
          <p className="text-gris-calido mt-1">
            Crea una nueva reseña de cliente para mostrar en la web.
          </p>
        </div>
      </div>

      <TestimonialForm />
    </div>
  );
}
