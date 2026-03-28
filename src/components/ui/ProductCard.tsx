"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Producto } from "@/types";
import { Badge } from "./Badge";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappMessage = `Hola Decor Rent Lab, quiero cotizar: ${producto.nombre}`;
  const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`;

  const hasSecondImage = producto.imagenes.length > 1;

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden border border-borde shadow-soft hover:shadow-strong transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/producto/${producto.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-crema-oscuro">
          <Image
            src={producto.imagenes[0]}
            alt={producto.nombre}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered && hasSecondImage
                ? "opacity-0 scale-110"
                : "opacity-100 scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hasSecondImage && (
            <Image
              src={producto.imagenes[1]}
              alt={`${producto.nombre} - segunda imagen`}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {producto.destacado && <Badge variant="featured">Destacado</Badge>}
            {!producto.disponible && (
              <Badge variant="unavailable">No disponible</Badge>
            )}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <ArrowRight className="w-6 h-6 text-dorado" />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-2">
          <p className="text-xs text-dorado uppercase tracking-[0.15em] font-medium">
            {producto.categoriaSlug.replace(/-/g, " ")}
          </p>
        </div>

        <h3 className="font-serif text-lg text-carbon mb-2 group-hover:text-dorado transition-colors duration-300 line-clamp-1">
          {producto.nombre}
        </h3>

        <p className="text-gris-calido text-sm mb-4 line-clamp-2 leading-relaxed">
          {producto.descripcionCorta}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gris-calido uppercase tracking-wider">
              Precio de alquiler
            </span>
            <span className="text-xl font-serif text-carbon">
              ${producto.precio?.toLocaleString("es-AR") || "Consultar"}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/producto/${producto.slug}`}
            className="flex-1 text-center py-2.5 px-4 text-sm border border-borde rounded-full text-carbon hover:bg-crema-oscuro hover:border-dorado hover:text-dorado transition-all duration-300"
          >
            Ver detalles
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 px-4 text-sm bg-dorado text-white rounded-full hover:bg-dorado-oscuro shadow-md hover:shadow-lg transition-all duration-300"
          >
            Cotizar
          </a>
        </div>
      </div>
    </div>
  );
}
