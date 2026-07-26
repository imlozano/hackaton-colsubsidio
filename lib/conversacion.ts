import type { NodoConversacion } from "./types";

/**
 * Guion del asesor, como árbol de decisión. Aquí no hay lógica: solo el
 * texto y hacia dónde lleva cada nodo. Quien lo recorre es lib/asesor.ts.
 *
 * Reglas de voz del guion:
 * - Le devuelve al usuario lo que dijo, con sus palabras, antes de preguntar.
 * - Una sola pregunta por turno. Nunca dos.
 * - Sin jerga. Si aparece "deducible" o "cobertura", se explica al lado.
 * - Frases cortas. Sin entusiasmo de bot. Sin emojis.
 *
 * Etapa 2 solo cubre el nodo raíz. La Etapa 4 cuelga el resto del árbol.
 */

export const NODO_RAIZ = "raiz";

export const conversacion: Record<string, NodoConversacion> = {
  [NODO_RAIZ]: {
    mensaje:
      "Listo. Antes de mostrarte precios necesito entender una cosa: ¿hay alguien que dependa económicamente de ti?",
    opciones: ["Sí, totalmente", "En parte", "No, solo yo"],
    siguientePaso: "diagnostico",
  },
};
