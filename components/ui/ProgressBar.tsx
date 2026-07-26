import { pasos, progreso } from "@/lib/data";

/**
 * Los seis pasos del recorrido, como **ilustración estática**.
 *
 * Ya no es un indicador vivo: en el hero prometía un flujo que esta landing
 * no opera. Aquí explica qué hace el agente de voz después de la entrega.
 * Va dentro de "Cómo funciona" (Etapa 3), sobre el bloque amarillo.
 */
export function ProgressBar() {
  return (
    <ol aria-label={progreso.etiqueta} className="w-full">
      {pasos.map((paso, i) => (
        <li key={paso.id} className="flex items-baseline gap-3 py-2">
          <span className="font-mono text-eyebrow tracking-eyebrow text-ink-soft tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-cuerpo text-ink">{paso.nombre}</span>
        </li>
      ))}
    </ol>
  );
}
