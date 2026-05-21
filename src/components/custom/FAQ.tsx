'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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

            {/* Chevron animado en lugar de swap instantáneo de íconos */}
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
            >
              <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${openIndex === index ? 'text-dorado' : 'text-gris-calido'}`} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.3, ease: 'easeOut' },
                }}
                style={{ overflow: 'hidden' }}
              >
                <div className="pb-5 pl-12 pr-4 text-gris-calido leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
