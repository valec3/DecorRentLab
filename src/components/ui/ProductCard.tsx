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

  const hasSecondImage = producto.imagenes.length > 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-4xl overflow-hidden border border-borde/60 shadow-soft hover:shadow-strong transition-all duration-700 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-dorado/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <Link href={`/producto/${producto.slug}`}>
        <div className="relative aspect-4/3 overflow-hidden bg-crema-oscuro/50">
          <Image
            src={producto.imagenes[0]}
            alt={producto.nombre}
            fill
            className={`object-cover border-b border-borde/20 transition-all duration-1000 ease-out ${
              isHovered && hasSecondImage
                ? "opacity-0 scale-110 blur-sm"
                : "opacity-100 scale-100 blur-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hasSecondImage && (
            <Image
              src={producto.imagenes[1]}
              alt={`${producto.nombre} - segunda imagen`}
              fill
              className={`object-cover border-b border-borde/20 transition-all duration-1000 ease-out ${
                isHovered ? "opacity-100 scale-105 blur-0" : "opacity-0 scale-100 blur-sm"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {producto.destacado && (
              <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                 <Badge variant="featured" className="px-2 py-0.5 text-[7px]">Destacado</Badge>
              </motion.div>
            )}
            {!producto.disponible && (
               <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Badge variant="unavailable" className="px-2 py-0.5 text-[7px]">No disponible</Badge>
              </motion.div>
            )}
          </div>

          {/* Price Tag (Floating) */}
          <div className="absolute top-3 right-3 z-10">
            <motion.div 
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass px-3 py-1.5 rounded-lg border border-white/20 shadow-premium-sm"
            >
              <span className="text-carbon font-serif font-light text-sm">
                ${producto.precio?.toLocaleString("es-AR") || "Consultar"}
              </span>
            </motion.div>
          </div>
        </div>
      </Link>

      <div className="p-5 relative z-10">
        <div className="mb-2">
          <span className="text-dorado tracking-premium font-bold text-[8px]">
            {producto.categoriaSlug.replace(/-/g, " ")}
          </span>
        </div>

        <h3 className="font-serif text-xl text-carbon mb-2 group-hover:text-dorado transition-colors duration-500 line-clamp-1 leading-tight">
          {producto.nombre}
        </h3>

        <p className="text-gris-calido text-[12px] font-light mb-6 line-clamp-1 leading-relaxed italic">
          {producto.descripcionCorta}
        </p>

        <div className="flex gap-3">
          <Link href={`/producto/${producto.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Detalles
            </Button>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="primary" size="sm" className="w-full text-xs" magnetic>
              Cotizar
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
