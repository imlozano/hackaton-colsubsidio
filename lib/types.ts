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
   Asesor conversacional
   --------------------------------------------------------------- */

/** Los seis pasos del recorrido, en orden. */
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

/** Un nodo del guion en lib/conversacion.ts. */
export type NodoConversacion = {
  mensaje: string;
  opciones: string[];
  siguientePaso: PasoId;
};

/** Forma de respuesta fijada por el brief §8. En la Etapa 2 solo se
 *  ejercita el diagnóstico, así que producto, prima y coberturas viajan
 *  vacíos; la Etapa 4 los llena y ahí se afinan sus tipos. */
export type RespuestaAsesor = {
  mensaje: string;
  opciones: string[];
  productoRecomendado: string | null;
  alternativas: string[];
  prima: number | null;
  coberturas: string[];
  siguientePaso: PasoId;
};

export type Mensaje = {
  id: string;
  autor: "usuario" | "asesor";
  texto: string;
  opciones?: string[];
};
