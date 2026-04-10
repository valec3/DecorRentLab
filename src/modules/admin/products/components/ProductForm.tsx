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

  const updateOpcion = (grupoIndex: number, opcionIndex: number, field: string, value: any) => {
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
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna Izquierda: Información Principal */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow- premium-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="w-10 h-10 rounded-2xl bg-dorado/10 flex items-center justify-center text-dorado">
                <Layers size={20} />
              </div>
              <h2 className="text-xl font-serif font-bold text-carbon">Información General</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/60">Nombre del Articulo</label>
                <Input value={formData.nombre} className="h-12 rounded-xl border-slate-200 focus:border-dorado focus:ring-dorado/10" onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/60">Slug (Automático)</label>
                <Input value={formData.slug} className="h-12 rounded-xl bg-slate-50 border-slate-200 text-gris-calido/50" readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/60">Categoría</label>
              <select className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-dorado focus:outline-none focus:ring-2 focus:ring-dorado/10" value={formData.categoriaSlug} onChange={(e) => setFormData({ ...formData, categoriaSlug: e.target.value })} required>
                <option value="">Seleccionar categoría...</option>
                {categorias.map((cat) => <option key={cat.id} value={cat.slug}>{cat.nombre}</option>)}
              </select>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/60">Resumen corto (Para el catálogo)</label>
                <Input value={formData.descripcionCorta} className="h-12 rounded-xl" onChange={(e) => setFormData({ ...formData, descripcionCorta: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/60">Descripción Completa (HTML)</label>
                <Textarea rows={6} className="rounded-2xl" value={formData.descripcionLarga} onChange={(e) => setFormData({ ...formData, descripcionLarga: e.target.value })} />
              </div>
            </div>
          </section>

          {/* Gestión de Atributos (Sistema Simple de 4 Variantes) */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-premium-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="w-10 h-10 rounded-2xl bg-carbon/5 flex items-center justify-center text-carbon">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-carbon">Variantes del Producto</h2>
                <p className="text-[10px] text-gris-calido/60 uppercase font-bold tracking-tighter">Color • Material • Acabado • Tamaño</p>
              </div>
            </div>

            <div className="space-y-10">
              {formData.atributos.map((grupo, gIndex) => (
                <div key={grupo.nombre} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-6 rounded-full ${
                          grupo.nombre === "Color" ? "bg-dorado" :
                          grupo.nombre === "Material" ? "bg-blue-400" :
                          grupo.nombre === "Acabado" ? "bg-purple-400" :
                          "bg-green-400"
                       }`} />
                       <h3 className="font-bold text-carbon text-sm">{grupo.nombre}</h3>
                    </div>
                    <button type="button" onClick={() => addOpcion(gIndex)} className="text-[10px] font-bold text-dorado hover:underline uppercase tracking-widest">+ Añadir {grupo.nombre}</button>
                  </div>

                  {grupo.opciones.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 pl-4">
                      {grupo.opciones.map((opc, oIndex) => (
                        <div key={oIndex} className="flex flex-wrap gap-3 items-center bg-slate-50/50 p-3 rounded-2xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-left-2">
                          <div className="flex-1 flex gap-3 items-center">
                            <Input 
                              className="h-10 border-none bg-white rounded-lg text-xs flex-1 shadow-sm" 
                              placeholder={grupo.tipoUi === 'color_picker' ? "Nombre (ej: Dorado)" : `Valor (ej: ${grupo.nombre === 'Tamaño' ? '2mts' : 'Madera'})`} 
                              value={opc.label} 
                              onChange={(e) => updateOpcion(gIndex, oIndex, "label", e.target.value)} 
                            />
                            
                            {grupo.tipoUi === 'color_picker' && (
                              <div className="flex items-center gap-2 px-3 bg-white rounded-lg h-10 border border-slate-100 min-w-[100px] shadow-sm">
                                <input 
                                  type="color" 
                                  className="w-5 h-5 rounded-full border-none bg-transparent cursor-pointer" 
                                  value={opc.valor || '#000000'} 
                                  onChange={(e) => updateOpcion(gIndex, oIndex, "valor", e.target.value)} 
                                />
                                <span className="text-[9px] font-mono text-gris-calido uppercase">{opc.valor}</span>
                              </div>
                            )}
                          </div>

                          <div className="w-32 flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-200 h-10 shadow-sm focus-within:border-dorado transition-colors">
                            <span className="text-[10px] font-bold text-dorado">+$</span>
                            <input type="number" className="bg-transparent border-none text-xs w-full focus:ring-0 font-bold text-carbon" placeholder="0" value={opc.precioAdicional} onChange={(e) => updateOpcion(gIndex, oIndex, "precioAdicional", parseFloat(e.target.value))} />
                          </div>
                          
                          <button type="button" onClick={() => removeOpcion(gIndex, oIndex)} className="text-slate-300 hover:text-red-500 transition-colors p-1"><X size={16} /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="pl-4 h-12 border-2 border-dotted border-slate-100 rounded-2xl flex items-center px-4">
                       <span className="text-[10px] text-gris-calido/30 uppercase font-bold">Sin opciones de {grupo.nombre}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Columna Derecha: Configuración y Precios */}
        <div className="space-y-10">
          {/* Precios: VENTA */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-premium-sm space-y-6">
            <div className="flex items-center gap-2 text-carbon">
              <Tag size={18} />
              <h2 className="text-lg font-serif font-bold">Precio Venta</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/60 block">Precio Normal ($)</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-carbon/40">$</span>
                  <Input 
                    type="number" 
                    className="h-14 pl-10 rounded-2xl border-slate-200 bg-white text-2xl font-serif text-carbon shadow-sm focus:border-dorado focus:ring-dorado/10 transition-all" 
                    value={formData.precioVentaNormal} 
                    onChange={(e) => setFormData({ ...formData, precioVentaNormal: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-green-600 block">Descuento ($)</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-green-600/40">-$</span>
                  <Input 
                    type="number" 
                    className="h-14 pl-10 rounded-2xl border-green-200 bg-green-50/30 text-2xl font-serif text-green-700 shadow-sm focus:border-green-500 focus:ring-green-500/10 transition-all" 
                    value={formData.descuentoVenta} 
                    onChange={(e) => setFormData({ ...formData, descuentoVenta: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center text-xs font-bold text-gris-calido px-1 border-t border-slate-100 mt-4 h-12">
                 <span>PRECIO FINAL:</span>
                 <span className="text-carbon text-xl">${formData.precioVentaNormal - formData.descuentoVenta}</span>
              </div>
            </div>
          </section>

          {/* Precios: ALQUILER */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-premium-sm space-y-6">
            <div className="flex items-center gap-2 text-carbon">
              <Layers size={18} />
              <h2 className="text-lg font-serif font-bold">Precio Alquiler</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gris-calido/60 block">Precio Normal ($)</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-carbon/40">$</span>
                  <Input 
                    type="number" 
                    className="h-14 pl-10 rounded-2xl border-slate-200 bg-white text-2xl font-serif text-carbon shadow-sm focus:border-dorado focus:ring-dorado/10 transition-all" 
                    value={formData.precioAlquilerNormal} 
                    onChange={(e) => setFormData({ ...formData, precioAlquilerNormal: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-blue-600 block">Descuento ($)</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-blue-600/40">-$</span>
                  <Input 
                    type="number" 
                    className="h-14 pl-10 rounded-2xl border-blue-200 bg-blue-50/30 text-2xl font-serif text-blue-700 shadow-sm focus:border-blue-500 focus:ring-blue-500/10 transition-all" 
                    value={formData.descuentoAlquiler} 
                    onChange={(e) => setFormData({ ...formData, descuentoAlquiler: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center text-xs font-bold text-gris-calido px-1 border-t border-slate-100 mt-4 h-12">
                 <span>PRECIO FINAL:</span>
                 <span className="text-carbon text-xl">${formData.precioAlquilerNormal - formData.descuentoAlquiler}</span>
              </div>
            </div>
          </section>

          {/* Ofertas Label */}
          <section className="bg-dorado/5 p-8 rounded-3xl border border-dorado/10 shadow-premium-sm space-y-6">
             <div className="flex items-center gap-2">
               <BadgePercent className="text-dorado" size={20} />
               <h2 className="text-sm font-bold text-dorado uppercase tracking-widest">Etiqueta de Promoción</h2>
             </div>
             <div className="space-y-1">
               <label className="text-[10px] font-bold uppercase text-gris-calido/70">Texto del Badge (ej: SALE, OFERTA)</label>
               <Input className="h-12 bg-white rounded-xl text-xs font-bold text-carbon text-center" placeholder="OFERTA" value={formData.etiquetaPromocion} onChange={(e) => setFormData({ ...formData, etiquetaPromocion: e.target.value })} />
             </div>
          </section>

          {/* Imágenes */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-premium-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-carbon">Galería</h2>
              <Button type="button" variant="outline" size="sm" className="rounded-xl h-8" onClick={() => fileInputRef.current?.click()}><Plus className="h-3 w-3" /></Button>
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" multiple accept="image/*" />
            </div>

            <div className={`grid grid-cols-2 gap-3 min-h-[160px] p-2 rounded-2xl ${formData.imagenes.length === 0 && localImageFiles.length === 0 ? 'border-2 border-dashed border-slate-100 flex items-center justify-center' : ''}`}>
              {formData.imagenes.map((url, index) => (
                <div key={url} className="relative aspect-square group overflow-hidden rounded-xl border border-slate-100">
                   <Image src={url} alt="Prod" fill className="object-cover transition-transform group-hover:scale-110" />
                   <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><X size={12} /></button>
                </div>
              ))}
              {localImageFiles.map((item, index) => (
                <div key={item.preview} className="relative aspect-square overflow-hidden rounded-xl border border-slate-100">
                  <Image src={item.preview} alt="Prev" fill className="object-cover opacity-60" />
                  {uploading && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                      <Loader2 className="animate-spin text-dorado w-6 h-6" />
                    </div>
                  )}
                  <button type="button" onClick={() => removeLocalImage(index)} className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-lg shadow-sm hover:bg-white transition-colors"><X size={12} /></button>
                </div>
              ))}
              
              {formData.imagenes.length === 0 && localImageFiles.length === 0 && (
                <div className="flex flex-col items-center gap-2 text-gris-calido/30">
                  <UploadCloud size={32} strokeWidth={1} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Añadir Fotos</span>
                </div>
              )}
            </div>
          </section>

          {/* Estado */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-premium-sm space-y-6">
             <div className="flex flex-col gap-4">
               <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <span className="text-sm font-bold text-carbon">Disponible para reserva</span>
                  <input type="checkbox" checked={formData.disponible} onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })} className="w-5 h-5 text-dorado rounded-lg focus:ring-dorado" />
               </label>
               <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <span className="text-sm font-bold text-carbon">Producto destacado</span>
                  <input type="checkbox" checked={formData.destacado} onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })} className="w-5 h-5 text-dorado rounded-lg focus:ring-dorado" />
               </label>
             </div>
          </section>
        </div>
      </div>

      {/* Footer Fijo o Final */}
      <div className="flex justify-end items-center gap-6 py-10 border-t border-slate-200 mt-10">
        <button type="button" onClick={() => router.back()} className="text-sm font-bold text-gris-calido hover:text-carbon transition-colors">Descartar cambios</button>
        <Button type="submit" className="bg-carbon hover:bg-carbon/90 text-white px-10 h-14 rounded-2xl font-bold shadow-strong" disabled={loading}>
          {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Save className="mr-2 h-5 w-5" />} Guardar Producto
        </Button>
      </div>
    </form>
  );
}
