'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    event: 'Boda',
    text: 'Increíble experiencia con Decor Rent Lab. La decoración del corazón de flores fue el centro de atención de nuestra boda. Todo perfección.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: 2,
    name: 'Carolina Sánchez',
    event: 'Quinceañera',
    text: 'El mejor descubrimiento para la decoración del evento de mi hija. Las letras LED Infinity fueron un éxito total. Recomendadísimo.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: 3,
    name: 'Roberto Díaz',
    event: 'Evento Corporativo',
    text: 'Profesionalismo absoluto. El equipo entendió perfectamente lo que necesitábamos y el resultado superó expectativas.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: 4,
    name: 'Ana Martínez',
    event: 'Baby Shower',
    text: 'Las esferas gigantes fueron mágicas. Todos los invitados quedaron impresionados. Volveré a contratar sin dudas.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    rating: 5
  }
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const newIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(testimonials.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="flex-shrink-0 w-[350px] md:w-[400px]"
          >
            <div className="bg-white rounded-3xl p-8 border border-borde shadow-soft hover:shadow-medium transition-all duration-500 h-full">
              <Quote className="w-10 h-10 text-dorado/30 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-dorado" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gris-calido leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-borde">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-carbon">{testimonial.name}</p>
                  <p className="text-xs text-dorado uppercase tracking-wider">{testimonial.event}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-dorado hover:text-white transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-dorado hover:text-white transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
