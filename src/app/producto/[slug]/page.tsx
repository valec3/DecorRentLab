'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Minus, 
  Plus, 
  ZoomIn, 
  MessageCircle, 
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Producto } from '@/types';
import Link from 'next/link';
import { ProductCard } from '@/components/custom/ProductCard';
import { Lightbox } from '@/components/custom/Lightbox';
import { VariantSelector } from '@/components/custom/VariantSelector';
import { Button } from '@/components/custom/Button';

export default function ProductoPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Estados de carga y datos
  const [producto, setProducto] = useState<Producto | null>(null);
  const [relacionados, setRelacionados] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Estados de UI (Interacción)
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [mode, setMode] = useState<'alquiler' | 'venta'>('alquiler');
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  // Carga de datos
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Not found');
        
        const data = await res.json();
        setProducto(data);
        setMode(data.precioAlquiler ? 'alquiler' : 'venta');
        
        // Cargar relacionados
        const resRel = await fetch(`/api/products?categoria=${data.categoriaSlug}&perPage=5`);
        const relData = await resRel.json();
        if (relData.data) {
          setRelacionados(relData.data.filter((p: Producto) => p.id !== data.id).slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [slug]);

  // Cálculo de precio total (SIEMPRE se llama, pero depende de producto)
  const precioBase = mode === 'alquiler' ? producto?.precioAlquiler : producto?.precioVenta;
  
  const precioTotal = useMemo(() => {
    if (!producto) return 0;
    let total = (precioBase || 0) * cantidad;
    
    if (producto.variantes && producto.variantes.length > 0) {
      Object.entries(selectedVariants).forEach(([tipo, valor]) => {
        const variante = producto.variantes?.find(v => v.tipo === tipo && v.valor === valor);
        if (variante?.precioAdicional) {
          total += variante.precioAdicional * cantidad;
        }
      });
    }
    return total;
  }, [producto, precioBase, cantidad, selectedVariants]);

  // Mensaje de WhatsApp
  const whatsappUrl = useMemo(() => {
    if (!producto) return '';
    let message = `Hola Decor Rent Lab, me interesa cotizar:\n\n`;
    message += `📦 *${producto.nombre}*\n`;
    message += `🏷️ Modo: *${mode === 'alquiler' ? 'Alquiler' : 'Compra/Venta'}*\n`;
    message += `💰 Precio base: $${precioBase?.toLocaleString('es-AR')}${mode === 'alquiler' ? '/evento' : ''}\n`;
    
    if (Object.keys(selectedVariants).length > 0) {
      message += `\n✨ Opciones seleccionadas:\n`;
      Object.entries(selectedVariants).forEach(([tipo, valor]) => {
        message += `- ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: ${valor}\n`;
      });
    }
    
    message += `\n📅 Cantidad: ${cantidad} unidad${cantidad > 1 ? 'es' : ''}`;
    
    if (precioTotal > 0 && (producto.variantes?.length || 0) > 0) {
      message += `\n💵 Total estimado: $${precioTotal.toLocaleString('es-AR')}`;
    }
    
    message += `\n\nPor favor confirmen disponibilidad y detalles. ¡Gracias!`;
    return `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`;
  }, [producto, mode, precioBase, selectedVariants, cantidad, precioTotal]);

  // Estados de Carga / Error
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-gris-calido bg-crema">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-dorado" />
        <p className="font-light tracking-widest text-sm uppercase">Cargando detalles de la pieza...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="pt-32 pb-16 text-center bg-crema min-h-screen px-4">
        <h1 className="text-4xl font-serif text-carbon mb-4">Pieza no encontrada</h1>
        <p className="text-gris-calido mb-8">Lo sentimos, no pudimos encontrar el producto que buscas o hubo un problema de conexión.</p>
        <Button variant="primary" onClick={() => router.push('/catalogo')}>
          Ir al catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gris-calido mb-8">
          <Link href="/catalogo" className="hover:text-dorado transition-colors">Catálogo</Link>
          <span className="text-gris-calido/50">/</span>
          <Link href={`/catalogo?categoria=${producto.categoriaSlug}`} className="hover:text-dorado transition-colors">{producto.categoriaSlug}</Link>
          <span className="text-gris-calido/50">/</span>
          <span className="text-carbon">{producto.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
          {/* Imágenes */}
          <div className="lg:col-span-1">
            <div className="flex gap-4">
              <div 
                className="flex-1 aspect-3/4 relative overflow-hidden rounded-sm bg-crema-oscuro cursor-zoom-in group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={producto.imagenes[selectedImage] || ''}
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

          {/* Detalles */}
          <div className="lg:col-span-1 flex flex-col pt-10 lg:pt-0">
            <div className="sticky top-32">
              <div className="mb-2 inline-block px-3 py-1 bg-dorado/10 text-dorado text-xs uppercase tracking-widest rounded-sm">
                {producto.categoriaSlug}
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl text-carbon mb-4 leading-tight">
                {producto.nombre}
              </h1>
              
              {/* Selectores de Modo y Promociones */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-4">
                  {producto.precioAlquiler && (
                    <button 
                      onClick={() => setMode('alquiler')}
                      className={`flex-1 p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden ${mode === 'alquiler' ? 'border-dorado bg-dorado/5 shadow-premium-sm' : 'border-borde bg-white hover:border-dorado/30'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-gris-calido">Alquiler</span>
                        {producto.promocion?.precioOriginalAlquiler && (
                          <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                            -{Math.round((1 - producto.precioAlquiler / producto.promocion.precioOriginalAlquiler) * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-serif text-carbon">${producto.precioAlquiler.toLocaleString('es-AR')}</span>
                        {producto.promocion?.precioOriginalAlquiler && (
                          <span className="text-xs text-gris-calido line-through opacity-60">
                            ${producto.promocion.precioOriginalAlquiler.toLocaleString('es-AR')}
                          </span>
                        )}
                      </div>
                    </button>
                  )}
                  {producto.precioVenta && (
                    <button 
                      onClick={() => setMode('venta')}
                      className={`flex-1 p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden ${mode === 'venta' ? 'border-dorado bg-dorado/5 shadow-premium-sm' : 'border-borde bg-white hover:border-dorado/30'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-gris-calido">Compra</span>
                        {producto.promocion?.precioOriginalVenta && (
                          <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                            -{Math.round((1 - producto.precioVenta / producto.promocion.precioOriginalVenta) * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-serif text-carbon">${producto.precioVenta.toLocaleString('es-AR')}</span>
                        {producto.promocion?.precioOriginalVenta && (
                          <span className="text-xs text-gris-calido line-through opacity-60">
                            ${producto.promocion.precioOriginalVenta.toLocaleString('es-AR')}
                          </span>
                        )}
                      </div>
                    </button>
                  )}
                </div>

                {/* Banner de Oferta Detallado */}
                {(() => {
                  const pOriginal = mode === 'alquiler' 
                    ? producto.promocion?.precioOriginalAlquiler 
                    : producto.promocion?.precioOriginalVenta;
                  
                  if (!pOriginal || !precioBase) return null;

                  return (
                    <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold block mb-1">
                          {producto.promocion?.etiqueta || 'Precio Especial'}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-gris-calido line-through text-sm">
                            ${pOriginal.toLocaleString('es-AR')}
                          </span>
                          <span className="text-red-600 font-bold text-lg">
                            -${Math.round((1 - precioBase / pOriginal) * 100)}% OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Opciones y Cantidad */}
              <div className="space-y-10">
                {producto.variantes && producto.variantes.length > 0 && (
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-gris-calido">Selecciona opciones</span>
                    <VariantSelector 
                      variantes={producto.variantes} 
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

                {/* Total y CTA */}
                <div className="pt-6 border-t border-borde">
                  <div className="flex items-end justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-gris-calido mb-1">Total Estimado</span>
                      <span className="text-sm text-gris-calido italic">
                        {cantidad} x {mode === 'alquiler' ? 'Alquiler' : 'Venta'}
                      </span>
                    </div>
                    <div className="text-right">
                      <motion.span 
                        key={precioTotal}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-serif text-carbon block"
                      >
                        ${precioTotal.toLocaleString('es-AR')}
                      </motion.span>
                    </div>
                  </div>

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full py-5 bg-dorado hover:bg-dorado/80 text-white rounded-xl shadow-premium hover:shadow-glow transition-all active:scale-[0.98] flex flex-col items-center justify-center">
                      <span className="flex items-center font-bold text-lg">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Solicitar Presupuesto
                      </span>
                      <span className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Respuesta inmediata vía WhatsApp</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-24 pt-16 border-t border-borde max-w-4xl mx-auto">
          <h3 className="font-serif text-3xl md:text-4xl text-carbon mb-8 italic">
            {producto.descripcionCorta}
          </h3>
          <div className="prose-premium max-w-none text-gris-calido" dangerouslySetInnerHTML={{ __html: producto.descripcionLarga }} />
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-3xl text-carbon mb-10 text-center">También te puede gustar</h2>
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
