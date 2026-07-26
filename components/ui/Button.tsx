import type { ButtonHTMLAttributes } from "react";

/** El hover solo cambia el fondo, 150ms. Nunca hay gradientes. */
const VARIANTES = {
  primario: "bg-blue-500 text-white hover:bg-blue-600",
  chip: "bg-surface text-ink-soft hover:bg-blue-50 border border-line",
  opcion: "bg-blue-50 text-blue-700 hover:bg-blue-100",
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
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 text-cuerpo transition-colors duration-150 disabled:opacity-50 ${VARIANTES[variante]} ${className}`}
      {...props}
    />
  );
}
