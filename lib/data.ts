import type {
  ColumnaFooter,
  EnlaceNav,
  Paso,
  PasoComoFunciona,
  PreguntaFaq,
  TarjetaProteger,
} from "./types";

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
   Qué puedes proteger — brief §5
   --------------------------------------------------------------- */

export const proteger = {
  // REVISAR — titular de sección, no viene de docs/
  titulo: "Qué puedes proteger.",
  /** Explica que las tarjetas no navegan: una sola entrada, siempre. */
  // REVISAR
  apoyo:
    "Toca la que te suene. Te llevamos arriba con la frase ya escrita y desde ahí la cambias si quieres.",

  /** Sin precios y sin coberturas: aquí solo se dice para quién es cada
   *  una. Lo que cubre y lo que cuesta lo resuelve el asesor. */
  tarjetas: [
    {
      categoria: "vida-familia",
      nombre: "Vida y familia",
      // REVISAR
      frase: "Para que, si algo te pasa, los tuyos no queden a la deriva.",
      precarga: "Quiero proteger a mi familia",
    },
    {
      categoria: "exequial",
      nombre: "Exequial",
      // REVISAR
      frase: "Para que el momento más difícil no llegue además con cuentas.",
      precarga: "Quiero un plan exequial para mis papás",
    },
    {
      categoria: "movilidad",
      nombre: "Movilidad",
      // REVISAR
      frase: "Para lo que te mueve a diario: moto, carro, bici o patineta.",
      precarga: "Me muevo en moto todos los días",
    },
    {
      categoria: "hogar",
      nombre: "Hogar",
      // REVISAR
      frase: "Para el lugar al que vuelves, sea propio o arrendado.",
      precarga: "Vivo en un apartamento arrendado",
    },
    {
      categoria: "mascotas",
      nombre: "Mascotas",
      // REVISAR
      frase: "Para que llevarlo al veterinario no sea una decisión de plata.",
      precarga: "Tengo un perro y quiero cuidarlo",
    },
    {
      categoria: "viajes",
      nombre: "Viajes",
      // REVISAR
      frase: "Para salir del país sin dejar nada al azar.",
      precarga: "Salgo de viaje pronto",
    },
  ] satisfies TarjetaProteger[],
} as const;

/* ---------------------------------------------------------------
   Cómo funciona — brief §5
   --------------------------------------------------------------- */

export const comoFunciona = {
  // REVISAR — titular de sección, no viene de docs/
  titulo: "Cómo funciona.",

  /** El sujeto es explícito a propósito. Esta landing no cotiza, no
   *  cobra y no emite pólizas: quien lo hace es el asesor, y el copy
   *  tiene que decirlo o promete algo que la página no cumple. */
  pasos: [
    {
      titulo: "Cuéntanos tu situación.",
      detalle:
        "En tus palabras. No necesitas conocer términos de seguros.",
    },
    {
      titulo: "Tu asesor te muestra lo que te sirve.",
      detalle:
        "Llega sabiendo qué quieres proteger, y te explica por qué te lo recomienda.",
    },
    {
      titulo: "Quedas asegurado.",
      detalle: "Él resuelve la cotización, el pago y tu póliza.",
    },
  ] satisfies PasoComoFunciona[],

  // REVISAR — encabezado de la barra ilustrada
  recorrido: "Lo que pasa después de la entrega",
} as const;

/* ---------------------------------------------------------------
   FAQ — brief §5
   --------------------------------------------------------------- */

export const faq = {
  // REVISAR — titular de sección, no viene de docs/
  titulo: "Preguntas que siempre nos hacen.",

  /** Las cinco preguntas salen del brief §5. Las respuestas las escribí
   *  yo en voz de marca: hay que auditarlas antes de publicar, sobre
   *  todo las que afirman algo contractual. */
  preguntas: [
    {
      pregunta: "¿Necesito ser afiliado a Colsubsidio?",
      // REVISAR — afirma condiciones de contratación
      respuesta:
        "No. Estos seguros están abiertos a cualquiera. Si además eres afiliado, díselo a tu asesor cuando hables con él.",
    },
    {
      pregunta: "¿Quién responde si tengo un siniestro?",
      // REVISAR — afirma quién asume el amparo
      respuesta:
        "La aseguradora que emitió tu póliza: Bolívar, Chubb o BMI, según el producto. Colsubsidio te acompaña, pero el nombre de quien responde está escrito en tu póliza.",
    },
    {
      pregunta: "¿Puedo cancelar cuando quiera?",
      // REVISAR — afirma condiciones de cancelación y devolución
      respuesta:
        "Sí, avisando a la aseguradora. Pregúntale a tu asesor cómo queda lo que ya pagaste antes de cancelar.",
    },
    {
      pregunta: "¿Cómo pago?",
      // REVISAR — afirma medios de pago
      respuesta:
        "Con el medio que te ofrezca tu asesor al momento de cerrar. En esta página no se paga nada.",
    },
    {
      pregunta: "¿Esto reemplaza a un asesor?",
      respuesta:
        "No, te lleva a uno. Esta página solo entiende en una frase qué quieres proteger, para que tu asesor no empiece de cero. Quien te recomienda y te asegura es él.",
    },
  ] satisfies PreguntaFaq[],
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
  /** El 01 8000 se marca tal cual desde Colombia: el 01 es prefijo de
   *  larga distancia nacional, no cabe en E.164. Anteponerle +57 1 le
   *  mete el viejo indicativo de Bogotá y el número deja de enrutar.
   *  Bogotá sí va en E.164 porque es un fijo de 10 dígitos real. */
  lineaNacional: {
    etiqueta: "Línea nacional 01 8000 947 900",
    tel: "tel:018000947900",
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
