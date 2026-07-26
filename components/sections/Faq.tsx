"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { useEntrada } from "@/components/ui/useEntrada";
import { faq } from "@/lib/data";

/** La única curva de la página. Nada rebota, nada sobrepasa. */
const SUAVE = [0.22, 1, 0.36, 1] as const;
const APERTURA = { duration: 0.18, ease: SUAVE };

/**
 * FAQ — brief §5.
 *
 * Era un `<details>`/`<summary>`, que salía gratis en accesibilidad y
 * funcionaba sin JavaScript. Se cambió porque la altura tiene que
 * animarse de verdad, y eso `<details>` no lo hace: la vía en CSS puro
 * es `interpolate-size` con `allow-discrete`, que Safari todavía no
 * soporta, y con `max-height` la apertura sale con un tirón porque el
 * valor no coincide con el alto real. `AnimatePresence` mide el alto en
 * píxeles y lo anima; framer-motion ya estaba instalado.
 *
 * La accesibilidad que daba el navegador se repone a mano: cada
 * pregunta es un `<button>` dentro de su `<h3>`, con `aria-expanded` y
 * `aria-controls`, y la respuesta es una región etiquetada por su
 * botón.
 *
 * A cambio, esta sección **sí necesita JavaScript** para abrirse. Es un
 * compromiso aceptable: está muy por debajo del pliegue y no es la
 * pieza crítica de la demo. El hero, que sí lo es, sigue entrando con
 * keyframes CSS y no depende de la hidratación.
 *
 * Las respuestas están escritas en voz de marca y marcadas `// REVISAR`
 * en `lib/data.ts`.
 */
export function Faq() {
  const { ref, entra } = useEntrada();
  const reducido = useReducedMotion();
  const [abierta, setAbierta] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      data-entra={entra}
      aria-labelledby="faq-titulo"
      className="mx-auto w-full max-w-page px-5 py-16 md:px-10 md:py-32"
    >
      <h2
        id="faq-titulo"
        className="text-titulo text-balance md:text-titulo-lg"
      >
        {faq.titulo}
      </h2>

      {/* Sin escalonado: el FAQ entra de una pieza. */}
      <div className="entra mt-12 max-w-prosa border-t border-line">
        {faq.preguntas.map(({ pregunta, respuesta }, i) => {
          const idPanel = `faq-panel-${i}`;
          const idBoton = `faq-boton-${i}`;
          const activa = abierta === pregunta;

          return (
            <div key={pregunta} className="border-b border-line">
              <h3>
                <button
                  id={idBoton}
                  type="button"
                  aria-expanded={activa}
                  aria-controls={idPanel}
                  onClick={() => setAbierta(activa ? null : pregunta)}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-subtitulo font-semibold"
                >
                  {pregunta}
                  <ChevronDown
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className={`size-5 shrink-0 text-ink-soft transition-transform duration-[180ms] ease-marca ${
                      activa ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>

              <AnimatePresence>
                {activa && (
                  <motion.div
                    key={idPanel}
                    id={idPanel}
                    role="region"
                    aria-labelledby={idBoton}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reducido ? { duration: 0 } : APERTURA}
                    className="overflow-hidden"
                  >
                    <p className="max-w-prosa pb-6 text-cuerpo text-ink-soft md:text-cuerpo-lg">
                      {respuesta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
