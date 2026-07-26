import { NODO_RAIZ, conversacion } from "./conversacion";
import type { PasoId, RespuestaAsesor } from "./types";

/**
 * La única función simulada del prototipo. No hay backend y no debe
 * haberlo: si algún día aparece uno real, se cambia esta función y nada
 * más. Ningún otro archivo tiene lógica simulada.
 */

const RETRASO_MIN = 600;
const RETRASO_MAX = 900;

const esperar = (ms: number) =>
  new Promise((resolver) => setTimeout(resolver, ms));

/**
 * @param entrada  Lo que escribió o eligió el usuario.
 * @param desde    Paso en el que venía. `null` arranca el guion.
 */
export async function consultarAsesor(
  entrada: string,
  desde: PasoId | null = null,
): Promise<RespuestaAsesor> {
  await esperar(RETRASO_MIN + Math.random() * (RETRASO_MAX - RETRASO_MIN));

  const guion = conversacion[desde ?? NODO_RAIZ];

  // El árbol todavía no llega hasta aquí: el resto del guion es Etapa 4.
  // Se deja como TODO visible en vez de rellenar con texto plausible.
  if (!guion) {
    return {
      mensaje: `TODO — falta el guion del turno siguiente (Etapa 4). Recibí: "${entrada}"`,
      opciones: [],
      productoRecomendado: null,
      alternativas: [],
      prima: null,
      coberturas: [],
      siguientePaso: desde ?? "diagnostico",
    };
  }

  return {
    mensaje: guion.mensaje,
    opciones: guion.opciones,
    productoRecomendado: null,
    alternativas: [],
    prima: null,
    coberturas: [],
    siguientePaso: guion.siguientePaso,
  };
}
