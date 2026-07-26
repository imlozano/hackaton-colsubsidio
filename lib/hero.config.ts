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
 *
 * **Toda la escena es de desktop.** A 390px el escenario mide 219px de
 * alto: las mascotas quedaban en 43px y las cifras del 24/7 en 15px, y
 * eso no se lee como ilustración sino como iconos sueltos pegados al
 * borde. En móvil el hero se queda solo con el contenido, que es más
 * limpio que una ilustración ilegible. Por eso los catorce llevan
 * `hideOnMobile`.
 */
export const escenaHero: HeroAssetConfig[] = [
  /* --- Fondo. Las nubes son lo más pequeño y lo más alto: es lo que
     da la sensación de lejanía sin recurrir a ningún efecto. --- */
  {
    id: "cloud-left",
    src: "/assets/hero/effects/cloud-left.webp",
    group: "background",
    x: 1,
    y: -5,
    width: 12,
    rotation: -4,
    z: 1,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "cloud-right",
    src: "/assets/hero/effects/cloud-right.webp",
    group: "background",
    x: 87,
    y: -7,
    width: 12,
    /* Es el mismo dibujo que cloud-left: sin un giro distinto se lee
       como la misma nube pegada dos veces. */
    rotation: 6,
    z: 2,
    animation: "none",
    hideOnMobile: true,
  },

  /* --- La plataforma es base, no protagonista. ---
     Deliberadamente pequeña: sostiene al 24/7 y nada más. El encuadre
     arranca por encima de la línea de vigilancia, pero ahí arriba está
     vacío —la tinta del cojín empieza al 28% del marco—, así que el
     cojín entero cae en la banda libre y deja 37px de aire entre el
     texto y la ilustración. Sigue siendo más ancho que el 24/7. */
  {
    id: "platform",
    src: "/assets/hero/objects/platform.webp",
    group: "background",
    x: 42.2,
    y: 86.8,
    width: 15.5,
    z: 3,
    animation: "none",
    priority: true,
    hideOnMobile: true,
  },

  /* --- Objetos. Entran hacia el centro en vez de pegarse al borde:
     encuadran el titular y el input en lugar de tirar de la mirada
     hacia fuera. El contenido ocupa del 21.9% al 78.1%. --- */
  {
    id: "house",
    src: "/assets/hero/objects/house.webp",
    group: "background",
    x: 2,
    y: 33,
    width: 19,
    z: 4,
    animation: "none",
    priority: true,
    hideOnMobile: true,
  },
  {
    id: "laptop",
    src: "/assets/hero/objects/laptop.webp",
    group: "background",
    x: 79,
    y: 29,
    width: 18,
    z: 5,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "scooter",
    src: "/assets/hero/objects/scooter.webp",
    group: "background",
    x: 80,
    y: 63,
    width: 19,
    z: 6,
    animation: "none",
    hideOnMobile: true,
  },

  /* --- Efectos. Pequeños y a distinta altura, para romper la simetría
     de espejo entre los dos flancos. --- */
  {
    id: "sparkle-1",
    src: "/assets/hero/effects/sparkle-1.webp",
    group: "background",
    x: 16,
    y: 24,
    width: 6,
    z: 7,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "sparkle-2",
    src: "/assets/hero/effects/sparkle-2.webp",
    group: "background",
    x: 79,
    y: 17,
    width: 6,
    z: 8,
    animation: "none",
    hideOnMobile: true,
  },

  /* La flecha se fue. Solo servía para llevar la mirada al 24/7, y el
     24/7 es ahora lo último de la jerarquía: subrayarlo con una flecha
     era justo lo contrario de lo que tiene que pasar. Quitarla además
     despeja la banda inferior. El asset sigue en public/assets/hero. */

  /* --- El 24/7 cierra la jerarquía, detrás de H1, input y CTA. Va al
     tamaño de un sello, no de un titular: apoya el mensaje de asistencia
     sin disputarle la atención al contenido. Paso de 2.7% entre marcos,
     centrado en el 50%.
     Ninguna lleva `rotation`, y no es un descuido: con transform el
     envoltorio crea contexto de apilamiento, el z de la cifra queda
     encerrado dentro y la plataforma (z:3, sin transform) le pasa por
     encima. Si le pones giro a una cifra, desaparece tras el cojín. */
  {
    id: "number-2",
    src: "/assets/hero/numbers/number-2.webp",
    group: "foreground",
    x: 44,
    y: 85.3,
    width: 3.8,
    z: 10,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "number-4",
    src: "/assets/hero/numbers/number-4.webp",
    group: "foreground",
    x: 46.7,
    y: 85.7,
    width: 3.8,
    z: 11,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "slash",
    src: "/assets/hero/numbers/slash.webp",
    group: "foreground",
    x: 49.4,
    y: 85.3,
    width: 3.8,
    z: 12,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "number-7",
    src: "/assets/hero/numbers/number-7.webp",
    group: "foreground",
    x: 52.1,
    y: 85.7,
    width: 3.8,
    z: 13,
    animation: "none",
    hideOnMobile: true,
  },

  /* --- Las mascotas se meten en la escena en vez de sentarse en las
     esquinas: entran hacia el centro, se emparejan con la casa y con el
     patinete, y van a distinta altura para que no lean como un espejo. */
  {
    id: "mascot-left",
    src: "/assets/hero/characters/mascot-left.webp",
    group: "foreground",
    x: 8,
    y: 73,
    width: 11,
    z: 14,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "mascot-right",
    src: "/assets/hero/characters/mascot-right.webp",
    group: "foreground",
    x: 79,
    y: 74,
    width: 11,
    z: 15,
    animation: "none",
    hideOnMobile: true,
  },
];
