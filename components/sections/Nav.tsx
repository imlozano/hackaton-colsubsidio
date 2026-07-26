import Image from "next/image";
import Link from "next/link";

import { marca, navegacion } from "@/lib/data";

export function Nav() {
  return (
    <header className="border-b border-line bg-canvas">
      <nav
        aria-label="Principal"
        className="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-5 py-4 md:px-10"
      >
        <Link
          href="/"
          aria-label={`${marca.logo.alt} — inicio`}
          className="flex min-h-11 items-center"
        >
          <Image
            src={marca.logo.src}
            alt={marca.logo.alt}
            width={marca.logo.ancho}
            height={marca.logo.alto}
            priority
            className="h-6 w-auto md:h-8"
          />
        </Link>

        <ul className="flex items-center gap-1 md:gap-2">
          {navegacion.map((enlace) => (
            <li key={enlace.etiqueta}>
              <Link
                href={enlace.href}
                className="inline-flex min-h-11 items-center rounded-xs px-2 font-mono text-eyebrow text-ink-soft transition-colors duration-150 hover:text-ink md:px-3"
              >
                {enlace.etiqueta}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
