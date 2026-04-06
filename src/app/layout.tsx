import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Decor Rent Lab | Alquiler de Decoración para Eventos",
  description: "Alquiler de elementos decorativos premium para eventos. Paneles, estructuras, letras LED, esferas gigantes y más.",
  keywords: "decoración eventos, alquiler decoracion, eventos, matrimonio, quinceañeras, corporativa",
  openGraph: {
    title: "Decor Rent Lab | Alquiler de Decoración para Eventos",
    description: "Transforma tu evento con elementos decorativos únicos y elegantes.",
    type: "website",
  },
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

