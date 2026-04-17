import { Metadata } from 'next';
import { ContactForm } from '@/modules/contacto/ContactForm';

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponete en contacto con nosotros para cotizar la decoración de tu evento. Te respondemos al instante por WhatsApp.",
};

export default function ContactoPage() {
  return <ContactForm />;
}
