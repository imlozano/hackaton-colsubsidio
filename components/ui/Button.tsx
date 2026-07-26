import type { ButtonHTMLAttributes } from "react";

/** El hover solo cambia el fondo, 150ms. Nunca hay gradientes. */
const VARIANTES = {
  primario: "bg-blue-500 text-white hover:bg-blue-600 px-6",
  /* El padding lateral se aprieta en móvil. Con 24px los cinco chips
     caían en escalera 1/2/1/1: los dos primeros miden 197 y 149px y no
     entran juntos en los 350px útiles de una pantalla de 390. Con 12px
     caben de dos en dos y el bloque queda 2/2/1. */
  chip: "bg-surface text-ink-soft hover:bg-blue-50 border border-line px-3 md:px-6",
  opcion: "bg-blue-50 text-blue-700 hover:bg-blue-100 px-6",
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: keyof typeof VARIANTES;
};

export function Button({
  variante = "primario",
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-full text-cuerpo transition-colors duration-150 ease-marca disabled:opacity-50 ${VARIANTES[variante]} ${className}`}
      {...props}
    />
  );
}
