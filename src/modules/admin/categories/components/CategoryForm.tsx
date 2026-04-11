"use client";

import { useState } from "react";
import { Categoria } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

import { slugify } from "@/lib/utils";

interface CategoryFormProps {
  initialData?: Categoria | null;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    slug: initialData?.slug || "",
    descripcion: initialData?.descripcion || "",
  });

  const handleNameChange = (val: string) => {
    const newSlug = !initialData ? slugify(val) : formData.slug;
    setFormData({ ...formData, nombre: val, slug: newSlug });
  };

  const handleSlugChange = (val: string) => {
    setFormData({ ...formData, slug: slugify(val) });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = initialData ? `/api/categories/${initialData.id}` : "/api/categories";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error saving category");

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-borde/50 shadow-sm max-w-2xl">
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-carbon">Detalles de la Categoría</h2>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70 ml-1">Nombre</label>
          <Input 
            value={formData.nombre}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ej: Paneles Shimmer"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70 ml-1">Slug (URL Path)</label>
          <Input 
            value={formData.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="paneles-shimmer"
            required
          />
          <p className="text-[10px] text-gris-calido px-1 italic">Solo letras, números y guiones. Sin símbolos ni espacios.</p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gris-calido/70 ml-1">Descripción</label>
          <textarea 
            rows={4}
            className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm focus:border-dorado focus:outline-none focus:ring-2 focus:ring-dorado/20"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Describe el tipo de productos que pertenecerán a esta categoría..."
          />
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
            <><Save className="mr-2 h-4 w-4" /> Guardar Categoría</>
          )}
        </Button>
      </div>
    </form>
  );
}
