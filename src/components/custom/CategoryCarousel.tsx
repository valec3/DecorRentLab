'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Categoria } from '@/types';

interface CategoryCarouselProps {
  categorias: Categoria[];
  selectedSlug?: string | null;
  onSelect?: (slug: string | null) => void;
}

export function CategoryCarousel({ categorias, selectedSlug, onSelect }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, []);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto md:overflow-x-hidden pb-4 px-2 cursor-grab select-none scrollbar-hide md:scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {categorias.map((categoria) => {
          const isActive = selectedSlug === categoria.slug;
          const content = (
            <div className="shrink-0 group cursor-pointer text-center">
              <div className={`relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 p-1 rounded-full border transition-all duration-700 ${
                isActive ? 'border-dorado shadow-glow' : 'border-dorado/10 group-hover:border-dorado/30'
              }`}>
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white shadow-premium-sm group-hover:shadow-premium-md transition-all duration-700 group-hover:scale-[1.02]">
                  <Image
                    src={categoria.imagenCover || "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&auto=format&fit=crop"}
                    alt={categoria.nombre}
                    fill
                    className={`object-cover transition-transform duration-1000 group-hover:scale-105 ${isActive ? 'scale-110' : ''}`}
                    draggable={false}
                  />
                  <div className={`absolute inset-0 bg-linear-to-t from-carbon/40 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
              </div>
              <p className={`mt-3 text-[10px] md:text-[12px] font-medium tracking-premium max-w-[120px] mx-auto transition-colors duration-500 line-clamp-2 ${
                isActive ? 'text-dorado' : 'text-carbon group-hover:text-dorado'
              }`}>
                {categoria.nombre}
              </p>
            </div>
          );

          if (onSelect) {
            return (
              <div key={categoria.id} onClick={() => onSelect(categoria.slug)}>
                {content}
              </div>
            );
          }

          return (
            <Link key={categoria.id} href={`/catalogo/${categoria.slug}`}>
              {content}
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-dorado hover:text-white ${
          showArrows ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-dorado hover:text-white ${
          showArrows ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
