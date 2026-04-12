import { FaqItem, TestimonialItem, AboutContent, HomeContent } from "@/types";

export const faqs: FaqItem[] = [
  {
    question: '¿Cuál es el tiempo mínimo de alquiler?',
    answer: 'Nuestros alquileres son por evento. El tiempo mínimo es de 1 día para eventos. Contamos con opciones de alquiler por weekend completo para eventos de varios días.'
  },
  {
    question: '¿Incluyen servicio de montaje y desmontaje?',
    answer: 'Sí, todos nuestros alquileres incluyen servicio completo de entrega, montaje y desmontaje en el lugar de tu evento. El tiempo de montaje ya está incluido en el precio.'
  },
  {
    question: '¿Cuál es la política de cancelación?',
    answer: 'Cancelación gratuita hasta 7 días antes del evento. Entre 3-7 días antes se devuelve el 50%. Menos de 3 días no hay reembolso pero puedes mudar la fecha.'
  },
  {
    question: '¿Hacen envíos a todo Buenos Aires?',
    answer: 'Sí, hacemos envíos a Capital Federal, Gran Buenos Aires y localidades cercanas. El costo de envío varía según la zona. Consultanos para cotizar.'
  },
  {
    question: '¿Los precios incluyen IVA?',
    answer: 'Todos nuestros precios son finales e incluyen IVA. No hay costos ocultos.'
  },
  {
    question: '¿Puedo ver los productos antes de alquilar?',
    answer: 'Sí, tenemos showroom donde podés ver nuestros productos en persona. Agenda tu visita previamente.'
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: '1',
    name: 'María González',
    event: 'Boda',
    text: 'Increíble experiencia con Decor Rent Lab. La decoración del corazón de flores fue el centro de atención de nuestra boda. Todo perfección.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '2',
    name: 'Carolina Sánchez',
    event: 'Quinceañera',
    text: 'El mejor descubrimiento para la decoración del evento de mi hija. Las letras LED Infinity fueron un éxito total. Recomendadísimo.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '3',
    name: 'Roberto Díaz',
    event: 'Evento Corporativo',
    text: 'Profesionalismo absoluto. El equipo entendió perfectamente lo que necesitábamos y el resultado superó expectativas.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '4',
    name: 'Ana Martínez',
    event: 'Baby Shower',
    text: 'Las esferas gigantes fueron mágicas. Todos los invitados quedaron impresionados. Volveré a contratar sin dudas.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    rating: 5
  }
];

export const aboutContent: AboutContent = {
  title: 'Sobre Nosotros',
  description: 'Transformamos eventos ordinarios en experiencias extraordinarias con decoración premium',
  mainImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1000&fit=crop',
  historyTitle: 'Decor Rent Lab',
  historyParagraphs: [
    'Somos una empresa dedicada al alquiler de decoración premium para eventos. Nuestra pasión es transformar espacios ordinarios en ambientes únicos y memorables.',
    'Con años de experiencia en el sector, entendemos que cada evento es único y merece una atención especial. Por eso trabajamos de cerca con nuestros clientes para crear experiencias personalizadas que superen expectativas.',
    'Nuestra colección incluye paneles decorativos, estructuras, letras LED, esferas gigantes, paredes de flores y mucho más. Todos nuestros elementos son de la más alta calidad, cuidadosamente seleccionados para garantizar excelencia en cada evento.'
  ],
  servicesTitle: 'Nuestros Servicios',
  services: [
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
  ],
  valuesTitle: 'Nuestros Valores',
  values: [
    { title: 'Calidad', description: 'Solo trabajamos con productos premium' },
    { title: 'Compromiso', description: 'Dedicación total a cada cliente' },
    { title: 'Creatividad', description: 'Soluciones innovadoras y únicas' },
    { title: 'Profesionalismo', description: 'Servicio impecable de principio a fin' }
  ]
};

export const homeContent: HomeContent = {
  hero: {
    title: 'Alquiler de Decoración',
    subtitle: 'Premium para Eventos',
    description: 'Mobiliario exclusivo, ambientación de lujo y piezas curadas para que tu celebración sea inolvidable.',
    backgroundImage: '/hero.png',
    primaryButtonText: 'Explorar Catálogo',
    whatsappMessage: 'Hola Decor Rent Lab, quiero cotizar'
  },
  howItWorks: {
    title: 'Tu visión, nuestra gestión',
    description: 'Un proceso impecable diseñado para que solo te preocupes por disfrutar.',
    steps: [
      {
        title: "Selección Curada",
        description: "Explora elementos seleccionados bajo los más altos estándares de estética premium."
      },
      {
        title: "Asesoría Experta",
        description: "Coordinamos vía WhatsApp cada detalle para asegurar que la visión de tu evento sea perfecta."
      },
      {
        title: "Logística Sin Estrés",
        description: "Nos encargamos de la entrega y el montaje con precisión y cuidado artesanal."
      }
    ]
  },
  philosophy: {
    title: 'Creamos atmósferas que cuentan historias',
    description: 'En Decor Rent Lab, no solo alquilamos objetos; proporcionamos los elementos necesarios para materializar tus sueños más sofisticados.',
    image: '/filosofia.png',
    stats: {
      value: '500+',
      label: 'Eventos Exitosos'
    },
    items: [
      { title: "Curaduría", description: "Objetos seleccionados por su valor estético y calidad." },
      { title: "Excelencia", description: "Compromiso total con la puntualidad y el detalle." },
      { title: "Pasión", description: "Amamos el diseño y se nota en cada montaje." },
      { title: "Personalización", description: "Buscamos la pieza exacta que tu evento requiere." }
    ]
  },
  cta: {
    title: '¿Hacemos realidad tu próximo gran evento?',
    description: 'No dejes tu visión al azar. Consultá disponibilidad y obtené una cotización personalizada hoy mismo.',
    whatsappMessage: 'Hola Decor Rent Lab, quiero cotizar'
  }
};
