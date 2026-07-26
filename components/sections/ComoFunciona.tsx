"use client";

import type { CSSProperties } from "react";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { useEntrada } from "@/components/ui/useEntrada";
import { comoFunciona } from "@/lib/data";

/**
 * Cómo funciona — brief §5.
 *
 * **El único amarillo grande de la página**, y por eso funciona. El
 * amarillo es superficie, nunca tinta: el texto va en `ink`, que sobre
 * `yellow-500` da 17:1.
 *
 * A sangre completa: el color lo pinta la sección y el ancho lo limita
 * el contenedor de dentro, así el bloque llega a los dos bordes de la
 * pantalla sin romper la rejilla de 1280px.
 */
export function ComoFunciona() {
  const { ref, entra } = useEntrada();

  return (
    <section
      ref={ref}
      data-entra={entra}
      aria-labelledby="como-funciona-titulo"
      className="bg-yellow-500 text-ink"
    >
      <div className="mx-auto w-full max-w-page px-5 py-16 md:px-10 md:py-32">
        <h2
          id="como-funciona-titulo"
          className="entra text-titulo text-balance md:text-titulo-lg"
        >
          {comoFunciona.titulo}
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {comoFunciona.pasos.map((paso, i) => (
            /* Escalonado de 90ms: los pasos se leen en orden. */
            <li
              key={paso.titulo}
              style={{ "--entra-retraso": `${i * 90}ms` } as CSSProperties}
              className="entra"
            >
              <span className="font-mono text-eyebrow tracking-eyebrow tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* font-semibold iguala el peso del h2: con el 500 del
                  token serían tres pesos en la misma sección. */}
              <h3 className="mt-3 text-subtitulo font-semibold text-balance md:text-subtitulo-lg">
                {paso.titulo}
              </h3>
              <p className="mt-2 max-w-prosa text-cuerpo md:text-cuerpo-lg">
                {paso.detalle}
              </p>
            </li>
          ))}
        </ol>

        {/* La barra de 6 pasos es ilustración estática de lo que hace el
            agente después de la entrega, no un indicador vivo. Va sobre
            superficie blanca: sin borde ni sombra encima, que las tres
            cosas juntas están prohibidas. */}
        <div
          style={{ "--entra-retraso": "270ms" } as CSSProperties}
          className="entra mt-16 rounded-lg bg-surface p-6 md:max-w-prosa md:p-8"
        >
          <h3 className="font-mono text-eyebrow tracking-eyebrow text-ink-soft uppercase">
            {comoFunciona.recorrido}
          </h3>
          <div className="mt-4">
            <ProgressBar />
          </div>
        </div>
      </div>
    </section>
  );
}
