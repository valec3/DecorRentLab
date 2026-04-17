"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Categoria } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Loader2, 
  Save, 
  UploadCloud, 
  X, 
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadImageFile } from "@/services/custom/files";
import { slugify } from "@/lib/utils";

interface CategoryFormProps {
  initialData?: Categoria | null;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    slug: initialData?.slug || "",
    descripcion: initialData?.descripcion || "",
    imagenCover: initialData?.imagenCover || "",
  });

  const [localFile, setLocalFile] = useState<{ file: File; preview: string } | null>(null);

  const handleNameChange = (val: string) => {
    const newSlug = !initialData ? slugify(val) : formData.slug;
    setFormData({ ...formData, nombre: val, slug: newSlug });
  };

  const handleSlugChange = (val: string) => {
    setFormData({ ...formData, slug: slugify(val) });
  };

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
    setFormData((prev) => ({ ...prev, imagenCover: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let finalImageUrl = formData.imagenCover;
      
      if (localFile) {
        setUploading(true);
        finalImageUrl = await uploadImageFile(localFile.file);
      }

      const endpoint = initialData ? `/api/categories/${initialData.id}` : "/api/categories";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          imagenCover: finalImageUrl,
        }),
      });

      if (!res.ok) throw new Error("Error saving category");

      if (localFile) URL.revokeObjectURL(localFile.preview);
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar la categoría.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 pb-20 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Información (70%) */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
              <div className="w-10 h-10 rounded-2xl bg-dorado/5 flex items-center justify-center text-dorado">
                <Info size={20} />
              </div>
              <h2 className="text-xl font-serif font-bold text-carbon">Información General</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Nombre de la Categoría</label>
                <Input 
                  value={formData.nombre}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ej: Paneles Shimmer"
                  className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 text-lg transition-all"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Slug (URL Path)</label>
                <Input 
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="paneles-shimmer"
                  className="h-14 rounded-2xl bg-slate-100/50 border-transparent text-gris-calido/40 font-mono text-xs"
                  required
                />
                <p className="text-[10px] text-gris-calido/40 px-1 italic">Solo letras, números y guiones. Sin símbolos ni espacios.</p>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Descripción</label>
                <textarea 
                  rows={5}
                  className="flex min-h-[120px] w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm focus:bg-white focus:border-dorado focus:outline-none focus:ring-2 focus:ring-dorado/10 transition-all"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describe el tipo de productos que pertenecerán a esta categoría..."
                />
              </div>
            </div>
          </section>
        </div>

        {/* Columna Derecha: Imagen (30%) */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <div className="p-2 bg-dorado/10 rounded-xl text-dorado">
                <UploadCloud size={18} />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-carbon">Imagen Cover</h2>
            </div>
            
            <div className={`relative aspect-square rounded-3xl overflow-hidden border-2 border-dashed transition-all ${(!formData.imagenCover && !localFile) ? 'border-slate-200 bg-slate-50' : 'border-transparent'}`}>
              {(formData.imagenCover || localFile) ? (
                <>
                  <Image 
                    src={localFile ? localFile.preview : formData.imagenCover} 
                    alt="Cover de Categoría" 
                    fill 
                    className="object-cover"
                    unoptimized={!!localFile}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="animate-spin text-dorado w-10 h-10" />
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={localFile ? removeLocalImage : removeImage} 
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-50 transition-all border border-slate-100"
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
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-dorado group-hover:shadow-md transition-all">
                    <UploadCloud size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/50">Subir Imagen</span>
                </button>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept="image/*" 
            />
            <p className="text-[11px] text-center text-gris-calido/40 leading-relaxed px-2">
              Esta imagen se mostrará en las tarjetas de categoría del catálogo.
            </p>
          </section>
        </div>
      </div>

      {/* Footer Flotante de Acciones */}
      <div className="fixed bottom-6 lg:bottom-10 left-4 right-4 lg:left-[calc(288px+2.5rem)] lg:right-10 z-30 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-slate-200 shadow-premium-lg flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 lg:px-10 animate-in slide-in-from-bottom-10 duration-700">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/50">Estado</span>
          <span className="text-sm font-bold text-carbon">{initialData ? 'Editando Categoría' : 'Nueva Categoría'}</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="text-sm font-bold text-gris-calido hover:text-carbon transition-colors"
          >
            Cancelar
          </button>
          <Button 
            type="submit" 
            className="bg-carbon hover:bg-black text-white px-12 h-14 rounded-2xl font-bold shadow-strong min-w-[200px] transition-all" 
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save className="mr-2 h-5 w-5" />} Guardar Categoría
          </Button>
        </div>
      </div>
    </form>
  );
}
