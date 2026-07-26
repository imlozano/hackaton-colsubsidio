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
  {
    id: "platform",
    src: "/assets/hero/objects/platform.webp",
    group: "background",
    x: -4,
    y: 66,
    width: 27,
    z: 1,
    animation: "none",
    priority: true,
  },
  {
    id: "house",
    src: "/assets/hero/objects/house.webp",
    group: "background",
    x: -1,
    y: 30,
    width: 21,
    z: 2,
    animation: "none",
    priority: true,
    hideOnMobile: true,
  },
  {
    id: "laptop",
    src: "/assets/hero/objects/laptop.webp",
    group: "background",
    x: 80,
    y: 24,
    width: 20,
    z: 3,
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
    z: 4,
    animation: "none",
    hideOnMobile: true,
  },
  {
    id: "mascot-left",
    src: "/assets/hero/characters/mascot-left.webp",
    group: "foreground",
    x: 2,
    y: 68,
    width: 13,
    z: 5,
    animation: "none",
  },
  {
    id: "mascot-right",
    src: "/assets/hero/characters/mascot-right.webp",
    group: "foreground",
    x: 83,
    y: 74,
    width: 12,
    z: 6,
    animation: "none",
  },
];
