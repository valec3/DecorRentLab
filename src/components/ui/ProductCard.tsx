"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
      className="group bg-white rounded-4xl overflow-hidden border border-borde shadow-soft hover:shadow-strong transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/producto/${producto.slug}`}>
        <div className="relative aspect-4/5 overflow-hidden bg-crema-oscuro">
          <Image
            src={producto.imagenes[0]}
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
              alt={`${producto.nombre} - segunda imagen`}
              fill
              className={`object-cover transition-all duration-1000 ease-out ${
                isHovered ? "opacity-100 scale-105 blur-0" : "opacity-0 scale-100 blur-sm"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-carbon/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {producto.destacado && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                 <Badge variant="featured">Destacado</Badge>
              </motion.div>
            )}
            {!producto.disponible && (
               <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Badge variant="unavailable">No disponible</Badge>
              </motion.div>
            )}
          </div>

          {/* Action Button Reveal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-16 glass-light rounded-full flex items-center justify-center shadow-glow border border-white/40"
            >
              <ArrowRight className="w-7 h-7 text-carbon" />
            </motion.div>
          </div>

          {/* Price Tag (Floating) */}
          <div className="absolute bottom-4 right-4 z-10">
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass px-4 py-2 rounded-2xl border border-white/20 shadow-medium"
            >
              <span className="text-carbon font-serif font-medium">
                ${producto.precio?.toLocaleString("es-AR") || "Consultar"}
              </span>
            </motion.div>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3">
          <span className="text-[10px] text-dorado uppercase tracking-[0.25em] font-bold">
            {producto.categoriaSlug.replace(/-/g, " ")}
          </span>
        </div>

        <h3 className="font-serif text-xl text-carbon mb-2 group-hover:text-dorado transition-colors duration-500 line-clamp-1">
          {producto.nombre}
        </h3>

        <p className="text-gris-calido text-sm mb-6 line-clamp-2 leading-relaxed h-10">
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
