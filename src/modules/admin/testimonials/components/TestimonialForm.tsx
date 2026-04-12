"use client";

import { useState, useRef } from "react";
import { TestimonialItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Save,
  X,
  UploadCloud,
  MessageSquare,
  Star,
  User,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadImageFile } from "@/services/custom/files";
import Image from "next/image";

interface TestimonialFormProps {
  initialData?: TestimonialItem | null;
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<TestimonialItem>>({
    id: initialData?.id || "",
    name: initialData?.name || "",
    event: initialData?.event || "",
    text: initialData?.text || "",
    image: initialData?.image || "",
    rating: initialData?.rating || 5,
    active: initialData?.active ?? true,
  });

  const [localFile, setLocalFile] = useState<{ file: File; preview: string } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (localFile) URL.revokeObjectURL(localFile.preview);
    
    setLocalFile({
      file,
      preview: URL.createObjectURL(file),
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeLocalImage = () => {
    if (localFile) URL.revokeObjectURL(localFile.preview);
    setLocalFile(null);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = formData.image;
      
      if (localFile) {
        setUploading(true);
        finalImageUrl = await uploadImageFile(localFile.file);
      }

      const payload = {
        ...formData,
        image: finalImageUrl,
      };

      const isUpdate = !!initialData?.id;
      const url = isUpdate ? `/api/testimonials/${initialData.id}` : "/api/testimonials";
      const method = isUpdate ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        if (localFile) URL.revokeObjectURL(localFile.preview);
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        throw new Error("Error saving testimonial");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el testimonio.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Columna Izquierda: Información (70%) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Card: Info del Cliente */}
          <section className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
              <div className="w-10 h-10 rounded-2xl bg-dorado/5 flex items-center justify-center text-dorado">
                <User size={20} />
              </div>
              <h2 className="text-xl font-serif font-bold text-carbon">Información del Cliente</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Nombre Completo</label>
                <Input 
                  value={formData.name} 
                  className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 text-lg transition-all font-medium" 
                  placeholder="ej: María González"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Evento / Ocasión</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gris-calido/30" size={18} />
                  <Input 
                    value={formData.event} 
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 transition-all font-medium text-slate-600" 
                    placeholder="ej: Boda en Quinta"
                    onChange={(e) => setFormData({ ...formData, event: e.target.value })} 
                    required 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Card: Testimonio */}
          <section className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
              <div className="w-10 h-10 rounded-2xl bg-dorado/5 flex items-center justify-center text-dorado">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-xl font-serif font-bold text-carbon">La Reseña</h2>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Texto del Testimonio</label>
              <Textarea 
                value={formData.text} 
                rows={6}
                className="rounded-3xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 text-base leading-relaxed p-6 transition-all" 
                placeholder="Escribe aquí lo que el cliente dijo..."
                onChange={(e) => setFormData({ ...formData, text: e.target.value })} 
                required 
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Calificación (Estrellas)</label>
              <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl w-fit">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`transition-all ${formData.rating! >= star ? 'text-dorado scale-110' : 'text-slate-200 hover:text-dorado/50'}`}
                  >
                    <Star size={32} fill={formData.rating! >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
                <span className="ml-4 font-bold text-carbon">{formData.rating} / 5</span>
              </div>
            </div>
          </section>
        </div>

        {/* Columna Derecha: Multimedia y Estado (30%) */}
        <div className="lg:col-span-4 space-y-10">
          {/* Card: Foto del Cliente */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gris-calido/40 border-b border-slate-50 pb-4">Foto de Perfil</h2>
            
            <div className={`relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-dashed ${(!formData.image && !localFile) ? 'border-slate-100 bg-slate-50/50' : 'border-transparent'}`}>
              {(formData.image || localFile) ? (
                <>
                  <Image 
                    src={localFile ? localFile.preview : formData.image!} 
                    alt="Cliente" 
                    fill 
                    className="object-cover"
                    unoptimized={localFile?.preview.startsWith('blob:') || formData.image?.startsWith('http')}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="animate-spin text-dorado w-10 h-10" />
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={localFile ? removeLocalImage : removeImage} 
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 p-3 rounded-2xl shadow-lg hover:bg-red-50 transition-all border border-slate-100"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 group"
                >
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-dorado group-hover:shadow-md transition-all">
                    <UploadCloud size={32} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/30">Subir Imagen</span>
                </button>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" />
            
            <p className="text-[10px] text-gris-calido/40 text-center px-4 leading-relaxed">
              La imagen se recortará automáticamente en formato cuadrado para el diseño de la web.
            </p>
          </section>

          {/* Card: Visibilidad */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gris-calido/40 border-b border-slate-50 pb-4">Visibilidad</h2>
            <label className="flex items-center justify-between p-5 bg-slate-50/50 rounded-[1.5rem] cursor-pointer hover:bg-slate-50 transition-all border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-carbon">Activo</span>
                  <span className="text-[10px] text-gris-calido/40">Visible en la web pública</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-all relative ${formData.active ? 'bg-green-500' : 'bg-slate-200'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.active} 
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${formData.active ? 'left-7' : 'left-1'}`} />
                </div>
            </label>
          </section>
        </div>
      </div>

      {/* Footer Flotante de Acciones */}
      <div className="fixed bottom-6 lg:bottom-10 left-4 right-4 lg:left-[calc(288px+2.5rem)] lg:right-10 z-30 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-slate-200 shadow-premium-lg flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 lg:px-10 animate-in slide-in-from-bottom-10 duration-700">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/50">Estado de edición</span>
          <span className="text-xs font-bold text-carbon">{formData.id ? 'Editando Testimonio' : 'Nuevo Testimonio'}</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="text-sm font-bold text-gris-calido hover:text-carbon transition-colors"
          >
            Descartar
          </button>
          <Button 
            type="submit" 
            className="bg-carbon hover:bg-black text-white px-12 h-14 rounded-2xl font-bold shadow-strong min-w-[200px] transition-all" 
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save className="mr-2 h-5 w-5" />} Guardar Testimonio
          </Button>
        </div>
      </div>
    </form>
  );
}
