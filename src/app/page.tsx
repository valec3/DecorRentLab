'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Sparkles, MessageSquare, Loader2 } from "lucide-react";
import { Producto, Categoria } from "@/types";
import { CategoryCarousel } from "@/components/ui/CategoryCarousel";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { Testimonials } from "@/components/ui/Testimonials";
import { FAQ } from "@/components/ui/FAQ";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { homeContent } from "@/data/content";

export default function Home() {
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const targetRef = useRef(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDestacados, resCats] = await Promise.all([
          fetch('/api/products?destacado=true&perPage=4'),
          fetch('/api/categories')
        ]);
        
        const [destacados, cats] = await Promise.all([
          resDestacados.json(),
          resCats.json()
        ]);

        if (destacados.data) setProductosDestacados(destacados.data);
        if (Array.isArray(cats)) setCategorias(cats);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
            src={homeContent.hero.backgroundImage}
            alt={homeContent.hero.title}
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
              {homeContent.hero.title} <span className="italic font-display text-white/95 text-4xl md:text-6xl lg:text-7xl block mb-2">{homeContent.hero.subtitle}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.6} width="100%">
            <p className="text-white text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light tracking-wide drop-shadow-xl text-center">
              {homeContent.hero.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8} width="100%">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg mx-auto">
              <Link href="/catalogo">
                <Button size="lg" className="w-full sm:w-auto px-8 md:px-10 py-5 text-base md:text-lg whitespace-nowrap" magnetic>
                  {homeContent.hero.primaryButtonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href={`https://wa.me/5491112345678?text=${encodeURIComponent(homeContent.hero.whatsappMessage)}`}
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
                {homeContent.howItWorks.title.split(', ').map((text, i) => (
                  <span key={i} className={i === 1 ? "italic font-display" : ""}>
                    {text}{i === 0 ? ", " : ""}
                  </span>
                ))}
              </h2>
              <p className="text-gris-calido max-w-xl mx-auto text-lg font-light">
                {homeContent.howItWorks.description}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {homeContent.howItWorks.steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="group p-10 bg-white border border-borde rounded-[2.5rem] hover:shadow-strong transition-all duration-500 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-0 bg-dorado group-hover:h-full transition-all duration-500" />
                  <div className="mb-6 inline-flex p-5 rounded-3xl bg-crema group-hover:scale-110 transition-transform duration-500">
                    {i === 0 ? <Sparkles className="w-8 h-8 text-dorado" /> : i === 1 ? <MessageSquare className="w-8 h-8 text-dorado" /> : <Truck className="w-8 h-8 text-dorado" />}
                  </div>
                  <h3 className="font-serif text-2xl text-carbon mb-4">{step.title}</h3>
                  <p className="text-gris-calido leading-relaxed">{step.description}</p>
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
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-gris-calido">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-dorado" />
                <p className="text-xs uppercase tracking-widest font-light">Cargando piezas exclusivas...</p>
              </div>
            ) : productosDestacados.map((producto, index) => (
              <ScrollReveal key={producto.id} delay={index * 0.1} direction="up">
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
                    src={homeContent.philosophy.image}
                    alt={homeContent.philosophy.title}
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
                  <span className="block text-4xl font-serif text-dorado mb-1">{homeContent.philosophy.stats.value}</span>
                  <span className="text-xs uppercase tracking-widest text-carbon/60">{homeContent.philosophy.stats.label}</span>
                </motion.div>
              </div>
            </ScrollReveal>

              <div className="space-y-8">
                <ScrollReveal direction="left">
                  <span className="text-dorado text-[10px] tracking-premium font-bold mb-5 block">Nuestra Filosofía</span>
                  <h2 className="font-serif text-4xl md:text-6xl text-carbon leading-[1.1] mt-6">
                    {homeContent.philosophy.title.split(' que ').map((text, i) => (
                      <span key={i}>
                        {i === 1 && "que "}<span className={i === 1 ? "italic font-display" : ""}>{text}</span>
                      </span>
                    ))}
                  </h2>
                <p className="text-xl text-gris-calido font-light leading-relaxed mt-8">
                  {homeContent.philosophy.description}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {homeContent.philosophy.items.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.15}>
                    <div className="space-y-2">
                       <h4 className="font-serif text-xl text-carbon flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-dorado" />
                         {item.title}
                       </h4>
                       <p className="text-sm text-gris-calido leading-relaxed">{item.description}</p>
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
                  {homeContent.cta.title.split(' tu ').map((text, i) => (
                    <span key={i}>
                      {i === 1 && "tu "}<span className={i === 1 ? "text-dorado italic font-display" : ""}>{text}</span>
                      {i === 0 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="text-white/60 text-lg md:text-xl mb-12 font-light">
                  {homeContent.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a
                    href={`https://wa.me/5491112345678?text=${encodeURIComponent(homeContent.cta.whatsappMessage)}`}
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
