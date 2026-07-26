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
  /** Borde izquierdo, en % del ancho del escenario. */
  x: number;
  /** Borde superior, en % del alto del escenario. */
  y: number;
  /** Ancho del asset, en % del ancho del escenario. La altura va en auto. */
  width: number;
  /** Grados. Positivo = horario. */
  rotation?: number;
  scale?: number;
  /** `transform-origin`. Por defecto "center". */
  origin?: string;
  z: number;
  animation?: "none" | "float" | "float-slow" | "pulse" | "drift";
  hideOnMobile?: boolean;
  priority?: boolean;
};

/** Ancho del escenario cuando deja de crecer. Es `--container-page`. */
export const ANCHO_ESCENARIO = 1280;

/**
 * El orden del array es el orden de pintado.
 *
 * `z` acompaña a ese orden en lugar de contradecirlo: un asset con
 * `rotation` o `scale` crea contexto de apilamiento y su `z-index` deja
 * de competir con el de sus hermanos, así que el orden del array es lo
 * único en lo que se puede confiar siempre. Mantén `z` ascendente.
 *
 * `group` y `animation` todavía no los lee nadie. Están para que la
 * etapa de animaciones no tenga que tocar esta estructura.
 */
export const escenaHero: HeroAssetConfig[] = [
  /* --- Fondo: las nubes abren la escena por arriba, fuera del titular. --- */
  {
    id: "cloud-left",
    src: "/assets/hero/effects/cloud-left.webp",
    group: "background",
    x: 0,
    y: -6,
    width: 15,
    rotation: -4,
    z: 1,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "cloud-right",
    src: "/assets/hero/effects/cloud-right.webp",
    group: "background",
    x: 85,
    y: -8,
    width: 15,
    /* Es el mismo dibujo que cloud-left: sin un giro distinto se lee
       como la misma nube pegada dos veces. */
    rotation: 6,
    z: 2,
    animation: "none",
    hideOnMobile: true,
  },

  /* --- La plataforma es el punto de apoyo de la escena. ---
     El encuadre arranca por encima de la línea de vigilancia, pero ahí
     arriba está vacío: la tinta del cojín empieza al 28% del marco, ya
     por debajo del texto. Entre esa línea y el borde de la sección solo
     hay 128px, así que el ancho está calculado para que el cojín entre
     entero justo en esa banda y siga siendo más ancho que el 24/7. */
  {
    id: "platform",
    src: "/assets/hero/objects/platform.webp",
    group: "background",
    x: 38,
    y: 80,
    width: 24,
    z: 3,
    animation: "none",
    priority: true,
  },

  /* --- Objetos, en los flancos. El contenido ocupa el 21.9%-78.1%. --- */
  {
    id: "house",
    src: "/assets/hero/objects/house.webp",
    group: "background",
    x: -1,
    y: 30,
    width: 21,
    z: 4,
    animation: "none",
    priority: true,
    hideOnMobile: true,
  },
  {
    id: "laptop",
    src: "/assets/hero/objects/laptop.webp",
    group: "background",
    x: 80,
    y: 26,
    width: 20,
    z: 5,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "scooter",
    src: "/assets/hero/objects/scooter.webp",
    group: "background",
    x: 80,
    y: 66,
    width: 21,
    z: 6,
    animation: "none",
    hideOnMobile: true,
  },

  /* --- Efectos: acompañan a los objetos, nunca al texto. --- */
  {
    id: "sparkle-1",
    src: "/assets/hero/effects/sparkle-1.webp",
    group: "background",
    x: 15,
    y: 22,
    width: 8,
    z: 7,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "sparkle-2",
    src: "/assets/hero/effects/sparkle-2.webp",
    group: "background",
    x: 78,
    y: 18,
    width: 8,
    z: 8,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "arrow",
    src: "/assets/hero/effects/arrow.webp",
    group: "background",
    /* Baja de izquierda a derecha y muere apuntando al 24/7. Se queda
       antes del 28%, que es donde empieza la línea de vigilancia. */
    x: 27,
    y: 79,
    width: 12,
    z: 9,
    animation: "none",
    hideOnMobile: true,
  },

  /* --- El 24/7 es el eje central: centrado en el escenario y apoyado
     sobre la plataforma. El paso de 3.9% entre marcos deja las cifras
     juntas sin que se pisen, y el conjunto queda centrado en el 50%.
     Ninguna lleva `rotation`, y no es un descuido: con transform el
     envoltorio crea contexto de apilamiento, el z de la cifra queda
     encerrado dentro y la plataforma (z:3, sin transform) le pasa por
     encima. Si le pones giro a una cifra, desaparece tras el cojín. */
  {
    id: "number-2",
    src: "/assets/hero/numbers/number-2.webp",
    group: "foreground",
    x: 41.2,
    y: 80,
    width: 5.6,
    z: 10,
    animation: "none",
  },
  {
    id: "number-4",
    src: "/assets/hero/numbers/number-4.webp",
    group: "foreground",
    x: 45.1,
    y: 80.4,
    width: 5.6,
    z: 11,
    animation: "none",
  },
  {
    id: "slash",
    src: "/assets/hero/numbers/slash.webp",
    group: "foreground",
    x: 49.0,
    y: 80,
    width: 5.6,
    z: 12,
    animation: "none",
  },
  {
    id: "number-7",
    src: "/assets/hero/numbers/number-7.webp",
    group: "foreground",
    x: 52.9,
    y: 80.4,
    width: 5.6,
    z: 13,
    animation: "none",
  },

  /* --- Las mascotas cierran la escena flanqueando el eje. --- */
  {
    id: "mascot-left",
    src: "/assets/hero/characters/mascot-left.webp",
    group: "foreground",
    x: 2,
    y: 72,
    width: 12,
    z: 14,
    animation: "none",
  },
  {
    id: "mascot-right",
    src: "/assets/hero/characters/mascot-right.webp",
    group: "foreground",
    x: 84,
    y: 72,
    width: 12,
    z: 15,
    animation: "none",
  },
];
