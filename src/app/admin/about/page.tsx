import { fetchAboutContent } from "@/modules/admin/about/actions";
import { AboutForm } from "@/modules/admin/about/components/AboutForm";
import { Info } from "lucide-react";
import { aboutContent as fallbackContent } from "@/data/content";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const content = await fetchAboutContent();

  // If no content in DB yet, use the mocked one as initial data
  const initialData = content || fallbackContent;

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-dorado/10 rounded-xl text-dorado">
            <Info size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-carbon">Sección Nosotros</h1>
            <p className="text-gris-calido mt-1">
              Personaliza el contenido de la página &quot;Sobre Nosotros&quot; de tu tienda.
            </p>
          </div>
        </div>
      </div>

      <AboutForm initialData={initialData} />
    </div>
  );
}
