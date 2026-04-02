'use client';

import { useState, useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, ZoomIn, MessageCircle } from 'lucide-react';
import { getProductoBySlug, getCategoriaBySlug, getProductosByCategoria } from '@/data/mock';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { Lightbox } from '@/components/ui/Lightbox';
import { VariantSelector } from '@/components/ui/VariantSelector';

export default function ProductoPage() {
  const params = useParams();
  const slug = params.slug as string;
  const producto = useMemo(() => getProductoBySlug(slug), [slug]);

  if (!producto) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const categoria = getCategoriaBySlug(producto.categoriaSlug);
  const relacionados = getProductosByCategoria(producto.categoriaSlug)
    .filter((p) => p.id !== producto.id)
    .slice(0, 4);

  const hasVariants = producto.variantes && producto.variantes.length > 0;

  const precioTotal = useMemo(() => {
    let total = (producto.precio || 0) * cantidad;
    if (hasVariants && producto.variantes) {
      Object.entries(selectedVariants).forEach(([tipo, valor]) => {
        const variante = (producto.variantes || []).find(v => v.tipo === tipo && v.valor === valor);
        if (variante?.precioAdicional) {
          total += variante.precioAdicional * cantidad;
        }
      });
    }
    return total;
  }, [producto.precio, cantidad, selectedVariants, hasVariants, producto.variantes]);

  const buildWhatsappMessage = () => {
    let message = `Hola Decor Rent Lab, me interesa cotizar:\n\n`;
    message += `📦 *${producto.nombre}*\n`;
    message += `💰 Precio base: $${producto.precio?.toLocaleString('es-AR')}/evento\n`;
    
    if (hasVariants && Object.keys(selectedVariants).length > 0) {
      message += `\n✨ Opciones seleccionadas:\n`;
      Object.entries(selectedVariants).forEach(([tipo, valor]) => {
        message += `- ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: ${valor}\n`;
      });
    }
    
    message += `\n📅 Cantidad: ${cantidad} unidad${cantidad > 1 ? 'es' : ''}`;
    
    if (precioTotal > 0 && hasVariants) {
      message += `\n💵 Total estimado: $${precioTotal.toLocaleString('es-AR')}`;
    }
    
    message += `\n\nPor favor confirmen disponibilidad. ¡Gracias!`;
    
    return message;
  };

  const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(buildWhatsappMessage())}`;


  return (
    <div className="min-h-screen bg-crema">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gris-calido mb-8">
          <Link href="/catalogo" className="hover:text-dorado transition-colors">Catálogo</Link>
          <span className="text-gris-calido/50">/</span>
          <Link href={`/catalogo/${producto.categoriaSlug}`} className="hover:text-dorado transition-colors">{categoria?.nombre}</Link>
          <span className="text-gris-calido/50">/</span>
          <span className="text-carbon">{producto.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
          <div className="lg:col-span-1">
            <div className="flex gap-4">
              <div 
                className="flex-1 aspect-3/4 relative overflow-hidden rounded-sm bg-crema-oscuro cursor-zoom-in group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={producto.imagenes[selectedImage]}
                  alt={producto.nombre}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3">
                  {producto.destacado && (
                    <span className="inline-block px-3 py-1 bg-dorado/90 text-white text-xs uppercase tracking-widest rounded-sm">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <ZoomIn className="w-5 h-5 text-carbon" />
                </div>
              </div>

              {producto.imagenes.length > 1 && (
                <div className="hidden lg:flex flex-col gap-2 w-20">
                  {producto.imagenes.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-full aspect-square rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-dorado shadow-md' 
                          : 'border-transparent hover:border-borde'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${producto.nombre} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {producto.imagenes.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 lg:hidden">
                {producto.imagenes.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-dorado' 
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${producto.nombre} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1 flex flex-col pt-10 lg:pt-0">
            <div className="sticky top-32">
              <div className="mb-2 inline-block px-3 py-1 bg-dorado/10 text-dorado text-xs uppercase tracking-widest rounded-sm">
                {categoria?.nombre}
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl text-carbon mb-4 leading-tight">
                {producto.nombre}
              </h1>
              
              <p className="text-2xl text-dorado font-medium mb-12">
                ${precioTotal > 0 ? precioTotal.toLocaleString('es-AR') : 'Consultar'}
                <span className="text-gris-calido text-base font-normal"> / evento</span>
              </p>

              <div className="space-y-10">
                {hasVariants && (
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-gris-calido">Selecciona opciones</span>
                    <VariantSelector 
                      variantes={producto.variantes || []} 
                      onSelectionChange={setSelectedVariants}
                    />
                  </div>
                )}

                <div className="flex gap-4 items-end">
                  <div className="space-y-4 flex-1">
                    <span className="text-xs uppercase tracking-widest text-gris-calido">Cantidad</span>
                    <div className="flex items-center bg-white border border-borde rounded-md w-fit overflow-hidden h-14">
                      <button
                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                        className="px-4 hover:bg-crema-oscuro text-carbon transition-colors h-full flex items-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 font-medium text-carbon">{cantidad}</span>
                      <button
                        onClick={() => setCantidad(cantidad + 1)}
                        className="px-4 hover:bg-crema-oscuro text-carbon transition-colors h-full flex items-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full py-5 bg-dorado hover:bg-dorado/80 text-white rounded-md flex flex-col items-center justify-center transition-all shadow-sm active:scale-95">
                      <span className="flex items-center font-bold text-lg">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Cotizar por WhatsApp
                      </span>
                      <span className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Respondemos en menos de 2 horas</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-borde max-w-4xl mx-auto">
          <h3 className="font-serif text-3xl md:text-4xl text-carbon mb-8 italic">
            {producto.descripcionCorta}
          </h3>
          <div className="space-y-1">
            <div 
              className="prose-premium max-w-none" 
              dangerouslySetInnerHTML={{ __html: producto.descripcionLarga }} 
            />
          </div>
        </div>


        {relacionados.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-3xl text-carbon mb-10 text-center">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relacionados.map((prod) => (
                <ProductCard key={prod.id} producto={prod} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Lightbox
        images={producto.imagenes}
        title={producto.nombre}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        initialIndex={selectedImage}
      />
    </div>
  );
}
