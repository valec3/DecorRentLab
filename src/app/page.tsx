'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Sparkles, MessageSquare } from "lucide-react";
import { categorias, getProductosDestacados } from "@/data/mock";
import { CategoryCarousel } from "@/components/ui/CategoryCarousel";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { Testimonials } from "@/components/ui/Testimonials";
import { FAQ } from "@/components/ui/FAQ";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const productosDestacados = getProductosDestacados();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);


  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale, y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/hero.png"
            alt="Decoración elegante para eventos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-crema/20" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          <ScrollReveal delay={0.2} direction="down" width="100%">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-dark text-dorado font-bold tracking-premium text-[9px] mb-10 border border-white/10 shadow-glow">
              <Sparkles className="w-3 h-3 text-dorado" />
              Alquiler de Decoración Premium
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} width="100%">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1] drop-shadow-2xl">
              Alquiler de <span className="italic font-display text-white/95 text-4xl md:text-6xl lg:text-7xl block mb-2">Decoración</span>
              <span className="text-dorado drop-shadow-glow">Premium para Eventos</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.6} width="100%">
            <p className="text-white text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light tracking-wide drop-shadow-xl text-center">
              Mobiliario exclusivo, ambientación de lujo y piezas curadas para que 
              tu celebración sea inolvidable.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8} width="100%">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg mx-auto">
              <Link href="/catalogo">
                <Button size="lg" className="w-full sm:w-auto px-8 md:px-10 py-5 text-base md:text-lg whitespace-nowrap" magnetic>
                  Explorar Catálogo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/5491112345678?text=Hola%20Decor%20Rent%20Lab,%20quiero%20cotizar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 md:px-10 py-5 text-base md:text-lg whitespace-nowrap glass-dark text-white border-white/20 hover:bg-white/10"
                >
                  <MessageSquare className="mr-2 w-5 h-5" />
                  Hablar con un asesor
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        >
          <div className="w-px h-20 bg-linear-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* Categories Carousel Section */}
      <section className="py-20 bg-crema">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <ScrollReveal direction="right" width="100%">
              <div className="text-center md:text-left">
                <span className="text-dorado text-[10px] tracking-premium font-bold mb-5 block">Colecciones</span>
                <h2 className="font-serif text-4xl md:text-6xl text-carbon leading-tight">
                  Explora por <span className="italic font-display text-carbon/80">Categoría</span>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left">
              <Link href="/catalogo">
                 <Button variant="ghost" className="group">
                    Ver todas las categorías
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </Button>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} width="100%">
            <CategoryCarousel categorias={categorias} />
          </ScrollReveal>
        </div>
      </section>

      {/* How it Works - Refined */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-crema-oscuro/30 skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <ScrollReveal direction="down" width="100%">
              <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-6">
                Tu visión, <span className="italic font-display">nuestra gestión</span>
              </h2>
              <p className="text-gris-calido max-w-xl mx-auto text-lg font-light">
                Un proceso impecable diseñado para que solo te preocupes por disfrutar.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Sparkles className="w-8 h-8 text-dorado" />,
                title: "Selección Curada",
                desc: "Explora elementos seleccionados bajo los más altos estándares de estética premium."
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-dorado" />,
                title: "Asesoría Experta",
                desc: "Coordinamos vía WhatsApp cada detalle para asegurar que la visión de tu evento sea perfecta."
              },
              {
                icon: <Truck className="w-8 h-8 text-dorado" />,
                title: "Logística Sin Estrés",
                desc: "Nos encargamos de la entrega y el montaje con precisión y cuidado artesanal."
              }
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="group p-10 bg-white border border-borde rounded-[2.5rem] hover:shadow-strong transition-all duration-500 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-0 bg-dorado group-hover:h-full transition-all duration-500" />
                  <div className="mb-6 inline-flex p-5 rounded-3xl bg-crema group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-carbon mb-4">{step.title}</h3>
                  <p className="text-gris-calido leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with ScrollReveal */}
      <section className="py-20 bg-crema-oscuro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <ScrollReveal direction="right" width="100%">
              <div className="text-center md:text-left">
                <span className="text-dorado text-[10px] tracking-premium font-bold mb-5 block">Exclusivos</span>
                <h2 className="font-serif text-4xl md:text-6xl text-carbon leading-tight">
                  Piezas <span className="italic font-display text-carbon/80">Destacadas</span>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left">
               <Link href="/catalogo">
                  <Button variant="secondary" className="rounded-full">
                    Ver catálogo completo
                  </Button>
               </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productosDestacados.slice(0, 4).map((producto, index) => (
              <ScrollReveal key={producto.id} delay={index * 0.1}>
                <ProductCard producto={producto} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right" distance={50} height="100%" width="100%">
              <div className="relative group h-full">
                <div className="absolute -inset-4 bg-dorado/5 rounded-4xl blur-2xl group-hover:bg-dorado/10 transition-colors duration-700" />
                <div className="relative aspect-square rounded-4xl overflow-hidden shadow-strong border border-borde">
                  <Image
                    src="/filosofia.png"
                    alt="Nuestra Filosofía - Decoración elegante"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Stats overlays */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl border border-white/20 hidden md:block shadow-glow"
                >
                  <span className="block text-4xl font-serif text-dorado mb-1">500+</span>
                  <span className="text-xs uppercase tracking-widest text-carbon/60">Eventos Exitosos</span>
                </motion.div>
              </div>
            </ScrollReveal>

              <div className="space-y-8">
                <ScrollReveal direction="left">
                  <span className="text-dorado text-[10px] tracking-premium font-bold mb-5 block">Nuestra Filosofía</span>
                  <h2 className="font-serif text-4xl md:text-6xl text-carbon leading-[1.1] mt-6">
                    Creamos atmósferas que <span className="italic font-display">cuentan historias</span>
                  </h2>
                <p className="text-xl text-gris-calido font-light leading-relaxed mt-8">
                  En Decor Rent Lab, no solo alquilamos objetos; proporcionamos los elementos necesarios para 
                  materializar tus sueños más sofisticados.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Curaduría", desc: "Objetos seleccionados por su valor estético y calidad." },
                  { title: "Excelencia", desc: "Compromiso total con la puntualidad y el detalle." },
                  { title: "Pasión", desc: "Amamos el diseño y se nota en cada montaje." },
                  { title: "Personalización", desc: "Buscamos la pieza exacta que tu evento requiere." }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.15}>
                    <div className="space-y-2">
                       <h4 className="font-serif text-xl text-carbon flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-dorado" />
                         {item.title}
                       </h4>
                       <p className="text-sm text-gris-calido leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.6}>
                <Link href="/nosotros">
                  <Button variant="outline" size="lg" className="rounded-full px-8" magnetic>
                    Descubrí nuestra historia
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Refined */}
      <section className="py-20 bg-crema relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ScrollReveal direction="down" width="100%">
               <span className="text-dorado text-xs uppercase tracking-[0.3em] font-bold block mb-4">Experiencias</span>
               <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-2">
                 La voz de la <span className="italic font-display">elegancia</span>
               </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.3} width="100%">
            <Testimonials />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ - Minimalist */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down" width="100%">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl text-carbon mb-6">Preguntas <span className="italic font-display">Clave</span></h2>
              <p className="text-gris-calido">Todo lo que necesitás saber antes de empezar el viaje con nosotros.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} width="100%">
            <FAQ />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section - Dramatic */}
      <section className="py-24 px-4">
        <ScrollReveal width="100%">
          <div className="max-w-7xl mx-auto bg-carbon rounded-[4rem] relative overflow-hidden py-24 px-8 text-center shadow-strong">
            {/* Abstract Background patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 border border-white rounded-full translate-x-1/2 translate-y-1/2" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <ScrollReveal direction="down">
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-10 leading-[1.2]">
                  ¿Hacemos realidad tu <br />
                  <span className="text-dorado italic font-display">próximo gran evento</span>?
                </h2>
                <p className="text-white/60 text-lg md:text-xl mb-12 font-light">
                  No dejes tu visión al azar. Consultá disponibilidad y obtené una 
                  cotización personalizada hoy mismo.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a
                    href="https://wa.me/5491112345678?text=Hola%20Decor%20Rent%20Lab,%20quiero%20cotizar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="primary" size="lg" className="w-full sm:w-auto px-12" magnetic>
                      Contactar por WhatsApp
                    </Button>
                  </a>
                  <Link href="/contacto" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 border-white/20 text-white hover:bg-white/10">
                      Formulario de contacto
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
