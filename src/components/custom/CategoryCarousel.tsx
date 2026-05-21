'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Categoria } from '@/types';
import { motion } from 'framer-motion';

interface CategoryCarouselProps {
  categorias: Categoria[];
  selectedSlug?: string | null;
  onSelect?: (slug: string | null) => void;
}

export function CategoryCarousel({ categorias, selectedSlug, onSelect }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const [showArrows, setShowArrows] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      isDragging.current = false;
      if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    };
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;

  const buildContent = (categoria: Categoria) => {
    const isActive = selectedSlug === categoria.slug;
    const isHovered = hoveredId === categoria.id;

    return (
      <div
        className="shrink-0 cursor-pointer text-center select-none"
        onMouseEnter={() => setHoveredId(categoria.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Anillo exterior */}
        <motion.div
          animate={{
            borderColor: isActive || isHovered ? 'rgba(197,160,89,0.8)' : 'rgba(197,160,89,0.12)',
            boxShadow: isActive
              ? '0 0 20px rgba(197,160,89,0.35)'
              : isHovered
              ? '0 0 14px rgba(197,160,89,0.2)'
              : 'none',
          }}
          transition={{ duration: 0.5, ease }}
          className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 p-1 rounded-full border"
        >
          {/* Círculo imagen */}
          <div className="relative w-full h-full rounded-full overflow-hidden border border-white/60">
            {/* Imagen con zoom */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered || isActive ? 1.1 : 1 }}
              transition={{ duration: 0.7, ease }}
            >
              <Image
                src={
                  categoria.imagenCover ||
                  'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&auto=format&fit=crop'
                }
                alt={categoria.nombre}
                fill
                className="object-cover"
                draggable={false}
              />
            </motion.div>

            {/* Overlay con nombre centrado sobre la imagen */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-full"
              animate={{
                backgroundColor: isHovered
                  ? 'rgba(28,26,25,0.55)'
                  : isActive
                  ? 'rgba(28,26,25,0.4)'
                  : 'rgba(28,26,25,0)',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.span
                className="text-white text-[10px] font-bold tracking-widest uppercase text-center px-2 leading-snug"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                transition={{ duration: 0.3, ease }}
              >
                {categoria.nombre}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Nombre bajo el círculo — se atenúa al hacer hover */}
        <motion.p
          animate={{
            opacity: isHovered ? 0.4 : 1,
            color: isActive ? 'var(--dorado)' : 'var(--carbon)',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-3 text-[10px] md:text-[12px] font-medium tracking-premium max-w-[120px] mx-auto line-clamp-2"
        >
          {categoria.nombre}
        </motion.p>
      </div>
    );
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto md:overflow-x-hidden pb-4 px-2 cursor-grab scrollbar-hide md:scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {categorias.map((categoria) => {
          if (onSelect) {
            return (
              <div key={categoria.id} onClick={() => onSelect(categoria.slug)}>
                {buildContent(categoria)}
              </div>
            );
          }
          return (
            <Link key={categoria.id} href={`/catalogo/${categoria.slug}`}>
              {buildContent(categoria)}
            </Link>
          );
        })}
      </div>

      {/* Arrow izquierda */}
      <motion.button
        onClick={() => scroll('left')}
        animate={{
          opacity: showArrows ? 1 : 0,
          x: showArrows ? 0 : -12,
          pointerEvents: showArrows ? 'auto' : 'none',
        }}
        whileHover={{ scale: 1.08, backgroundColor: 'var(--dorado)', color: '#fff' }}
        transition={{ duration: 0.25, ease }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-carbon"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      {/* Arrow derecha */}
      <motion.button
        onClick={() => scroll('right')}
        animate={{
          opacity: showArrows ? 1 : 0,
          x: showArrows ? 0 : 12,
          pointerEvents: showArrows ? 'auto' : 'none',
        }}
        whileHover={{ scale: 1.08, backgroundColor: 'var(--dorado)', color: '#fff' }}
        transition={{ duration: 0.25, ease }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-carbon"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
