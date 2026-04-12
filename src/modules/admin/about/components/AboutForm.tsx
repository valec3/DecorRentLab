"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AboutContent, ServiceItem, ValueItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Save, 
  Loader2, 
  Trash2, 
  Plus, 
  Info,
  History,
  Briefcase,
  Star,
  UploadCloud,
  X
} from "lucide-react";
import { uploadImageFile } from "@/services/custom/files";

interface AboutFormProps {
  initialData: AboutContent;
}

export function AboutForm({ initialData }: AboutFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<AboutContent>(initialData);
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
    setFormData((prev) => ({ ...prev, mainImage: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.mainImage;
      
      if (localFile) {
        setUploading(true);
        finalImageUrl = await uploadImageFile(localFile.file);
      }

      const payload = {
        ...formData,
        mainImage: finalImageUrl,
      };

      const response = await fetch("/api/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      alert("Contenido actualizado correctamente");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al guardar los cambios");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...formData.historyParagraphs];
    newParagraphs[index] = value;
    setFormData({ ...formData, historyParagraphs: newParagraphs });
  };

  const addParagraph = () => {
    setFormData({ 
      ...formData, 
      historyParagraphs: [...formData.historyParagraphs, ""] 
    });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = formData.historyParagraphs.filter((_, i) => i !== index);
    setFormData({ ...formData, historyParagraphs: newParagraphs });
  };

  const handleServiceChange = (index: number, field: keyof ServiceItem, value: string) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData({ ...formData, services: newServices });
  };

  const handleValueChange = (index: number, field: keyof ValueItem, value: string) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-20">
      {/* Hero Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-dorado/10 rounded-xl text-dorado">
            <Info size={20} />
          </div>
          <h2 className="text-xl font-serif font-bold text-carbon">Información General</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gris-calido ml-1">Título Principal</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-12 rounded-xl"
              placeholder="Ej: Sobre Nosotros"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gris-calido ml-1">Imagen Principal</label>
            <div className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed transition-all ${(!formData.mainImage && !localFile) ? 'border-slate-200 bg-slate-50' : 'border-transparent'}`}>
              {(formData.mainImage || localFile) ? (
                <>
                  <Image 
                    src={localFile ? localFile.preview : formData.mainImage} 
                    alt="Imagen Principal" 
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
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/50">Subir Imagen Principal</span>
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
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gris-calido ml-1">Descripción Corta (Hero)</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[100px] rounded-2xl resize-none p-4"
            placeholder="Una breve introducción..."
            required
          />
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-dorado/10 rounded-xl text-dorado">
            <History size={20} />
          </div>
          <h2 className="text-xl font-serif font-bold text-carbon">Nuestra Historia</h2>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gris-calido ml-1">Título de Historia</label>
          <Input
            value={formData.historyTitle}
            onChange={(e) => setFormData({ ...formData, historyTitle: e.target.value })}
            className="h-12 rounded-xl"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-widest text-gris-calido ml-1">Párrafos de Historia</label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addParagraph}
              className="rounded-full h-8 text-[10px]"
            >
              <Plus size={14} className="mr-1" /> Añadir Párrafo
            </Button>
          </div>
          
          {formData.historyParagraphs.map((p, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={p}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                className="min-h-[100px] rounded-2xl resize-none p-4"
                placeholder={`Párrafo ${index + 1}`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeParagraph(index)}
                className="text-red-400 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-dorado/10 rounded-xl text-dorado">
            <Briefcase size={20} />
          </div>
          <h2 className="text-xl font-serif font-bold text-carbon">Nuestros Servicios</h2>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gris-calido ml-1">Título de Sección Servicios</label>
          <Input
            value={formData.servicesTitle}
            onChange={(e) => setFormData({ ...formData, servicesTitle: e.target.value })}
            className="h-12 rounded-xl"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formData.services.map((service, index) => (
            <div key={index} className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
              <div className="space-y-2">
                <Input
                  value={service.title}
                  onChange={(e) => handleServiceChange(index, "title", e.target.value)}
                  placeholder="Título del Servicio"
                  className="bg-white rounded-xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                  placeholder="Descripción del Servicio"
                  className="bg-white rounded-xl min-h-[80px] resize-none text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-dorado/10 rounded-xl text-dorado">
            <Star size={20} />
          </div>
          <h2 className="text-xl font-serif font-bold text-carbon">Nuestros Valores</h2>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gris-calido ml-1">Título de Sección Valores</label>
          <Input
            value={formData.valuesTitle}
            onChange={(e) => setFormData({ ...formData, valuesTitle: e.target.value })}
            className="h-12 rounded-xl"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {formData.values.map((value, index) => (
            <div key={index} className="p-5 bg-slate-50 rounded-3xl space-y-3 border border-slate-100">
              <Input
                value={value.title}
                onChange={(e) => handleValueChange(index, "title", e.target.value)}
                placeholder="Valor"
                className="bg-white rounded-xl font-bold text-center"
              />
              <Textarea
                value={value.description}
                onChange={(e) => handleValueChange(index, "description", e.target.value)}
                placeholder="Descripción"
                className="bg-white rounded-xl min-h-[60px] resize-none text-xs text-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="h-16 px-10 rounded-full bg-carbon text-white shadow-glow hover:bg-black transition-all group scale-110"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Save className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
          )}
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
