"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Producto } from "@/types";
import { Badge } from "./Badge";
import { motion } from "framer-motion";
import { Button } from "./Button";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappMessage = `Hola Decor Rent Lab, quiero cotizar: ${producto.nombre}`;
  const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`;

  const fallbackImage = "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&auto=format&fit=crop";
  const mainImage = producto.imagenes?.[0] || fallbackImage;
  const hasSecondImage = producto.imagenes?.length > 1 && producto.imagenes[1];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden border border-borde/40 shadow-sm hover:shadow-strong transition-all duration-500 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/producto/${producto.slug}`}>
        <div className="relative aspect-4/5 overflow-hidden bg-crema-oscuro/30">
          <Image
            src={mainImage}
            alt={producto.nombre}
            fill
            className={`object-cover transition-all duration-1000 ease-out ${
              isHovered && hasSecondImage
                ? "opacity-0 scale-110 blur-sm"
                : "opacity-100 scale-100 blur-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hasSecondImage && (
            <Image
              src={producto.imagenes[1]}
              alt={`${producto.nombre} - vista secundaria`}
              fill
              className={`object-cover transition-all duration-1000 ease-out ${
                isHovered ? "opacity-100 scale-105 blur-0" : "opacity-0 scale-100 blur-sm"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Badges Minimalistas */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
            {producto.destacado && (
              <Badge variant="featured" className="opacity-90">Destacado</Badge>
            )}
            {!producto.disponible && (
              <Badge variant="unavailable">Agotado</Badge>
            )}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-dorado-oscuro/60 uppercase tracking-[0.2em] font-bold text-[8px]">
            {producto.categoriaSlug.replace(/-/g, " ")}
          </span>
          {producto.precioAlquiler && (
            <span className="font-serif text-dorado-oscuro font-medium text-sm">
              ${producto.precioAlquiler.toLocaleString("es-AR")}
            </span>
          )}
        </div>

        <Link href={`/producto/${producto.slug}`}>
          <h3 className="font-serif text-lg text-carbon mb-1 group-hover:text-dorado transition-colors duration-300 line-clamp-1 leading-tight">
            {producto.nombre}
          </h3>
        </Link>
        
        <p className="text-gris-calido/70 text-[11px] font-light mb-6 line-clamp-1 leading-relaxed">
          {producto.descripcionCorta}
        </p>

        <div className="flex gap-2">
          <Link href={`/producto/${producto.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-[10px] h-9 border-borde/40 text-carbon/60 hover:text-dorado">
              Detalles
            </Button>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="primary" size="sm" className="w-full text-[10px] h-9" magnetic>
              Cotizar
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
