"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

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
 * Abre el hero, **encima** del titular y en su propio contenedor, nunca
 * detrás: el H1, el input y los chips no tienen un solo asset debajo.
 *
 * Dos planos. El de fondo —nubes, flechas, casa, portátil, patinete y
 * destellos— está quieto. El cluster —cojín, cifras y mascotas— levita
 * como una sola pieza, y la sombra le responde al revés.
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

  /* Un único valor gobierna la levitación: 0 abajo, 1 arriba. De él
     cuelgan el desplazamiento del cluster y la respuesta de la sombra,
     así que en toda la página hay **un solo bucle infinito**, no uno
     por elemento.

     El apagado va aquí, en JavaScript, y no en el bloque global de
     `prefers-reduced-motion` de `globals.css`: ese bloque anula
     `animation-duration`, que solo alcanza a los keyframes CSS. Esto es
     un bucle de framer sobre requestAnimationFrame y seguiría corriendo
     tan tranquilo. Es el mismo agujero que ya apareció con el retraso
     de la entrada y con el estado `espera` de las secciones. */
  const flote = useMotionValue(0);

  useEffect(() => {
    if (reducido) return;
    const control = animate(flote, [0, 1, 0], {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    });
    return () => control.stop();
  }, [flote, reducido]);

  const yCluster = useTransform(flote, [0, 1], [0, -8]);
  /* La sombra responde al revés: cuando el cluster sube, se encoge y se
     aclara. Ese contrapunto es lo que se lee como levitación; sin él,
     el mismo movimiento parece una vibración. */
  const anchoSombra = useTransform(flote, [0, 1], [1, 0.85]);
  const opacidadSombra = useTransform(flote, [0, 1], [1, 0.6]);

  const fondo = escenaHero.filter((a) => a.group === "background");
  const cluster = escenaHero.filter((a) => a.group === "foreground");

  return (
    <div
      aria-hidden="true"
      /* La escena abre el hero, así que el aire va debajo. Tiene que
         superar el sangrado del cojín para que no toque el titular. */
      className="pointer-events-none mb-16 w-full select-none"
    >
      {/* Una sola proporción en las dos anchuras, y no dos: con
          aspect-ratios distintos el mismo `y` cae en sitios distintos y
          las relaciones verticales se deshacían —en móvil las mascotas
          dejaban de solapar las cifras—. El contenedor está recortado
          por arriba para que la escena arranque cerca del borde en vez
          de dejar un vacío. El radio no recorta nada: el overflow es
          visible y el fondo se apaga antes del borde. */}
      <div
        style={{ backgroundImage: RESPLANDOR }}
        className="relative mx-auto aspect-[2/1] w-full max-w-[900px] rounded-[20px]"
      >
        {/* Sombra de contacto. Se encoge y se aclara cuando el cluster
            sube, y vuelve a 1 cuando baja. Va fuera del contenedor que
            levita: si flotara con él, no habría contrapunto. */}
        <motion.div
          style={{
            background: SOMBRA_CONTACTO,
            filter: "blur(14px)",
            scaleX: anchoSombra,
            opacity: opacidadSombra,
          }}
          className="absolute top-[100%] left-[20%] h-[16%] w-[60%]"
        />

        {/* Plano de fondo: no se mueve. Moverlo con el cluster aplanaría
            la profundidad que da tenerlo más pequeño y más atenuado. */}
        {fondo.map(pintar)}

        {/* El cluster entero cuelga de un solo contenedor animado. Un
            `y` por asset serían once bucles y once oportunidades de que
            se desincronicen. */}
        <motion.div style={{ y: yCluster }} className="absolute inset-[0px]">
          {cluster.map(pintar)}
        </motion.div>
      </div>
    </div>
  );

  function pintar(asset: (typeof escenaHero)[number]) {
    /* `rotate`, `scale` y `opacity` van como propiedades de motion y no
       dentro de un `transform` en `style`: framer compone el transform
       entero y un string nuestro se lo pisaría. Al animar `y` todos los
       envoltorios acaban con transform, así que todos crean contexto de
       apilamiento y manda el orden del array. Por eso `z` sube con él. */
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
  }
}
