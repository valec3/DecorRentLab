"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useContactInfo } from '@/hooks/use-contact-info';

export function Footer() {
  const { data } = useContactInfo();

  const phone = data?.phone || "+54 9 11 1234-5678";
  const email = data?.email || "info@decorentlab.com";
  const address = data?.address || "Buenos Aires, Argentina";
  const hours = data?.hours || "Lun - Sáb: 9:00 - 19:00";
  const whatsappNumber = data?.whatsappNumber || "5491112345678";

  return (
    <footer className="bg-crema-oscuro border-t border-borde">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-2xl text-carbon mb-4">
              Decor<span className="text-dorado">Rent</span>Lab
            </h2>
            <p className="text-gris-calido text-sm leading-relaxed mb-6">
              Transformamos tus eventos en experiencias memorables con decoración 
              premium de alquiler. Elegancia y estilo para bodas, quinceañeras y eventos corporativos.
            </p>
            <div className="flex gap-4">
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg text-carbon mb-4">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gris-calido hover:text-carbon transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gris-calido hover:text-carbon transition-colors text-sm">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gris-calido hover:text-carbon transition-colors text-sm">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gris-calido hover:text-carbon transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg text-carbon mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-dorado flex-shrink-0 mt-0.5" />
                <span className="text-gris-calido text-sm">
                  {address}
                </span>
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
                <span className="text-gris-calido text-sm">
                  {hours}
                </span>
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
            Desarrollado por <a href="https://valece.vercel.app/klein-code" target="_blank" rel="noopener noreferrer" className="text-dorado/60 hover:text-dorado transition-colors font-bold">Klein Code</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
