'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { categorias, productos } from '@/data/mock';
import { CategoryCarousel } from '@/components/ui/CategoryCarousel';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';

export default function Catalogo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('destacados');
  const [showFiltros, setShowFiltros] = useState(false);

  const filteredProductos = useMemo(() => {
    let result = [...productos];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.descripcionCorta.toLowerCase().includes(query)
      );
    }

    if (selectedCategoria) {
      result = result.filter((p) => p.categoriaSlug === selectedCategoria);
    }

    switch (sortBy) {
      case 'nombre':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'destacados':
        result.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
        break;
      case 'precio':
        result.sort((a, b) => (a.precio || 0) - (b.precio || 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategoria, sortBy]);

  const activeFilters = useMemo(() => {
    const filters: { type: string; value: string; label: string }[] = [];
    if (selectedCategoria) {
      const cat = categorias.find((c) => c.slug === selectedCategoria);
      if (cat) {
        filters.push({ type: 'categoria', value: selectedCategoria, label: cat.nombre });
      }
    }
    return filters;
  }, [selectedCategoria]);

  const clearFilters = () => {
    setSelectedCategoria(null);
    setSearchQuery('');
  };

  const removeFilter = (type: string, value: string) => {
    if (type === 'categoria') {
      setSelectedCategoria(null);
    }
    console.log(value);
    
  };

  return (
    <div className="pt-24 pb-16 bg-crema min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-carbon mb-3">
            Nuestro Catálogo
          </h1>
          <p className="text-gris-calido text-lg">
            {productos.length} piezas de decoración premium para tu evento
          </p>
        </div>

        {/* Categories Carousel */}
        <div className="mb-10">
          <CategoryCarousel categorias={categorias} />
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gris-calido w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-borde rounded-full text-carbon placeholder-gris-calido focus:border-dorado focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Active Filters & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 items-center">
            {activeFilters.map((filter) => (
              <span
                key={`${filter.type}-${filter.value}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-dorado/10 text-dorado-oscuro text-sm rounded-full"
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.type, filter.value)}
                  className="hover:text-carbon"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-gris-calido hover:text-carbon underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFiltros(!showFiltros)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-borde rounded-full text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-borde rounded-full text-sm focus:border-dorado focus:outline-none cursor-pointer"
              >
                <option value="destacados">Destacados</option>
                <option value="nombre">Nombre A-Z</option>
                <option value="precio">Precio</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-calido pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          {filteredProductos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProductos.map((producto, index) => (
                <div
                  key={producto.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-borde">
              <p className="text-gris-calido mb-4">
                No se encontraron productos con los filtros seleccionados.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
