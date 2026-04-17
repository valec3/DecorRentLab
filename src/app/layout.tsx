import type { Metadata } from "next";
import "./globals.css";

import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL('https://decorentlab.com.ar'), // Reemplazar con URL real
  title: {
    default: "Decor Rent Lab | Alquiler de Decoración Premium para Eventos",
    template: "%s | Decor Rent Lab"
  },
  description: "Alquiler de elementos decorativos únicos y premium en Buenos Aires. Paneles, letras LED, esferas gigantes y todo para que tu evento sea inolvidable.",
  keywords: ["alquiler decoración", "decoración eventos buenos aires", "letras led eventos", "paneles decorativos", "alquiler para bodas", "quinceañeras", "eventos corporativos"],
  authors: [{ name: "Klein Code" }],
  creator: "Klein Code",
  openGraph: {
    title: "Decor Rent Lab | Alquiler de Decoración Premium",
    description: "Transformamos tus eventos con decoración de alta gama. Elegancia y estilo en cada detalle.",
    url: 'https://decorentlab.com.ar',
    siteName: 'Decor Rent Lab',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decor Rent Lab | Decoración Premium',
    description: 'Alquiler de elementos decorativos únicos para eventos memorables.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("scroll-smooth", "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-crema text-carbon antialiased">
        <PublicLayoutWrapper>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}

