'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

import { faqs } from '@/data/content';

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
              <div className="w-8 h-8 bg-dorado/10 rounded-full flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4 text-dorado" />
              </div>
              <span className="font-medium text-carbon">{faq.question}</span>
            </div>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-dorado shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gris-calido shrink-0" />
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
