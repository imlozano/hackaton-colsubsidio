/**
 * Composición de la ilustración del hero.
 *
 * Es la única excepción a la prohibición de ilustraciones del proyecto
 * — ver `CLAUDE.md` → Prohibido → EXCEPCIÓN, y `docs/brief.md` §4.
 * Estos assets no son identidad de marca de Colsubsidio: son decoración
 * de este prototipo y viven solo aquí y en `components/hero/`.
 *
 * Todo va en porcentaje del escenario, nunca en píxeles. El escenario
 * tiene aspect-ratio fijo, así que la escena entera escala con él y no
 * hay un solo valor que recalcular por breakpoint.
 */

export type HeroAssetConfig = {
  id: string;
  src: string;
  group: "background" | "foreground";
  /** Borde izquierdo, en % del ancho del contenedor. */
  x: number;
  /** Borde superior, en % del alto del contenedor. */
  y: number;
  /** Ancho del asset, en % del ancho del contenedor. La altura va en auto. */
  width: number;
  /** Grados. Positivo = horario. */
  rotation?: number;
  scale?: number;
  /** Opacidad final. Es lo que separa los planos: el fondo se atenúa y
   *  el primer plano queda a 1. Por defecto 1. */
  opacity?: number;
  /** `transform-origin`. Por defecto "center". */
  origin?: string;
  z: number;
  animation?: "none" | "float" | "float-slow" | "pulse" | "drift";
  hideOnMobile?: boolean;
  priority?: boolean;
};

/** Ancho del contenedor cuando deja de crecer. */
export const ANCHO_ESCENARIO = 900;

/**
 * El orden del array es el orden de pintado, de atrás hacia adelante.
 *
 * La escena ya no rodea al texto: vive en su propio contenedor, debajo
 * del contenido. La regla que la gobierna es que **cada pieza toque o
 * solape a otra**. Un asset con aire alrededor está mal colocado: la
 * oclusión es lo único que crea profundidad aquí.
 *
 * En móvil solo queda el núcleo —plataforma, cifras y mascotas— con las
 * mismas reglas de apoyo y oclusión. Todo lo demás lleva `hideOnMobile`.
 */
export const escenaHero: HeroAssetConfig[] = [
  /* z1 — Nubes. Esquinas de arriba, atenuadas, tocando la fila. */
  {
    id: "cloud-left",
    src: "/assets/hero/effects/cloud-left.webp",
    group: "background",
    x: 9,
    y: -3.7,
    width: 9,
    rotation: -4,
    opacity: 0.7,
    z: 1,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "cloud-right",
    src: "/assets/hero/effects/cloud-right.webp",
    group: "background",
    x: 74,
    y: -5.9,
    width: 9,
    rotation: 6,
    opacity: 0.7,
    z: 2,
    animation: "none",
    hideOnMobile: true,
  },

  /* z2 — Flechas. Tres copias giradas que encadenan casa → portátil →
     patinete y bajan al núcleo. Van al fondo, detrás de los objetos. */
  {
    id: "arrow-1",
    src: "/assets/hero/effects/arrow.webp",
    group: "background",
    x: 21,
    y: 10.9,
    width: 20,
    rotation: -18,
    opacity: 0.8,
    z: 3,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "arrow-2",
    src: "/assets/hero/effects/arrow.webp",
    group: "background",
    x: 50,
    y: 10.9,
    width: 20,
    rotation: -18,
    opacity: 0.8,
    z: 4,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "arrow-3",
    src: "/assets/hero/effects/arrow.webp",
    group: "background",
    x: 60,
    y: 30,
    width: 17,
    rotation: 38,
    opacity: 0.8,
    z: 5,
    animation: "none",
    hideOnMobile: true,
  },

  /* z3 — Fila de fondo. Escala y opacidad por debajo del primer plano:
     es lo que la manda hacia atrás sin recurrir a ningún desenfoque. */
  {
    id: "house",
    src: "/assets/hero/objects/house.webp",
    group: "background",
    x: 14,
    y: 7.5,
    width: 15,
    scale: 0.92,
    opacity: 0.92,
    z: 6,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "laptop",
    src: "/assets/hero/objects/laptop.webp",
    group: "background",
    x: 40,
    y: 7.5,
    width: 14,
    scale: 0.92,
    opacity: 0.92,
    z: 7,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "scooter",
    src: "/assets/hero/objects/scooter.webp",
    group: "background",
    x: 66,
    y: 9.8,
    width: 14,
    scale: 0.92,
    opacity: 0.92,
    z: 8,
    animation: "none",
    hideOnMobile: true,
  },

  /* z4 — La plataforma. Centrada, apoyada abajo y sangrando por debajo
     del borde: el suelo continúa fuera de cuadro. */
  {
    id: "platform",
    src: "/assets/hero/objects/platform.webp",
    group: "background",
    x: 26,
    y: 62.6,
    width: 48,
    z: 9,
    animation: "none",
  },

  /* z5 — El 24/7, apoyado sobre el cojín. La base de cada cifra se mete
     dentro de la superficie; ninguna queda al aire. Sin `rotation`: con
     transform el z queda encerrado en el envoltorio. */
  {
    id: "number-2",
    src: "/assets/hero/numbers/number-2.webp",
    group: "foreground",
    x: 32.2,
    y: 58.1,
    width: 11,
    z: 10,
    animation: "none",
  },
  {
    id: "number-4",
    src: "/assets/hero/numbers/number-4.webp",
    group: "foreground",
    x: 40.2,
    y: 58.1,
    width: 11,
    z: 11,
    animation: "none",
  },
  {
    id: "slash",
    src: "/assets/hero/numbers/slash.webp",
    group: "foreground",
    x: 48.2,
    y: 58.1,
    width: 11,
    z: 12,
    animation: "none",
  },
  {
    id: "number-7",
    src: "/assets/hero/numbers/number-7.webp",
    group: "foreground",
    x: 56.2,
    y: 58.1,
    width: 11,
    z: 13,
    animation: "none",
  },

  /* z6 — Las mascotas se sientan encima del 2 y del 7 y tapan parte de
     su borde superior. Esa oclusión es lo que da la profundidad: si no
     se solapan, la escena se deshace en piezas sueltas. */
  {
    id: "mascot-left",
    src: "/assets/hero/characters/mascot-left.webp",
    group: "foreground",
    x: 31,
    y: 43.5,
    width: 14,
    z: 14,
    animation: "none",
  },
  {
    id: "mascot-right",
    src: "/assets/hero/characters/mascot-right.webp",
    group: "foreground",
    x: 55,
    y: 43.5,
    width: 14,
    z: 15,
    animation: "none",
  },

  /* z7 — Destellos en los huecos que quedan entre las flechas. */
  {
    id: "sparkle-1",
    src: "/assets/hero/effects/sparkle-1.webp",
    group: "background",
    x: 34,
    y: 32.3,
    width: 4,
    opacity: 0.8,
    z: 16,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "sparkle-2",
    src: "/assets/hero/effects/sparkle-2.webp",
    group: "background",
    x: 62,
    y: 26.7,
    width: 4,
    opacity: 0.8,
    z: 17,
    animation: "none",
    hideOnMobile: true,
  },
];
