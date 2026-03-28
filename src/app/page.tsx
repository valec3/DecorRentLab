import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categorias, getProductosDestacados } from "@/data/mock";
import { CategoryCarousel } from "@/components/ui/CategoryCarousel";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { Testimonials } from "@/components/ui/Testimonials";
import { FAQ } from "@/components/ui/FAQ";

export default function Home() {
  const productosDestacados = getProductosDestacados();

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 ">
          <Image
            src="/hero.png"
            alt="Decoración elegante para eventos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-dorado font-bold tracking-wider uppercase text-sm mb-4 animate-fade-in">
              Alquiler de Decoración Premium
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 animate-fade-in animation-delay-100">
              Transforma tu evento en una{" "}
              <span className="text-dorado">experiencia única</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 animate-fade-in animation-delay-200">
              Elegancia y estilo para bodas, quinceañeras y eventos
              corporativos. Descubrí nuestra colección de decoración premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-300">
              <Link href="/catalogo">
                <Button size="lg" className="w-full sm:w-auto">
                  Ver Catálogo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/5491112345678?text=Hola%20Decor%20Rent%20Lab,%20quiero%20cotizar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Cotizar por WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="py-16 bg-crema-oscuro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl text-carbon mb-3">
              Explora por Categoría
            </h2>
            <p className="text-gris-calido">
              Encontrá la decoración perfecta para tu evento
            </p>
          </div>

          <CategoryCarousel categorias={categorias} />

          <div className="text-center mt-8">
            <Link href="/catalogo">
              <Button variant="secondary" size="sm">
                Ver todas las categorías
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-crema">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-carbon mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-gris-calido max-w-2xl mx-auto">
              Tres simples pasos para cotizar tu decoración ideal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Explora",
                description:
                  "Navegá por nuestro catálogo y descubrí todas las opciones de decoración disponible.",
              },
              {
                step: "02",
                title: "Elige",
                description:
                  "Seleccioná los elementos que más te gusten para tu evento.",
              },
              {
                step: "03",
                title: "Coordina",
                description:
                  "Contactanos por WhatsApp y concretamos los detalles de tu cotización.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center p-8 bg-white rounded-2xl border border-borde animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="font-serif text-5xl text-dorado/30 mb-4 block">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl text-carbon mb-3">
                  {item.title}
                </h3>
                <p className="text-gris-calido text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-crema-oscuro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-carbon mb-4">
              Productos Destacados
            </h2>
            <p className="text-gris-calido max-w-2xl mx-auto">
              Conocé nuestros elementos más populares
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosDestacados.slice(0, 4).map((producto, index) => (
              <div
                key={producto.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/catalogo">
              <Button variant="secondary">
                Ver todos los productos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-crema">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-crema-oscuro">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=800&fit=crop"
                alt="Decoración elegante"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-dorado font-medium tracking-wider uppercase text-sm mb-4 block">
                ¿Por qué elegirnos?
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-carbon mb-6">
                Decoración que marca la diferencia
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-carbon mb-2">
                    Calidad Premium
                  </h4>
                  <p className="text-gris-calido text-sm">
                    Todos nuestros elementos son de alta calidad, cuidadosamente
                    seleccionados.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-carbon mb-2">
                    Asesoría Personalizada
                  </h4>
                  <p className="text-gris-calido text-sm">
                    Te ayudamos a elegir la decoración perfecta para tu evento.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-carbon mb-2">
                    Entrega y Montaje
                  </h4>
                  <p className="text-gris-calido text-sm">
                    Servicio completo de entrega, montaje y desmontaje.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/nosotros">
                  <Button variant="outline">
                    Conocenos más
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-crema">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-dorado text-xs uppercase tracking-[0.2em]">
              Testimonios
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-carbon mt-2">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-crema-oscuro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-dorado text-xs uppercase tracking-[0.2em]">
              Preguntas Frecuentes
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-carbon mt-2">
              Resolvé tus dudas
            </h2>
          </div>

          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-carbon relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-dorado/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-terracota/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            ¿Listo para transformar tu evento?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Escribinos y cotizá tu decoración ideal. Estamos para ayudarte a
            crear el evento de tus sueños.
          </p>
          <a
            href="https://wa.me/5491112345678?text=Hola%20Decor%20Rent%20Lab,%20quiero%20cotizar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg">
              Escribinos por WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
