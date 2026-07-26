"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ANCHO_ESCENARIO, escenaHero } from "@/lib/hero.config";

import { HeroAsset } from "./HeroAsset";

/** La única curva de la página. Nada rebota, nada sobrepasa. */
const SUAVE = [0.22, 1, 0.36, 1] as const;
const ENTRADA_DUR = 0.4;

/**
 * Bloque 1 — la escena se arma una sola vez, en segundos desde el load.
 *
 * Va entera por detrás del contenido: el titular abre en 0 y la
 * ilustración no empieza hasta 0.4. Esa jerarquía es el guion.
 *
 * El patinete no estaba en el guion; entra con la casa y el portátil
 * porque es el tercer objeto de la escena, no un personaje.
 */
const ENTRADA_SEG: Record<string, number> = {
  platform: 0.4,
  "number-2": 0.48,
  "number-4": 0.48,
  slash: 0.48,
  "number-7": 0.48,
  house: 0.56,
  laptop: 0.56,
  scooter: 0.56,
  "mascot-left": 0.64,
  "mascot-right": 0.64,
  "cloud-left": 0.72,
  "cloud-right": 0.72,
  "sparkle-1": 0.8,
  "sparkle-2": 0.8,
};

/**
 * El escenario de la ilustración del hero.
 *
 * Recorre `escenaHero` y coloca cada asset en porcentajes sobre un
 * contenedor de aspect-ratio fijo, así que la escena entera escala
 * proporcionalmente y no hay posiciones por breakpoint.
 *
 * Va fuera de flujo y detrás del contenido a propósito: pase lo que
 * pase con la ilustración, el h1, el input, el CTA y los chips no se
 * mueven ni un píxel. Esa es la regla, no una consecuencia.
 *
 * Toda la escena es decorativa: `aria-hidden` aquí y `alt=""` en cada
 * asset. No se describe.
 */
export function HeroScene() {
  const reducido = useReducedMotion();

  return (
    /* Los ceros van entre corchetes a propósito. `globals.css` anula la
       escala dinámica con `--spacing: initial` para que `p-7` no exista,
       y eso se lleva por delante las utilidades `-0`: Tailwind no llega
       a generar `.inset-x-0` ni `.bottom-0`, así que la capa se queda sin
       anclaje y colapsa a 0×0. Con valor arbitrario no pasa por la
       escala. No lo cambies a `inset-x-0 bottom-0`. */
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[0px] bottom-[0px] select-none"
    >
      <div className="relative mx-auto aspect-[16/9] w-full max-w-page">
        {escenaHero.map((asset) => {
          /* `rotate` y `scale` van como propiedades de motion y no dentro
             de un `transform` en `style`: framer compone el transform
             entero y un string nuestro se lo pisaría. Al animar `y` todos
             los envoltorios acaban con transform, así que todos crean
             contexto de apilamiento y quien manda es el orden del array.
             Por eso `z` sube con él. */
          const giro = { rotate: asset.rotation ?? 0, scale: asset.scale ?? 1 };

          return (
            <motion.div
              key={asset.id}
              style={{
                left: `${asset.x}%`,
                top: `${asset.y}%`,
                width: `${asset.width}%`,
                transformOrigin: asset.origin ?? "center",
              }}
              initial={{ opacity: 0, y: 12, ...giro }}
              animate={{ opacity: 1, y: 0, ...giro }}
              transition={
                reducido
                  ? { duration: 0, delay: 0 }
                  : {
                      duration: ENTRADA_DUR,
                      delay: ENTRADA_SEG[asset.id] ?? 0,
                      ease: SUAVE,
                    }
              }
              className={`absolute ${asset.hideOnMobile ? "hidden md:block" : ""}`}
            >
              <HeroAsset
                src={asset.src}
                z={asset.z}
                priority={asset.priority}
                /* El escenario mide `width`% de min(viewport, 1280px),
                   así que por debajo de 1280 el ancho en vw coincide. */
                sizes={`(max-width: ${ANCHO_ESCENARIO}px) ${asset.width}vw, ${Math.round(
                  (ANCHO_ESCENARIO * asset.width) / 100,
                )}px`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
