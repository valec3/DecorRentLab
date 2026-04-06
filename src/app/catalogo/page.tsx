'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, Loader2 } from 'lucide-react';
import { Producto, Categoria } from '@/types';
import { PaginatedResult } from '@/services/supabase/products/interfaces';
import { CategoryCarousel } from '@/components/custom/CategoryCarousel';
import { ProductCard } from '@/components/custom/ProductCard';
import { Button } from '@/components/custom/Button';
import { useSearchParams } from 'next/navigation';

function CatalogoContent() {
  const searchParams = useSearchParams();
  
  // Estados de datos
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pagination, setPagination] = useState<PaginatedResult<Producto> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtros (Sincronizados con URL opcionalmente)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(searchParams.get('categoria'));
  const [sortBy, setSortBy] = useState('destacados');
  const [page, setPage] = useState(1);
  const perPage = 9;

  // Cargar Categorías iniciales
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch('/api/categories');
        const cats = await res.json();
        if (Array.isArray(cats)) setCategorias(cats);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };
    fetchCats();
  }, []);

  // Cargar Productos cuando cambian los filtros o la página
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('perPage', perPage.toString());
        if (selectedCategoria) params.set('categoria', selectedCategoria);
        if (searchQuery) params.set('search', searchQuery);

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

    const timer = setTimeout(fetchProducts, searchParams.get('q') === searchQuery ? 0 : 500);
    return () => clearTimeout(timer);
  }, [page, selectedCategoria, searchQuery, searchParams]);

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

        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gris-calido w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
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
                  onClick={() => removeFilter(filter.type)}
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
              onClick={() => {}}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Anterior
                  </Button>
                  <div className="flex gap-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          setPage(num);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
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
                      window.scrollTo({ top: 0, behavior: 'smooth' });
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

import { Suspense } from 'react';

export default function Catalogo() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-20 text-gris-calido bg-crema">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-dorado" />
        <p className="font-light tracking-widest text-sm uppercase">Cargando catálogo...</p>
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}

