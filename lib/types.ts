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

/* ---------------------------------------------------------------
   Recorrido — ilustración estática dentro de "Cómo funciona".
   Lo que pasa después de la entrega lo hace el agente de voz.
   --------------------------------------------------------------- */

export type PasoId =
  | "diagnostico"
  | "recomendacion"
  | "cotizacion"
  | "datos"
  | "pago"
  | "poliza";

export type Paso = {
  id: PasoId;
  nombre: string;
};

/* ---------------------------------------------------------------
   Clasificación por palabras clave — lib/intencion.ts
   --------------------------------------------------------------- */

export type CategoriaId =
  | "movilidad"
  | "vida-familia"
  | "mascotas"
  | "viajes"
  | "hogar"
  | "exequial";

export type Coincidencia = {
  /** La palabra buscada, ya normalizada: minúsculas y sin tildes. */
  termino: string;
  categoria: CategoriaId;
  /** Cómo se nombra en el reconocimiento: "tu moto", "a tu bebé". */
  sujeto: string;
};
