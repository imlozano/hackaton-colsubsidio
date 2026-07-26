"use client";

import { useState } from "react";

import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import type { Precarga } from "@/components/sections/Hero";
import { Proteger } from "@/components/sections/Proteger";

/**
 * Una sola entrada en toda la página: el input del hero.
 *
 * Las tarjetas de "Qué puedes proteger" no navegan, escriben ahí. El
 * estado compartido vive en este ancestro común y no en un contexto:
 * son dos componentes y una cadena de texto, no hace falta más.
 */
export default function Home() {
  const [precarga, setPrecarga] = useState<Precarga | null>(null);

  return (
    <>
      <Hero precarga={precarga} />
      <Proteger
        onElegir={(frase) =>
          setPrecarga((anterior) => ({ frase, n: (anterior?.n ?? 0) + 1 }))
        }
      />
      <ComoFunciona />
      <Faq />
    </>
  );
}
