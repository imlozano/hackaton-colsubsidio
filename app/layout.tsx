import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { sitio } from "@/lib/data";

import "./globals.css";

/* Geist y Geist Mono se exponen como --font-sans y --font-mono en el
   @theme de globals.css, con Inter Tight / JetBrains Mono de respaldo. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: sitio.titulo,
  description: sitio.descripcion,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Las extensiones del navegador inyectan atributos en el <body>
          antes de que React hidrate —cz-shortcut-listen, de ColorZilla,
          es el caso conocido aquí— y eso dispara un aviso de hidratación
          que no viene de este código y que el usuario no puede arreglar.
          El silencio se limita al <body>: cualquier desajuste real dentro
          de la app sigue avisando. */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col`}
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
