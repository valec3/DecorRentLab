'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, X, Loader2 } from 'lucide-react';
import { Producto, Categoria } from '@/types';
import { PaginatedResult } from '@/services/supabase/products/interfaces';
import { CategoryCarousel } from '@/components/custom/CategoryCarousel';
import { ProductCard } from '@/components/custom/ProductCard';
import { Button } from '@/components/custom/Button';
import { useSearchParams } from 'next/navigation';

interface CatalogoContentProps {
  initialProductos: Producto[];
  initialCategorias: Categoria[];
  initialPagination: PaginatedResult<Producto>;
}

export function CatalogoContent({ 
  initialProductos, 
  initialCategorias, 
  initialPagination 
}: CatalogoContentProps) {
  const searchParams = useSearchParams();
  
  // Estados de datos
  const [productos, setProductos] = useState<Producto[]>(initialProductos);
  const [categorias] = useState<Categoria[]>(initialCategorias);
  const [pagination, setPagination] = useState<PaginatedResult<Producto> | null>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtros
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(searchParams.get('categoria'));
  const [sortBy, setSortBy] = useState('destacados');
  const [page, setPage] = useState(1);
  const perPage = 9;

  // Cargar Productos cuando cambian los filtros o la página
  useEffect(() => {
    // Evitar la primera carga si coinciden con los iniciales
    if (page === 1 && !selectedCategoria && !searchQuery && sortBy === 'destacados') return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('perPage', perPage.toString());
        if (selectedCategoria) params.set('categoria', selectedCategoria);
        if (searchQuery) params.set('search', searchQuery);
        if (sortBy) params.set('sortBy', sortBy);

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch');
        
        const result = await res.json();
        setProductos(result.data);
        setPagination(result);
      } catch (err) {
        setError('No se pudieron cargar los productos. Por favor, reintenta.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [page, selectedCategoria, searchQuery, sortBy]);

  // Actualizar filtros activos para la UI
  const activeFilters = useMemo(() => {
    const filters: { type: string; value: string; label: string }[] = [];
    if (selectedCategoria) {
      const cat = categorias.find((c) => c.slug === selectedCategoria);
      if (cat) {
        filters.push({ type: 'categoria', value: selectedCategoria, label: cat.nombre });
      }
    }
    return filters;
  }, [selectedCategoria, categorias]);

  const clearFilters = () => {
    setSelectedCategoria(null);
    setSearchQuery('');
    setSortBy('destacados');
    setPage(1);
  };

  const removeFilter = (type: string) => {
    if (type === 'categoria') {
      setSelectedCategoria(null);
      setPage(1);
    }
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
            {pagination?.count || 0} piezas de decoración premium para tu evento
          </p>
        </div>

        {/* Categories Carousel */}
        <div className="mb-10">
          <CategoryCarousel 
            categorias={categorias} 
            selectedSlug={selectedCategoria} 
            onSelect={(slug) => {
              setSelectedCategoria(slug);
              setPage(1);
            }} 
          />
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-3xl border border-borde shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gris-calido w-5 h-5" />
            <input
              type="text"
              placeholder="¿Qué estás buscando? (ej: copas, sillas...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-crema-oscuro/30 border-transparent rounded-2xl text-carbon placeholder-gris-calido focus:bg-white focus:border-dorado focus:outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative flex-1 md:flex-none md:w-56">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="w-full appearance-none pl-4 pr-10 py-3 bg-crema-oscuro/30 border-transparent rounded-2xl text-sm text-carbon focus:bg-white focus:border-dorado focus:outline-none cursor-pointer transition-all"
              >
                <option value="destacados">Ordenar por: Destacados</option>
                <option value="nombre">Nombre: A-Z</option>
                <option value="precio_asc">Precio: Menor a Mayor</option>
                <option value="precio_desc">Precio: Mayor a Menor</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-calido pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="text-xs text-gris-calido uppercase tracking-widest mr-2">Filtros activos:</span>
            {activeFilters.map((filter) => (
              <span
                key={`${filter.type}-${filter.value}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-dorado text-white text-xs font-bold rounded-full shadow-soft"
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.type)}
                  className="hover:text-white/80 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="text-xs text-gris-calido hover:text-dorado transition-colors ml-2 underline underline-offset-4"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gris-calido">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-dorado" />
              <p className="font-light tracking-widest text-xs uppercase">Actualizando catálogo...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={() => setPage(page)}>Reintentar</Button>
            </div>
          ) : productos.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {productos.map((producto, index) => (
                  <div
                    key={producto.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard producto={producto} />
                  </div>
                ))}
              </div>

              {/* Controles de Paginación */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    disabled={page === 1}
                    onClick={() => {
                      setPage(page - 1);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                  >
                    Anterior
                  </Button>
                  <div className="hidden sm:flex gap-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          setPage(num);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                          page === num 
                            ? 'bg-dorado text-white' 
                            : 'bg-white border border-borde text-carbon hover:border-dorado'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    disabled={page === pagination.totalPages}
                    onClick={() => {
                      setPage(page + 1);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
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
