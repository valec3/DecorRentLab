import { Metadata } from 'next';
import Image from 'next/image';

import { aboutService } from '@/services/supabase/about/service';
import { aboutContent as fallbackContent } from '@/data/content';

export async function generateMetadata(): Promise<Metadata> {
  const content = await aboutService.getAbout();
  const data = content || fallbackContent;
  
  return {
    title: `${data.title} | Decor Rent Lab`,
    description: data.description,
  };
}

export default async function NosotrosPage() {
  const dbContent = await aboutService.getAbout();
  const content = dbContent || fallbackContent;
  return (
    <div className="pt-24 pb-16 bg-crema min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-carbon mb-6">
            {content.title}
          </h1>
          <p className="text-gris-calido text-lg max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-crema-oscuro">
            <Image
              src={content.mainImage}
              alt={content.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-carbon mb-6">
              {content.historyTitle}
            </h2>
            <div className="space-y-4 text-gris-calido">
              {content.historyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl text-carbon mb-10 text-center">
            {content.servicesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service, index) => (
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
            {content.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.values.map((value, index) => (
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
