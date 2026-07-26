"use client";

import { Bike, Flower2, House, PawPrint, Plane, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useEntrada } from "@/components/ui/useEntrada";
import { proteger } from "@/lib/data";
import type { CategoriaId } from "@/lib/types";
import type { CSSProperties } from "react";

/* El icono no es copy, así que no vive en data.ts: allí queda la
   categoría y aquí se resuelve el dibujo. */
const ICONOS: Record<CategoriaId, LucideIcon> = {
  "vida-familia": Users,
  exequial: Flower2,
  movilidad: Bike,
  hogar: House,
  mascotas: PawPrint,
  viajes: Plane,
};

type Props = {
  /** Escribe la frase en el input del hero. No navega a ninguna ruta. */
  onElegir: (frase: string) => void;
};

/**
 * Qué puedes proteger — brief §5.
 *
 * Seis tarjetas que **no navegan**: escriben en el hero y suben el foco
 * hasta él. Una sola entrada en toda la página, siempre la misma.
 *
 * Sin precios y sin coberturas: aquí solo se dice para quién es cada
 * categoría. Lo que cubre y lo que cuesta es del asesor.
 *
 * Aquí vive el ancla `#proteger` a la que apuntan el nav y el footer.
 */
export function Proteger({ onElegir }: Props) {
  const { ref, entra } = useEntrada();

  return (
    <section
      ref={ref}
      data-entra={entra}
      id="proteger"
      aria-labelledby="proteger-titulo"
      className="mx-auto w-full max-w-page px-5 py-16 md:px-10 md:py-32"
    >
      <h2
        id="proteger-titulo"
        className="entra text-titulo text-balance md:text-titulo-lg"
      >
        {proteger.titulo}
      </h2>
      <p className="entra mt-4 max-w-prosa text-cuerpo text-ink-soft md:text-cuerpo-lg">
        {proteger.apoyo}
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proteger.tarjetas.map((tarjeta, i) => {
          const Icono = ICONOS[tarjeta.categoria];

          return (
            /* Escalonado de 60ms: la rejilla se arma de una en una. */
            <li
              key={tarjeta.categoria}
              style={{ "--entra-retraso": `${i * 60}ms` } as CSSProperties}
              className="entra"
            >
              {/* Blanca sobre lienzo y con borde, pero sin sombra: las
                  tres cosas a la vez están prohibidas.

                  El hover sube 4px y pasa el borde a blue-500, nada más.
                  Quien comunica el estado es el borde; el desplazamiento
                  solo acompaña. Sin sombra nueva, sin escala, sin girar
                  el icono.

                  La transición nombra `translate` y no `transform`:
                  Tailwind v4 compila `-translate-y-1` a la propiedad
                  `translate`, y apuntando a `transform` no animaría nada.

                  El `hover:` de Tailwind v4 ya viene dentro de
                  `@media (hover:hover)`, así que en Safari móvil no se
                  aplica y la tarjeta no se queda con el borde azul
                  pegado después de tocarla. */}
              <button
                type="button"
                onClick={() => onElegir(tarjeta.precarga)}
                className="flex h-full w-full flex-col items-start rounded-lg border border-line bg-surface p-6 text-left transition-[translate,border-color] duration-150 ease-marca hover:-translate-y-1 hover:border-blue-500"
              >
                <Icono
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-6 text-blue-500"
                />
                {/* font-semibold iguala el peso del h2: con el 500 que
                    trae el token serían tres pesos en la sección. */}
                <h3 className="mt-4 text-subtitulo font-semibold md:text-subtitulo-lg">
                  {tarjeta.nombre}
                </h3>
                <p className="mt-2 text-cuerpo text-ink-soft">
                  {tarjeta.frase}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
