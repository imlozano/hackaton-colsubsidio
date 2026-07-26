import { pasos, progreso } from "@/lib/data";
import type { PasoId } from "@/lib/types";

/**
 * Seis pasos. El activo se marca con el amarillo de marca — y es el único
 * amarillo del viewport, que es justo la proporción que pide el 60/30/10.
 * En un flujo financiero, saber cuánto falta es lo que reduce el abandono.
 */
export function ProgressBar({ pasoActivo }: { pasoActivo: PasoId }) {
  const indice = Math.max(
    0,
    pasos.findIndex((paso) => paso.id === pasoActivo),
  );

  const etiqueta = progreso.plantilla
    .replace("$n", String(indice + 1))
    .replace("$total", String(pasos.length));

  return (
    <nav aria-label={progreso.etiqueta} className="w-full">
      <ol className="flex w-full gap-1">
        {pasos.map((paso, i) => (
          <li
            key={paso.id}
            className="flex-1"
            aria-current={i === indice ? "step" : undefined}
          >
            <span className="sr-only">{paso.nombre}</span>
            <span
              aria-hidden="true"
              className={`block h-1 rounded-xs ${
                i === indice
                  ? "bg-yellow-500"
                  : i < indice
                    ? "bg-blue-500"
                    : "bg-line"
              }`}
            />
          </li>
        ))}
      </ol>

      <p
        aria-hidden="true"
        className="mt-3 font-mono text-eyebrow tracking-eyebrow text-ink-soft uppercase"
      >
        <span className="tabular-nums">{etiqueta}</span> ·{" "}
        {pasos[indice].nombre}
      </p>
    </nav>
  );
}
