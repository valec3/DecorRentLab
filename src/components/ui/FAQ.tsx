'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className="border-b border-borde last:border-b-0"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-5 text-left hover:bg-crema-oscuro/30 -mx-4 px-4 rounded-xl transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-dorado/10 rounded-full flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-4 h-4 text-dorado" />
              </div>
              <span className="font-medium text-carbon">{faq.question}</span>
            </div>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-dorado flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gris-calido flex-shrink-0" />
            )}
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-500 ${
              openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pb-5 pl-12 pr-4 text-gris-calido leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
