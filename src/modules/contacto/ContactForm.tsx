'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Input, Textarea } from '@/components/custom/Input';
import { Button } from '@/components/custom/Button';
import { useContactInfo } from '@/hooks/use-contact-info';

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    tipoEvento: '',
    fecha: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: contactInfo } = useContactInfo();

  const phone = contactInfo?.phone || "+54 9 11 1234-5678";
  const email = contactInfo?.email || "info@decorentlab.com";
  const address = contactInfo?.address || "Buenos Aires, Argentina";
  const hours = contactInfo?.hours || "Lun - Sáb: 9:00 - 19:00";
  const whatsappNumber = contactInfo?.whatsappNumber || "5491112345678";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }
    if (!formData.tipoEvento) {
      newErrors.tipoEvento = 'Selecciona el tipo de evento';
    }
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const mensaje = `Hola Decor Rent Lab, me llamo ${formData.nombre}. 
Tipo de evento: ${formData.tipoEvento}
Fecha: ${formData.fecha || 'Por definir'}
Teléfono: ${formData.telefono}
Mensaje: ${formData.mensaje}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-24 pb-16 bg-crema min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-carbon mb-6">
            Contactanos
          </h1>
          <p className="text-gris-calido text-lg max-w-2xl mx-auto">
            Estamos aquí para ayudarte a crear el evento de tus sueños. Escribinos y cotizá tu decoración ideal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl text-carbon mb-6">
              Información de Contacto
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-dorado/10 rounded-full">
                  <Phone className="w-5 h-5 text-dorado" />
                </div>
                <div>
                  <h3 className="font-medium text-carbon">Teléfono</h3>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-gris-calido hover:text-carbon">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-dorado/10 rounded-full">
                  <Mail className="w-5 h-5 text-dorado" />
                </div>
                <div>
                  <h3 className="font-medium text-carbon">Email</h3>
                  <a href={`mailto:${email}`} className="text-gris-calido hover:text-carbon">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-dorado/10 rounded-full">
                  <MapPin className="w-5 h-5 text-dorado" />
                </div>
                <div>
                  <h3 className="font-medium text-carbon">Dirección</h3>
                  <p className="text-gris-calido">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-dorado/10 rounded-full">
                  <Clock className="w-5 h-5 text-dorado" />
                </div>
                <div>
                  <h3 className="font-medium text-carbon">Horario de Atención</h3>
                  <p className="text-gris-calido">{hours}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-verde-savia/10 p-6 rounded-2xl">
              <h3 className="font-medium text-carbon mb-2">
                ¿Preferes WhatsApp?
              </h3>
              <p className="text-gris-calido text-sm mb-4">
                Escribinos directamente y te respondemos al instante.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola%20Decor%20Rent%20Lab,%20quiero%20cotizar`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" className="w-full">
                  Escribir por WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-borde">
            <div className="flex items-center gap-2 mb-6 p-4 bg-dorado/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-dorado-oscuro flex-shrink-0" />
              <p className="text-sm text-dorado-oscuro">
                No se procesa pago online en esta etapa. Esta consulta es solo para cotización.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre completo"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                error={errors.nombre}
              />

              <Input
                label="Teléfono"
                placeholder="Tu número de teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                error={errors.telefono}
              />

              <div>
                <label className="block text-sm font-medium text-carbon mb-2">
                  Tipo de Evento
                </label>
                <select
                  value={formData.tipoEvento}
                  onChange={(e) => setFormData({ ...formData, tipoEvento: e.target.value })}
                  className={`w-full px-4 py-3 bg-white border-b-2 text-carbon rounded-lg focus:outline-none transition-colors ${
                    errors.tipoEvento ? 'border-red-400' : 'border-borde focus:border-dorado'
                  }`}
                >
                  <option value="">Seleccionar tipo de evento</option>
                  <option value="boda">Boda</option>
                  <option value="quinceañera">Quinceañera</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="cumpleaños">Cumpleaños</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.tipoEvento && <p className="mt-1 text-sm text-red-500">{errors.tipoEvento}</p>}
              </div>

              <Input
                label="Fecha del evento (opcional)"
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />

              <Textarea
                label="Mensaje"
                placeholder="Cuéntanos sobre tu evento, qué decoración buscas y cualquier detalle relevante..."
                rows={4}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                error={errors.mensaje}
              />

              <Button type="submit" variant="primary" className="w-full">
                Enviar Consulta
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
