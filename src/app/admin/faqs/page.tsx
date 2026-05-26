import { HelpCircle } from "lucide-react";
import { faqs as fallbackFaqs } from "@/data/content";
import { fetchFaqs } from "@/modules/admin/faqs/actions";
import { FaqsForm } from "@/modules/admin/faqs/components/FaqsForm";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await fetchFaqs();
  const initialData = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-2xl bg-dorado/10 text-dorado flex items-center justify-center">
          <HelpCircle />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-serif font-bold text-carbon">
            Preguntas Frecuentes
          </h1>
          <p className="text-gris-calido">
            Edita las FAQs visibles en el sitio.
          </p>
        </div>
      </div>

      <FaqsForm initialData={initialData} />
    </div>
  );
}
