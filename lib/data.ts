import type { ColumnaFooter, EnlaceNav } from "./types";

/**
 * Todo el copy del prototipo vive aquí. Nada de texto hardcodeado en JSX.
 * Contenido real tomado de docs/brief.md §3 y docs/marca.md §6.
 */

export const sitio = {
  nombre: "Seguros Colsubsidio",
  titulo: "Seguros Colsubsidio — quedas asegurado en 3 minutos",
  descripcion:
    "Cuéntanos qué quieres proteger y en 3 minutos quedas asegurado. Sin llamadas, sin asesor.",
} as const;

/** Los anchors apuntan a secciones que llegan en etapas siguientes.
 *  Un anchor sin destino no navega; nunca produce un 404 en el demo. */
export const navegacion: EnlaceNav[] = [
  { etiqueta: "Seguros", href: "#proteger" },
  { etiqueta: "Mis pólizas", href: "#poliza" },
];

export const marca = {
  logo: {
    src: "/brand/logo-colsubsidio.svg",
    alt: "Colsubsidio",
    ancho: 181,
    alto: 36,
  },
  sello: {
    src: "/brand/vigilado-supersubsidio.png",
    alt: "Vigilado Supersubsidio",
    ancho: 769,
    alto: 119,
  },
  hackathon: {
    src: "/brand/30x-ink.svg",
    alt: "30X",
    ancho: 1080,
    alto: 371,
  },
} as const;

export const contacto = {
  lineaNacional: {
    etiqueta: "Línea nacional 01 8000 947 900",
    tel: "tel:+5718000947900",
  },
  bogota: {
    etiqueta: "Bogotá +57 601 745 79 00",
    tel: "tel:+576017457900",
  },
  asistencia: "Asistencia 24/7",
} as const;

export const footer = {
  columnas: [
    {
      titulo: "Seguros",
      items: [
        { etiqueta: "Vida y familia", href: "#proteger" },
        { etiqueta: "Exequial", href: "#proteger" },
        { etiqueta: "Movilidad", href: "#proteger" },
        { etiqueta: "Hogar", href: "#proteger" },
        { etiqueta: "Mascotas", href: "#proteger" },
        { etiqueta: "Viajes", href: "#proteger" },
      ],
    },
    {
      titulo: "Ayuda",
      items: [
        {
          etiqueta: contacto.lineaNacional.etiqueta,
          href: contacto.lineaNacional.tel,
        },
        { etiqueta: contacto.bogota.etiqueta, href: contacto.bogota.tel },
        { etiqueta: contacto.asistencia },
      ],
    },
    {
      // Sin enlaces: no inventamos URLs de legales.
      titulo: "Legales",
      items: [{ etiqueta: "Tratamiento de datos" }, { etiqueta: "PQRS" }],
    },
  ] satisfies ColumnaFooter[],

  vigilancia: {
    titulo: "Vigilancia",
    /** Colsubsidio es caja de compensación: la vigila Supersubsidio.
     *  Nunca la superintendencia que vigila a las aseguradoras. */
    nota: "Colsubsidio es una caja de compensación familiar.",
  },

  disclaimer:
    "Prototipo desarrollado para la Hackathon Colsubsidio × 30X. No constituye una oferta comercial ni un contrato de seguro.",
} as const;
