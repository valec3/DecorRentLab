"use client";

import { useState } from "react";
import { Producto, Categoria } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  initialData?: Producto | null;
  categorias: Categoria[];
}

export function ProductForm({ initialData, categorias }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    slug: initialData?.slug || "",
    descripcionLarga: initialData?.descripcionLarga || "",
    descripcionCorta: initialData?.descripcionCorta || "",
    precioAlquiler: initialData?.precioAlquiler || 0,
    categoriaSlug: initialData?.categoriaSlug || "",
    disponible: initialData?.disponible ?? true,
    destacado: initialData?.destacado ?? false,
    imagenes: initialData?.imagenes || [],
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = initialData ? `/api/products/${initialData.id}` : "/api/products";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error saving product");

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-borde/50 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos Básicos */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-carbon">Información Básica</h2>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70">Nombre del Producto</label>
            <Input 
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Sofá Vintage de Terciopelo"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70">Slug (URL)</label>
            <Input 
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="sofa-vintage-terciopelo"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70">Categoría</label>
            <select 
              className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:border-dorado focus:outline-none focus:ring-2 focus:ring-dorado/20"
              value={formData.categoriaSlug}
              onChange={(e) => setFormData({ ...formData, categoriaSlug: e.target.value })}
              required
            >
              <option value="">Seleccionar categoría...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Precios y Estado */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-carbon">Precios y Visibilidad</h2>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70">Precio de Alquiler</label>
            <Input 
              type="number"
              value={formData.precioAlquiler}
              onChange={(e) => setFormData({ ...formData, precioAlquiler: parseFloat(e.target.value) })}
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex gap-8 pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.disponible}
                onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
                className="w-4 h-4 text-dorado rounded border-slate-300 focus:ring-dorado"
              />
              <span className="text-sm font-medium text-carbon">Disponible para alquiler</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.destacado}
                onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                className="w-4 h-4 text-dorado rounded border-slate-300 focus:ring-dorado"
              />
              <span className="text-sm font-medium text-carbon">Producto destacado</span>
            </label>
          </div>
        </div>

        {/* Descripciones */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-carbon">Contenido</h2>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70">Resumen en Catálogo (Max 100 carácteres)</label>
            <Input 
              value={formData.descripcionCorta}
              onChange={(e) => setFormData({ ...formData, descripcionCorta: e.target.value })}
              placeholder="Breve descripción para la tarjeta..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70">Descripción Completa</label>
            <Textarea 
              rows={5}
              value={formData.descripcionLarga}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, descripcionLarga: e.target.value })}
              placeholder="Detalla todas las características del producto..."
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-borde/20">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          className="bg-dorado hover:bg-dorado-oscuro text-white px-8"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <><Save className="mr-2 h-4 w-4" /> Guardar Producto</>
          )}
        </Button>
      </div>
    </form>
  );
}
