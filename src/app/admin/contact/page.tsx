import { contactService } from "@/services/supabase/contact/service";
import { ContactForm } from "@/modules/admin/contact/components/ContactForm";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const contactInfo = await contactService.getContactInfo();

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-dorado uppercase tracking-[0.2em] text-[10px] font-bold">
            <span className="w-8 h-px bg-dorado/30"></span>
            Configuración Global
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-carbon tracking-tight">
            Datos de <span className="text-dorado italic">Contacto</span>
          </h1>
          <p className="text-gris-calido max-w-xl text-sm md:text-base leading-relaxed">
            Administra la información que se muestra en el pie de página, la página de contacto y 
            el número central de WhatsApp para todo el sitio.
          </p>
        </div>
      </div>

      <ContactForm initialData={contactInfo} />
    </div>
  );
}
