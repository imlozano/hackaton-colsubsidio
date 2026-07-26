/**
 * Tipos del prototipo. Crecen por etapa; aquí solo vive lo que
 * consumen los cimientos (nav, footer, metadata).
 */

export type EnlaceNav = {
  etiqueta: string;
  href: string;
};

/** Un ítem de footer con `href` navega; sin `href` se renderiza como
 *  texto plano. Los legales no llevan enlace a propósito: no inventamos
 *  URLs, y un TODO visible se ve peor en un demo que un texto inerte. */
export type ItemFooter = {
  etiqueta: string;
  href?: string;
};

export type ColumnaFooter = {
  titulo: string;
  items: ItemFooter[];
};
