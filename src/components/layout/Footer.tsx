'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useContactInfo } from '@/hooks/use-contact-info';

const quickLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export function Footer() {
  const { data } = useContactInfo();

  const phone = data?.phone || '+54 9 11 1234-5678';
  const email = data?.email || 'info@decorentlab.es';
  const address = data?.address || 'Buenos Aires, Argentina';
  const hours = data?.hours || 'Lun - Sáb: 9:00 - 19:00';
  const whatsappNumber = data?.whatsappNumber || '5491112345678';

  return (
    <footer className="bg-crema-oscuro border-t border-borde">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="font-serif text-2xl text-carbon mb-4">
              Decor<span className="text-dorado">Rent</span>Lab
            </h2>
            
            <div className="space-y-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola%20Decor%20Rent%20Lab,%20quiero%20cotizar`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gris-calido hover:text-carbon transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse shrink-0" />
                Cotizar por WhatsApp
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61588359792881"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-borde flex items-center justify-center text-gris-calido hover:text-carbon hover:border-carbon transition-all duration-300 bg-white/50"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/decorent.lab?igsh=YXdweXFsdzhqaDR3&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-borde flex items-center justify-center text-gris-calido hover:text-carbon hover:border-carbon transition-all duration-300 bg-white/50"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg text-carbon mb-4">Navegación</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gris-calido hover:text-carbon transition-colors text-sm hover:translate-x-1 inline-block transition-transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg text-carbon mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-dorado flex-shrink-0 mt-0.5" />
                <span className="text-gris-calido text-sm">{address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-dorado flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-gris-calido hover:text-carbon transition-colors text-sm"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-dorado flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${email}`}
                  className="text-gris-calido hover:text-carbon transition-colors text-sm"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-dorado flex-shrink-0 mt-0.5" />
                <span className="text-gris-calido text-sm">{hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-borde flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gris-calido text-sm order-2 md:order-1">
            © {new Date().getFullYear()} Decor Rent Lab. Todos los derechos reservados.
          </p>
          <p className="text-gris-calido/50 text-[10px] tracking-widest uppercase order-1 md:order-2">
            Desarrollado por{' '}
            <a
              href="https://valece.vercel.app/klein-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dorado/60 hover:text-dorado transition-colors font-bold"
            >
              Klein Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
