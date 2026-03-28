'use client';

import { useState, useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, ZoomIn, Check, Layers, Weight, Settings, BadgeCheck, MessageCircle, Heart, Construction, Hand } from 'lucide-react';
import { getProductoBySlug, getCategoriaBySlug, getProductosByCategoria } from '@/data/mock';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { Lightbox } from '@/components/ui/Lightbox';
import { VariantSelector } from '@/components/ui/VariantSelector';

export default function ProductoPage() {
  const params = useParams();
  const slug = params.slug as string;
  const producto = getProductoBySlug(slug);

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
        const variante = producto.variantes?.find(v => v.tipo === tipo && v.valor === valor);
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

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) {
        return <h2 key={i} className="font-serif text-xl text-carbon mb-3 mt-4">{line.slice(2)}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={i} className="font-medium text-carbon mb-2 mt-3">{line.slice(3)}</h3>;
      }
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
        if (match) {
          return (
            <div key={i} className="flex gap-2 mb-1">
              <span className="text-dorado mt-1">•</span>
              <span><strong className="text-carbon">{match[1]}:</strong> {match[2]}</span>
            </div>
          );
        }
      }
      if (line.startsWith('- ')) {
        return (
          <div key={i} className="flex gap-2 mb-1 ml-2">
            <span className="text-dorado/50 mt-1">•</span>
            <span>{line.slice(2)}</span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }
      return <p key={i} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-crema">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gris-calido mb-8">
          <a href="/catalogo" className="hover:text-dorado transition-colors">Catálogo</a>
          <span className="text-gris-calido/50">/</span>
          <a href={`/catalogo/${producto.categoriaSlug}`} className="hover:text-dorado transition-colors">{categoria?.nombre}</a>
          <span className="text-gris-calido/50">/</span>
          <span className="text-carbon">{producto.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          <div className="lg:col-span-7">
            <div className="flex gap-4">
              <div 
                className="flex-1 aspect-[3/4] relative overflow-hidden rounded-sm bg-crema-oscuro cursor-zoom-in group"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
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

          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-32">
              <div className="mb-2 inline-block px-3 py-1 bg-dorado/10 text-dorado text-xs uppercase tracking-widest rounded-sm">
                {categoria?.nombre}
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl text-carbon mb-4 leading-tight">
                {producto.nombre}
              </h1>
              
              <p className="text-2xl text-dorado font-medium mb-8">
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

        <div className="mt-32 space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif text-carbon leading-snug italic">
                {producto.descripcionCorta}
              </h2>
              <p className="text-gris-calido leading-relaxed text-lg">
                {producto.descripcionLarga.split('\n')[0]}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-dorado mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-carbon">Alta calidad y acabados premium</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-dorado mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-carbon">Perfecto para eventos y celebraciones</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-dorado mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-carbon">Incluye montaje y desmontaje</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-sm border border-borde/30">
                <Layers className="w-6 h-6 text-dorado mb-4" />
                <div className="text-xs uppercase tracking-widest text-gris-calido mb-1">Material</div>
                <div className="font-serif font-bold text-carbon text-lg">{producto.material}</div>
              </div>
              <div className="bg-white p-8 rounded-sm border border-borde/30">
                <Weight className="w-6 h-6 text-dorado mb-4" />
                <div className="text-xs uppercase tracking-widest text-gris-calido mb-1">Peso</div>
                <div className="font-serif font-bold text-carbon text-lg">{producto.peso || 'N/A'}</div>
              </div>
              <div className="bg-white p-8 rounded-sm border border-borde/30">
                <Settings className="w-6 h-6 text-dorado mb-4" />
                <div className="text-xs uppercase tracking-widest text-gris-calido mb-1">Montaje</div>
                <div className="font-serif font-bold text-carbon text-lg">{producto.tiempoMontaje}</div>
              </div>
              <div className="bg-white p-8 rounded-sm border border-borde/30">
                <BadgeCheck className="w-6 h-6 text-dorado mb-4" />
                <div className="text-xs uppercase tracking-widest text-gris-calido mb-1">Garantía</div>
                <div className="font-serif font-bold text-carbon text-lg">{producto.garantia}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-sm border-l-4 border-dorado grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-2xl mb-4 text-carbon">Usos recomendados</h3>
              <p className="text-gris-calido text-sm mb-6">Versátil y elegante para eventos de alta gama.</p>
              <div className="flex flex-wrap gap-2">
                {producto.idealPara.map((uso) => (
                  <span key={uso} className="bg-crema px-3 py-1 rounded-full text-xs text-carbon border border-borde/30">{uso}</span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl mb-4 text-carbon">El alquiler incluye</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-dorado/10 rounded-full flex items-center justify-center">
                    <Construction className="w-5 h-5 text-dorado" />
                  </div>
                  <span className="text-carbon text-sm">Estructura auto-sostenible</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-dorado/10 rounded-full flex items-center justify-center">
                    <Hand className="w-5 h-5 text-dorado" />
                  </div>
                  <span className="text-carbon text-sm">Instalación profesional</span>
                </div>
              </div>
            </div>
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
