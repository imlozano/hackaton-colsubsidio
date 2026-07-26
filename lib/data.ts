import type { ColumnaFooter, EnlaceNav, Paso } from "./types";

/**
 * Todo el copy del prototipo vive aquí. Nada de texto hardcodeado en JSX.
 * Contenido real tomado de docs/brief.md §3 y docs/marca.md §6.
 */

export const sitio = {
  nombre: "Seguros Colsubsidio",
  titulo: "Seguros Colsubsidio — quedas asegurado en 3 minutos",
  descripcion:
    "Cuéntanos qué quieres proteger y en 3 minutos quedas asegurado. Sin llamadas, sin papeleo.",
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
  /** Variantes blancas, hechas para fondo oscuro: sobre el footer
   *  blue-950 se leen sin recolorear nada. */
  sellos: [
    {
      src: "/brand/vigilado-supersubsidio.svg",
      alt: "Vigilado Supersubsidio",
      ancho: 152,
      alto: 23,
      clase: "h-4",
    },
    {
      src: "/brand/vigilado-supersalud-blanco.svg",
      alt: "Vigilado Supersalud",
      ancho: 492,
      alto: 153,
      clase: "h-8",
    },
  ],
  hackathon: {
    src: "/brand/30x-ink.svg",
    alt: "30X",
    ancho: 1080,
    alto: 371,
  },
} as const;

/* ---------------------------------------------------------------
   Hero — brief §4
   --------------------------------------------------------------- */

export const hero = {
  /** Dos líneas, terminadas en punto: es un tic de la marca. */
  titulo: ["No necesitas saber", "qué seguro necesitas."],
  subtitulo:
    "Cuéntanos qué quieres proteger y en 3 minutos quedas asegurado. Sin llamadas, sin papeleo.",

  /** Rotan cada 3.5s escribiéndose solas. La primera es del brief §4;
   *  el resto salen de las situaciones de vida documentadas. */
  placeholders: [
    "Tengo moto y vivo con mi mamá…",
    "Acabo de tener un bebé y no sé por dónde empezar…",
    "Viajo el otro mes y nunca he comprado seguro…",
    "Vivo solo con mi perro en un apartamento arrendado…",
  ],

  // REVISAR — microcopy de interfaz, no viene de docs/
  etiquetaEntrada: "Cuéntanos qué quieres proteger",
  // REVISAR
  etiquetaEnviar: "Enviar lo que quiero proteger",
  // REVISAR
  etiquetaReconocimiento: "Lo que entendimos",

  /** El reconocimiento no recomienda producto ni menciona precios:
   *  solo confirma que se entendió, y de ahí se entrega al agente. */
  // REVISAR
  reconocimiento: "Entendí que quieres proteger $sujeto.",
  // REVISAR — cuando no se reconoce nada, se continúa igual
  reconocimientoNeutro:
    "No alcancé a identificar qué quieres proteger, pero tu asesor sí puede.",

  /** Situaciones de vida, no categorías de producto. Ese es el punto. */
  chips: [
    "Soy mamá primeriza",
    "Compré moto",
    "Viajo el otro mes",
    "Vivo solo con mi perro",
    "Cuido a mis papás",
  ],

  entrega: {
    // REVISAR
    boton: "Continuar con mi asesor",
    /** Sin NEXT_PUBLIC_URL_PRODUCTO el botón se deshabilita con este
     *  texto. Nunca un enlace roto delante del jurado. */
    // REVISAR
    botonSinDestino: "Tu asesor estará disponible muy pronto",
    // REVISAR
    volver: "Escribir otra cosa",
  },

  confianza: {
    aliados: "Bolívar · Chubb · BMI",
    sellos: "Vigilado Supersubsidio · Vigilado Supersalud",
  },
} as const;

/* ---------------------------------------------------------------
   Banda del tangram — brief §5
   --------------------------------------------------------------- */

export const tangram = {
  // REVISAR — titular y línea de apoyo, no vienen de docs/
  titulo: "Cada pieza protege algo distinto.",
  // REVISAR
  apoyo: "No necesitas todas. Solo las que sostienen tu vida.",
  // REVISAR — texto alternativo de la ilustración
  alt: "Siete piezas de tangram que se ensamblan formando un techo",
} as const;

/** Los seis pasos del recorrido. Ilustración de lo que hace el agente
 *  después de la entrega, no un indicador vivo. */
export const pasos: Paso[] = [
  { id: "diagnostico", nombre: "Diagnóstico" },
  { id: "recomendacion", nombre: "Recomendación" },
  { id: "cotizacion", nombre: "Cotización" },
  { id: "datos", nombre: "Datos" },
  { id: "pago", nombre: "Pago" },
  { id: "poliza", nombre: "Póliza" },
];

export const progreso = {
  // REVISAR — microcopy de interfaz, no viene de docs/
  etiqueta: "Progreso de tu solicitud",
  // REVISAR
  plantilla: "Paso $n de $total",
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
      titulo: "Legales",
      items: [
        {
          etiqueta: "Tratamiento de datos",
          href: "https://www.colsubsidio.com/tratamientos-personales",
        },
        { etiqueta: "PQRS", href: "https://www.colsubsidio.com/pqrs" },
        {
          etiqueta: "Defensor del afiliado",
          href: "https://www.colsubsidio.com/compromiso-con-clientes/defensor-afiliado",
        },
      ],
    },
  ] satisfies ColumnaFooter[],

  vigilancia: {
    titulo: "Vigilancia",
    /** Colsubsidio es caja de compensación y opera servicios de salud:
     *  la vigilan Supersubsidio y Supersalud, las dos. Nunca la
     *  superintendencia que vigila a las aseguradoras. */
    nota: "Colsubsidio es una caja de compensación familiar.",
  },

  disclaimer:
    "Prototipo desarrollado para la Hackathon Colsubsidio × 30X. No constituye una oferta comercial ni un contrato de seguro.",
} as const;
