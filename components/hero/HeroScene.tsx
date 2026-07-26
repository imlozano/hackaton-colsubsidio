import { ANCHO_ESCENARIO, escenaHero } from "@/lib/hero.config";

import { HeroAsset } from "./HeroAsset";

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
          const gira = asset.rotation !== undefined || asset.scale !== undefined;

          return (
            <div
              key={asset.id}
              style={{
                left: `${asset.x}%`,
                top: `${asset.y}%`,
                width: `${asset.width}%`,
                ...(gira && {
                  transform: [
                    asset.rotation !== undefined && `rotate(${asset.rotation}deg)`,
                    asset.scale !== undefined && `scale(${asset.scale})`,
                  ]
                    .filter(Boolean)
                    .join(" "),
                  transformOrigin: asset.origin ?? "center",
                }),
              }}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
