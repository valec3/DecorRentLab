import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nosotros | Decor Rent Lab',
  description: 'Conocenos. Somos especialistas en alquiler de decoración premium para eventos.',
};

export default function NosotrosPage() {
  return (
    <div className="pt-24 pb-16 bg-crema min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-carbon mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-gris-calido text-lg max-w-2xl mx-auto">
            Transformamos eventos ordinarios en experiencias extraordinarias con decoración premium
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-crema-oscuro">
            <Image
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1000&fit=crop"
              alt="Decoración elegante"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-carbon mb-6">
              Decor Rent Lab
            </h2>
            <div className="space-y-4 text-gris-calido">
              <p>
                Somos una empresa dedicada al alquiler de decoración premium para eventos. 
                Nuestra pasión es transformar espacios ordinarios en ambientes únicos y memorables.
              </p>
              <p>
                Con años de experiencia en el sector, entendemos que cada evento es único 
                y merece una atención especial. Por eso trabajamos de cerca con nuestros 
                clientes para crear experiencias personalizadas que superen expectativas.
              </p>
              <p>
                Nuestra colección incluye paneles decorativos, estructuras, letras LED, 
                esferas gigantes, paredes de flores y mucho más. Todos nuestros elementos 
                son de la más alta calidad, cuidadosamente seleccionados para garantizar 
                excelencia en cada evento.
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl text-carbon mb-10 text-center">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Asesoría Personalizada',
                description: 'Te ayudamos a elegir la decoración perfecta para tu evento, considerando tu estilo y presupuesto.'
              },
              {
                title: 'Alquiler de Decoración',
                description: 'Amplia variedad de elementos decorativos para bodas, quinceañeras, eventos corporativos y más.'
              },
              {
                title: 'Entrega y Montaje',
                description: 'Servicio completo de entrega, montaje y desmontaje en el lugar de tu evento.'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-borde"
              >
                <h3 className="font-serif text-xl text-carbon mb-3">{service.title}</h3>
                <p className="text-gris-calido text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-crema-oscuro rounded-2xl p-8 md:p-12">
          <h2 className="font-serif text-3xl text-carbon mb-10 text-center">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Calidad', description: 'Solo trabajamos con productos premium' },
              { title: 'Compromiso', description: 'Dedicación total a cada cliente' },
              { title: 'Creatividad', description: 'Soluciones innovadoras y únicas' },
              { title: 'Profesionalismo', description: 'Servicio impecable de principio a fin' }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="font-serif text-xl text-dorado mb-2">{value.title}</h3>
                <p className="text-gris-calido text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
