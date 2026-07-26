import Image from "next/image";
import Link from "next/link";

import { footer, marca } from "@/lib/data";
import type { ItemFooter } from "@/lib/types";

/* El área táctil se mantiene en 44px con padding, pero el -my-1 recorta
   8px del espacio visible por fila para que la lista no se lea suelta. */
const CLASES_ITEM =
  "-my-1 inline-flex min-h-11 items-center rounded-xs py-2 text-cuerpo text-blue-200";

function ContenidoItem({ item }: { item: ItemFooter }) {
  if (!item.href) {
    // Sin URL real, el ítem no navega. No inventamos destinos.
    return <span className={CLASES_ITEM}>{item.etiqueta}</span>;
  }

  const clases = `${CLASES_ITEM} transition-colors duration-150 hover:text-white`;
  const externo = item.href.startsWith("http");

  // next/link es solo para navegación interna: ni tel: ni colsubsidio.com
  // son rutas de esta app.
  if (externo || item.href.startsWith("tel:")) {
    return (
      <a
        href={item.href}
        className={clases}
        {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {item.etiqueta}
      </a>
    );
  }

  return (
    <Link href={item.href} className={clases}>
      {item.etiqueta}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="mx-auto w-full max-w-page px-5 py-16 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {footer.columnas.map((columna) => (
            <div key={columna.titulo}>
              <h2 className="font-mono text-eyebrow tracking-eyebrow text-white uppercase">
                {columna.titulo}
              </h2>
              <ul className="mt-3 flex flex-col">
                {columna.items.map((item) => (
                  <li key={item.etiqueta}>
                    <ContenidoItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-mono text-eyebrow tracking-eyebrow text-white uppercase">
              {footer.vigilancia.titulo}
            </h2>
            {/* Los dos sellos, como en el footer real de Colsubsidio.
                Son las variantes blancas oficiales: se leen sobre el azul
                sin recolorear ni redibujar nada. */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
              {marca.sellos.map((sello) => (
                <Image
                  key={sello.alt}
                  src={sello.src}
                  alt={sello.alt}
                  width={sello.ancho}
                  height={sello.alto}
                  className={`${sello.clase} w-auto`}
                />
              ))}
            </div>
            <p className="mt-3 max-w-prosa text-cuerpo text-blue-200">
              {footer.vigilancia.nota}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-blue-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-prosa text-cuerpo text-blue-200">
            {footer.disclaimer}
          </p>
          {/* 30X acompaña al disclaimer del prototipo, no al logo de
              Colsubsidio: el producto no es co-branded. */}
          <Image
            src={marca.hackathon.src}
            alt={marca.hackathon.alt}
            width={marca.hackathon.ancho}
            height={marca.hackathon.alto}
            className="h-4 w-auto shrink-0 brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
}
