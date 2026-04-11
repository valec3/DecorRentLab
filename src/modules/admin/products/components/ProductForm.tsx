"use client";

import { useState, useRef, useEffect } from "react";
import { Producto, Categoria, AtributoGrupo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Save,
  X,
  Plus,
  UploadCloud,
  Layers,
  Trash2,
  Tag,
  BadgePercent,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { uploadImageFile } from "@/services/custom/files";
import Image from "next/image";
import EditorTiptap from "@/components/custom/EditorTipTap";

interface ProductFormProps {
  initialData?: Producto | null;
  categorias: Categoria[];
}

const VARIANTES_FIJAS = ["Color", "Material", "Acabado", "Tamaño"] as const;

// Helper para generar slugs
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export function ProductForm({ initialData, categorias }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Inicializar atributos con las 4 categorías fijas
  const getInitialAtributos = () => {
    return VARIANTES_FIJAS.map(nombre => {
      const existing = (initialData?.atributos || []).find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
      if (existing) return existing;
      
      return {
        nombre,
        tipoUi: nombre === "Color" ? "color_picker" : "text",
        opciones: []
      } as AtributoGrupo;
    });
  };

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    nombre: initialData?.nombre || "",
    slug: initialData?.slug || "",
    descripcionLarga: initialData?.descripcionLarga || "",
    descripcionCorta: initialData?.descripcionCorta || "",
    // Usamos el precio original como base si existe, si no usamos el precio actual
    precioVentaNormal: initialData?.promocion?.precioOriginalVenta || initialData?.precioVenta || 0,
    precioAlquilerNormal: initialData?.promocion?.precioOriginalAlquiler || initialData?.precioAlquiler || 0,
    // Calculamos el descuento actual para mostrarlo en el input
    descuentoVenta: initialData?.promocion?.precioOriginalVenta ? (initialData.promocion.precioOriginalVenta - initialData.precioVenta) : 0,
    descuentoAlquiler: initialData?.promocion?.precioOriginalAlquiler ? (initialData.promocion.precioOriginalAlquiler - initialData.precioAlquiler) : 0,
    
    categoriaSlug: initialData?.categoriaSlug || "",
    disponible: initialData?.disponible ?? true,
    destacado: initialData?.destacado ?? false,
    imagenes: initialData?.imagenes || [],
    atributos: getInitialAtributos(),
    etiquetaPromocion: initialData?.promocion?.etiqueta || "",
  });

  const [localImageFiles, setLocalImageFiles] = useState<{ file: File; preview: string }[]>([]);

  // Auto-generación de Slug (No editable) con sufijo único para evitar colisiones
  useEffect(() => {
    if (formData.nombre && !initialData?.id) {
       const shortId = Math.random().toString(36).substring(2, 6);
       const newSlug = `${slugify(formData.nombre)}-${shortId}`;
       setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.nombre, initialData?.id]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setLocalImageFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeLocalImage = (index: number) => {
    setLocalImageFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  // Gestión de Opciones (Sistema Fijo 4 Categorías)
  const addOpcion = (grupoIndex: number) => {
    setFormData((prev) => {
      const newAtributos = [...prev.atributos];
      newAtributos[grupoIndex].opciones = [
        ...newAtributos[grupoIndex].opciones,
        { label: "", valor: "", precioAdicional: 0 },
      ];
      return { ...prev, atributos: newAtributos };
    });
  };

  const removeOpcion = (grupoIndex: number, opcionIndex: number) => {
    setFormData((prev) => {
      const newAtributos = [...prev.atributos];
      newAtributos[grupoIndex].opciones = newAtributos[grupoIndex].opciones.filter((_, i) => i !== opcionIndex);
      return { ...prev, atributos: newAtributos };
    });
  };

  const updateOpcion = (grupoIndex: number, opcionIndex: number, field: string, value: string | number) => {
    setFormData((prev) => {
      const newAtributos = [...prev.atributos];
      const grupo = newAtributos[grupoIndex];
      const newOpciones = [...grupo.opciones];
      const opcion = { ...newOpciones[opcionIndex], [field]: value };

      if (field === 'label' && grupo.tipoUi !== 'color_picker') {
        opcion.valor = value;
      }

      newOpciones[opcionIndex] = opcion;
      newAtributos[grupoIndex] = { ...grupo, opciones: newOpciones };
      return { ...prev, atributos: newAtributos };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImages = [...formData.imagenes];
      if (localImageFiles.length > 0) {
        setUploading(true);
        const uploadPromises = localImageFiles.map((item) => uploadImageFile(item.file));
        const uploadedUrls = await Promise.all(uploadPromises);
        finalImages = [...finalImages, ...uploadedUrls];
      }

      // Preparar precios calculados
      const precioVentaFinal = formData.precioVentaNormal - formData.descuentoVenta;
      const precioAlquilerFinal = formData.precioAlquilerNormal - formData.descuentoAlquiler;

      // Filtrar variantes vacías antes de guardar
      const atributosFinales = formData.atributos.filter(a => a.opciones.length > 0);

      const payload = {
        ...formData,
        precioVenta: precioVentaFinal,
        precioAlquiler: precioAlquilerFinal,
        atributos: atributosFinales,
        imagenes: finalImages,
        promocion: {
          precioOriginalVenta: formData.descuentoVenta > 0 ? formData.precioVentaNormal : 0,
          precioOriginalAlquiler: formData.descuentoAlquiler > 0 ? formData.precioAlquilerNormal : 0,
          etiqueta: formData.etiquetaPromocion,
        }
      };

      // Determinar si es una actualización o creación
      const isUpdate = !!formData.id;
      const url = isUpdate ? `/api/products/${formData.id}` : "/api/products";
      const method = isUpdate ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error saving product");
      localImageFiles.forEach((item) => URL.revokeObjectURL(item.preview));
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el producto.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 pb-20">
      {/* 1. Galería Hero - Prioridad Alta */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-premium-lg space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-dorado/10 flex items-center justify-center text-dorado">
              <UploadCloud size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-carbon">Galería del Producto</h2>
              <p className="text-xs text-gris-calido/60 font-medium">Sube imágenes de alta calidad para resaltar los detalles.</p>
            </div>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            className="rounded-2xl h-12 px-6 border-dorado/20 text-dorado hover:bg-dorado/5 font-bold transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="mr-2 h-4 w-4" /> Añadir Fotos
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" multiple accept="image/*" />
        </div>

        <div className={`min-h-[200px] p-4 rounded-3xl transition-all ${
          (formData.imagenes.length === 0 && localImageFiles.length === 0) 
            ? 'border-2 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center' 
            : 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-slate-50/30'
        }`}>
          {formData.imagenes.map((url, index) => (
            <div key={url} className="relative aspect-square group overflow-hidden rounded-2xl border border-white shadow-sm hover:shadow-md transition-all">
               <Image src={url} alt="Prod" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
               <button type="button" onClick={() => removeImage(index)} className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-50"><Trash2 size={16} /></button>
            </div>
          ))}
          {localImageFiles.map((item, index) => (
            <div key={item.preview} className="relative aspect-square overflow-hidden rounded-2xl border border-white shadow-sm ring-2 ring-dorado/20">
              <Image src={item.preview} alt="Prev" fill className="object-cover opacity-70" />
              {uploading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="animate-spin text-dorado w-8 h-8" />
                </div>
              )}
              <button type="button" onClick={() => removeLocalImage(index)} className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-50 transition-all"><X size={16} /></button>
            </div>
          ))}
          
          {formData.imagenes.length === 0 && localImageFiles.length === 0 && (
            <div className="flex flex-col items-center gap-3 text-gris-calido/30 text-center">
              <UploadCloud size={48} strokeWidth={1} />
              <span className="text-xs uppercase font-bold tracking-[0.2em]">Arrastra o selecciona archivos</span>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Columna Izquierda: Información y Descripción (70%) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Card: Info Básica */}
          <section className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
               <div className="w-10 h-10 rounded-2xl bg-carbon/5 flex items-center justify-center text-carbon">
                 <Layers size={20} />
               </div>
               <h2 className="text-xl font-serif font-bold text-carbon">Detalles del Artículo</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Nombre del Producto</label>
                <Input 
                  value={formData.nombre} 
                  className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-dorado focus:ring-dorado/10 text-lg transition-all" 
                  placeholder="ej: Panel Cilíndrico de Terciopelo"
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-calido/50 ml-1">Slug Identificador</label>
                <Input 
                  value={formData.slug} 
                  className="h-14 rounded-2xl bg-slate-100/50 border-transparent text-gris-calido/40 cursor-not-allowed font-mono text-xs" 
                  readOnly 
                />
              </div>
            </div>
          </section>

          {/* Card: Descripción Enriquecida - PRIORIDAd */}
          <section className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-dorado/5 flex items-center justify-center text-dorado">
                   <Plus size={20} />
                 </div>
                 <h2 className="text-xl font-serif font-bold text-carbon">Descripción Detallada</h2>
               </div>
               <span className="text-[10px] font-bold text-dorado uppercase tracking-widest bg-dorado/5 px-3 py-1 rounded-full">Rich Text Editor</span>
            </div>
            
            <div className="min-h-[400px] border border-slate-100 rounded-3xl overflow-hidden focus-within:ring-2 focus-within:ring-dorado/10 transition-all">
              <EditorTiptap 
                value={formData.descripcionLarga} 
                onChange={(content) => setFormData({ ...formData, descripcionLarga: content })} 
              />
            </div>
          </section>

          {/* Card: Variantes */}
          <section className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-carbon/5 flex items-center justify-center text-carbon">
                  <Plus size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-carbon">Variantes y Atributos</h2>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {formData.atributos.map((grupo, gIndex) => (
                <div key={grupo.nombre} className="space-y-6">
                  <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <div className={`w-3 h-3 rounded-full ${
                          grupo.nombre === "Color" ? "bg-dorado" :
                          grupo.nombre === "Material" ? "bg-blue-400" :
                          "bg-carbon/20"
                       }`} />
                       <h3 className="font-bold text-carbon text-base">{grupo.nombre}</h3>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => addOpcion(gIndex)} 
                      className="text-[10px] font-bold text-dorado uppercase tracking-widest hover:bg-dorado/5 rounded-xl h-8"
                    >
                      + Añadir opción
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pl-2">
                    {grupo.opciones.map((opc, oIndex) => (
                      <div key={oIndex} className="flex flex-wrap md:flex-nowrap gap-4 items-center animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="flex-1 flex gap-4 items-center bg-white p-1 rounded-2xl border border-slate-100 shadow-sm focus-within:border-dorado transition-all">
                          <Input 
                            className="h-12 border-none bg-transparent rounded-xl text-sm flex-1 focus:ring-0" 
                            placeholder={grupo.tipoUi === 'color_picker' ? "Nombre (ej: Oro Rosa)" : `Valor`} 
                            value={opc.label} 
                            onChange={(e) => updateOpcion(gIndex, oIndex, "label", e.target.value)} 
                          />
                          
                          {grupo.tipoUi === 'color_picker' && (
                            <div className="flex items-center gap-3 px-4 bg-slate-50 rounded-xl h-10 border border-slate-100 mr-1">
                              <input 
                                type="color" 
                                className="w-6 h-6 rounded-full border-2 border-white bg-transparent cursor-pointer shadow-sm" 
                                value={opc.valor || '#000000'} 
                                onChange={(e) => updateOpcion(gIndex, oIndex, "valor", e.target.value)} 
                              />
                              <span className="text-[10px] font-mono text-gris-calido/70 uppercase font-bold">{opc.valor}</span>
                            </div>
                          )}
                        </div>

                        <div className="w-40 flex items-center gap-3 bg-white px-4 rounded-2xl border border-slate-100 h-14 shadow-sm focus-within:border-dorado transition-all">
                          <span className="text-xs font-bold text-dorado">+$</span>
                          <input 
                            type="number" 
                            className="bg-transparent border-none text-sm w-full focus:ring-0 font-bold text-carbon" 
                            placeholder="0" 
                            value={opc.precioAdicional} 
                            onChange={(e) => updateOpcion(gIndex, oIndex, "precioAdicional", parseFloat(e.target.value))} 
                          />
                        </div>
                        
                        <button 
                          type="button" 
                          onClick={() => removeOpcion(gIndex, oIndex)} 
                          className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                    {grupo.opciones.length === 0 && (
                      <p className="text-xs text-gris-calido/30 italic pl-4">No hay opciones definidas para {grupo.nombre}.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Columna Derecha: Sidebar (30%) */}
        <div className="lg:col-span-4 space-y-10">
          {/* Card: Visibilidad */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gris-calido/40 border-b border-slate-50 pb-4">Publicación</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-slate-50/50 rounded-[1.5rem] cursor-pointer hover:bg-slate-50 transition-all border border-slate-100">
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-carbon">Disponible</span>
                   <span className="text-[10px] text-gris-calido/40">Activo para reservas</span>
                 </div>
                 <input type="checkbox" checked={formData.disponible} onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })} className="w-5 h-5 text-dorado rounded-lg focus:ring-dorado" />
              </label>
              <label className="flex items-center justify-between p-4 bg-slate-50/50 rounded-[1.5rem] cursor-pointer hover:bg-slate-50 transition-all border border-slate-100">
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-carbon">Destacado</span>
                   <span className="text-[10px] text-gris-calido/40">Mostrar en home</span>
                 </div>
                 <input type="checkbox" checked={formData.destacado} onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })} className="w-5 h-5 text-dorado rounded-lg focus:ring-dorado" />
              </label>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/40 ml-1">Categoría Principal</label>
              <select 
                className="flex h-14 w-full rounded-2xl bg-slate-50/50 border border-slate-100 px-5 text-sm font-bold text-carbon focus:border-dorado focus:outline-none transition-all appearance-none cursor-pointer" 
                value={formData.categoriaSlug} 
                onChange={(e) => setFormData({ ...formData, categoriaSlug: e.target.value })} 
                required
              >
                <option value="">Seleccionar...</option>
                {categorias.map((cat) => <option key={cat.id} value={cat.slug}>{cat.nombre}</option>)}
              </select>
            </div>
          </section>

          {/* Card: Precios Estratégicos */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gris-calido/40 border-b border-slate-50 pb-4">Finanzas</h2>
            
            {/* Venta */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-carbon">
                <Tag size={16} className="text-dorado" />
                <span className="text-sm font-bold">Venta</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gris-calido/40 uppercase tracking-widest">Normal</span>
                  <Input 
                    type="number" 
                    className="h-12 rounded-xl border-slate-100 bg-slate-50 font-bold" 
                    value={formData.precioVentaNormal} 
                    onChange={(e) => setFormData({ ...formData, precioVentaNormal: parseFloat(e.target.value) })} 
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-green-600/40 uppercase tracking-widest">Desc. </span>
                  <Input 
                    type="number" 
                    className="h-12 rounded-xl border-green-100 bg-green-50/50 text-green-700 font-bold" 
                    value={formData.descuentoVenta} 
                    onChange={(e) => setFormData({ ...formData, descuentoVenta: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
            </div>

            {/* Alquiler */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-carbon">
                <Layers size={16} className="text-dorado" />
                <span className="text-sm font-bold">Alquiler</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gris-calido/40 uppercase tracking-widest">Normal</span>
                  <Input 
                    type="number" 
                    className="h-12 rounded-xl border-slate-100 bg-slate-50 font-bold" 
                    value={formData.precioAlquilerNormal} 
                    onChange={(e) => setFormData({ ...formData, precioAlquilerNormal: parseFloat(e.target.value) })} 
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-blue-600/40 uppercase tracking-widest">Desc.</span>
                  <Input 
                    type="number" 
                    className="h-12 rounded-xl border-blue-100 bg-blue-50/50 text-blue-700 font-bold" 
                    value={formData.descuentoAlquiler} 
                    onChange={(e) => setFormData({ ...formData, descuentoAlquiler: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
            </div>

            {/* Badge Promocional */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-dorado">
                <BadgePercent size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Etiqueta Oferta</span>
              </div>
              <Input 
                className="h-12 bg-dorado/5 border-dorado/10 rounded-xl text-center font-bold text-dorado text-xs" 
                placeholder="ej: -15% HOY" 
                value={formData.etiquetaPromocion} 
                onChange={(e) => setFormData({ ...formData, etiquetaPromocion: e.target.value })} 
              />
            </div>
          </section>

          {/* Card: Resumen Rápido */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gris-calido/40 pb-2">Resumen Corto</h2>
            <Textarea 
              rows={4} 
              className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-xs leading-relaxed" 
              placeholder="Descripción breve para la tarjeta del catálogo..."
              value={formData.descripcionCorta} 
              onChange={(e) => setFormData({ ...formData, descripcionCorta: e.target.value })} 
            />
          </section>
        </div>
      </div>

      {/* Footer Flotante de Acciones */}
      <div className="fixed bottom-6 lg:bottom-10 left-4 right-4 lg:left-[calc(288px+2.5rem)] lg:right-10 z-30 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-slate-200 shadow-premium-lg flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 lg:px-10 animate-in slide-in-from-bottom-10 duration-700">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/50">Estado del guardado</span>
          <span className="text-xs font-bold text-carbon">{formData.id ? 'Editando Artículo' : 'Nuevo Artículo'}</span>
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
            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save className="mr-2 h-5 w-5" />} Guardar Producto
          </Button>
        </div>
      </div>
    </form>
  );
}
