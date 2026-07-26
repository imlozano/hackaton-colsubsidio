"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ANCHO_ESCENARIO, escenaHero } from "@/lib/hero.config";

import { HeroAsset } from "./HeroAsset";

/** La única curva de la página. Nada rebota, nada sobrepasa. */
const SUAVE = [0.22, 1, 0.36, 1] as const;
const ENTRADA_DUR = 0.4;

/**
 * Entrada de la escena, en segundos desde el load. Va entera detrás del
 * contenido, que cierra en 0.64.
 *
 * Es la coreografía aprobada en su momento, no un bucle: la escena en
 * reposo está completamente quieta.
 */
const ENTRADA_SEG: Record<string, number> = {
  platform: 0.3,
  "number-2": 0.36,
  "number-4": 0.36,
  slash: 0.36,
  "number-7": 0.36,
  house: 0.42,
  laptop: 0.42,
  scooter: 0.42,
  "mascot-left": 0.48,
  "mascot-right": 0.48,
  "cloud-left": 0.54,
  "cloud-right": 0.54,
  "arrow-1": 0.54,
  "arrow-2": 0.54,
  "arrow-3": 0.54,
  "sparkle-1": 0.6,
  "sparkle-2": 0.6,
};

/* El resplandor es luz, no un bloque de color: amarillo de marca a muy
   baja opacidad que se apaga antes del borde. Si se lee como un
   rectángulo amarillo, está mal. Se construye con `color-mix` sobre el
   token para no meter un hex suelto. Estático. */
const RESPLANDOR =
  "radial-gradient(ellipse 70% 70% at 50% 75%, color-mix(in srgb, var(--color-yellow-500) 14%, transparent) 0%, transparent 70%)";

/* La elipse difusa que asienta la escena en un suelo. Sin ella, el
   conjunto flota. */
const SOMBRA_CONTACTO =
  "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-ink) 10%, transparent) 0%, transparent 70%)";

/**
 * La escena ilustrada del hero.
 *
 * Vive **debajo** del contenido, en su propio contenedor, y no detrás de
 * él: el titular, el input y los chips no tienen un solo asset encima.
 *
 * La composición entera está en `lib/hero.config.ts`. Aquí solo se
 * coloca: porcentajes sobre un contenedor de aspect-ratio fijo, así que
 * la escena escala proporcionalmente sin posiciones por breakpoint.
 *
 * `overflow` visible a propósito: la plataforma sangra por debajo del
 * borde inferior y el suelo se lee como si continuara fuera de cuadro.
 *
 * Toda la escena es decorativa: `aria-hidden` aquí y `alt=""` en cada
 * asset. No se describe.
 */
export function HeroScene() {
  const reducido = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      /* En móvil el propio contenedor ya deja aire por arriba —solo
         entra el núcleo, abajo—, así que el margen es menor. */
      className="pointer-events-none mt-4 w-full select-none md:mt-24"
    >
      {/* 4/3 en móvil, 16/9 desde md. El radio no recorta nada —el
          overflow es visible y el fondo se apaga antes del borde—, pero
          queda declarado por si algún día el contenedor gana superficie. */}
      <div
        style={{ backgroundImage: RESPLANDOR }}
        className="relative mx-auto aspect-[4/3] w-full max-w-[900px] rounded-[20px] md:aspect-[16/9]"
      >
        {/* Sombra de contacto bajo el cojín. */}
        <div
          style={{ background: SOMBRA_CONTACTO, filter: "blur(14px)" }}
          className="absolute top-[98%] left-[20%] h-[14%] w-[60%]"
        />

        {escenaHero.map((asset) => {
          /* `rotate`, `scale` y `opacity` van como propiedades de motion
             y no dentro de un `transform` en `style`: framer compone el
             transform entero y un string nuestro se lo pisaría. Al
             animar `y` todos los envoltorios acaban con transform, así
             que todos crean contexto de apilamiento y manda el orden del
             array. Por eso `z` sube con él. */
          const reposo = {
            rotate: asset.rotation ?? 0,
            scale: asset.scale ?? 1,
            opacity: asset.opacity ?? 1,
          };

          return (
            <motion.div
              key={asset.id}
              style={{
                left: `${asset.x}%`,
                top: `${asset.y}%`,
                width: `${asset.width}%`,
                transformOrigin: asset.origin ?? "center",
              }}
              initial={{ ...reposo, opacity: 0, y: 12 }}
              animate={{ ...reposo, y: 0 }}
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
                /* El contenedor mide `width`% de min(ancho, 900px). */
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
