import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

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
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-crema text-carbon antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
