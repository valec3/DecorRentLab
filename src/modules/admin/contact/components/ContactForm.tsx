"use client";

import { useState } from "react";
import { ContactInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Loader2, 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Info
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ContactFormProps {
  initialData: ContactInfo | null;
}

export function ContactForm({ initialData }: ContactFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<Omit<ContactInfo, 'id'>>({
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    hours: initialData?.hours || "",
    whatsappNumber: initialData?.whatsappNumber || "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initialData?.id,
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Error saving contact info");

      router.refresh();
      alert("Información de contacto actualizada correctamente.");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar la información.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 pb-20 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Columna 1: Datos de Contacto Directo */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
            <div className="w-10 h-10 rounded-2xl bg-dorado/5 flex items-center justify-center text-dorado">
              <Phone size={20} />
            </div>
            <h2 className="text-xl font-serif font-bold text-carbon">Canales Directos</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Teléfono de Contacto (Visible)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+54 9 11 1234-5678"
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@decorentlab.com"
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 transition-all font-medium"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Columna 2: Ubicación y Horarios */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
            <div className="w-10 h-10 rounded-2xl bg-dorado/5 flex items-center justify-center text-dorado">
              <MapPin size={20} />
            </div>
            <h2 className="text-xl font-serif font-bold text-carbon">Ubicación y Tiempo</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Dirección / Localidad</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <Input 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Buenos Aires, Argentina"
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Horarios de Atención</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <Input 
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="Lun - Sáb: 9:00 - 19:00"
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 transition-all font-medium"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección WhatsApp (Ancho Completo) */}
        <section className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
            <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
              <MessageCircle size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-carbon">Configuración de WhatsApp</h2>
              <p className="text-xs text-gris-calido">Este número se usará para todos los botones de contacto del sitio.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Número de WhatsApp (Solo dígitos)</label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <Input 
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                  placeholder="5491112345678"
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 transition-all font-mono text-lg"
                  required
                />
              </div>
              <p className="text-[10px] text-gris-calido/40 px-1 italic">Incluir código de país y área (sin +, ni espacios, ni guiones).</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-carbon">
                <Info size={16} className="text-dorado" />
                <span className="text-xs font-bold uppercase tracking-wider">Previsualización del Link</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-500 break-all">
                https://wa.me/{formData.whatsappNumber || '...'}/?text=Hola...
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Flotante de Acciones */}
      <div className="fixed bottom-6 lg:bottom-10 left-4 right-4 lg:left-[calc(288px+2.5rem)] lg:right-10 z-30 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-slate-200 shadow-premium-lg flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 lg:px-10 animate-in slide-in-from-bottom-10 duration-700">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/50">Modulo</span>
          <span className="text-sm font-bold text-carbon">Configuración de Contacto</span>
        </div>
        <div className="flex items-center gap-6">
          <Button 
            type="submit" 
            className="bg-carbon hover:bg-black text-white px-12 h-14 rounded-2xl font-bold shadow-strong min-w-[200px] transition-all" 
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save className="mr-2 h-5 w-5" />} Guardar Cambios
          </Button>
        </div>
      </div>
    </form>
  );
}
