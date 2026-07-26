import { ChevronDown } from "lucide-react";

import { faq } from "@/lib/data";

/**
 * FAQ — brief §5.
 *
 * Acordeón sobre `<details>`/`<summary>`: el navegador ya trae abrir y
 * cerrar, el foco, el teclado y el anuncio de estado. Un acordeón a mano
 * con `useState` costaría JavaScript en el cliente y habría que
 * reimplementar toda esa accesibilidad para quedar igual.
 *
 * Las respuestas están escritas en voz de marca y marcadas `// REVISAR`
 * en `lib/data.ts`: afirman condiciones de contratación, cancelación y
 * pago, y eso hay que auditarlo antes de publicar.
 */
export function Faq() {
  return (
    <section
      aria-labelledby="faq-titulo"
      className="mx-auto w-full max-w-page px-5 py-16 md:px-10 md:py-32"
    >
      <h2
        id="faq-titulo"
        className="text-titulo text-balance md:text-titulo-lg"
      >
        {faq.titulo}
      </h2>

      <div className="mt-12 max-w-prosa border-t border-line">
        {faq.preguntas.map(({ pregunta, respuesta }) => (
          <details key={pregunta} className="group border-b border-line">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-subtitulo font-semibold [&::-webkit-details-marker]:hidden">
              {pregunta}
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 shrink-0 text-ink-soft transition-transform duration-150 group-open:rotate-180"
              />
            </summary>
            <p className="max-w-prosa pb-6 text-cuerpo text-ink-soft md:text-cuerpo-lg">
              {respuesta}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
