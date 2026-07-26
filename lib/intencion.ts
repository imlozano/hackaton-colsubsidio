import type { Coincidencia } from "./types";

/**
 * Clasificación por palabras clave. **No es un asesor.**
 *
 * No conversa, no tiene turnos, no recomienda producto y no calcula primas.
 * Lo único que hace es mirar la frase del usuario y decir a qué categoría
 * se parece, para que el agente de voz reciba algo de contexto.
 *
 * Si se queda corta, se amplía la tabla. No se la reemplaza por un modelo.
 */

/** Se compara token por token, sin prefijos: "papás" es exequial y "papá"
 *  es vida y familia, y con coincidencia parcial se confundirían. Por eso
 *  los plurales que importan están listados aparte. */
const PALABRAS: Coincidencia[] = [
  // movilidad
  { termino: "moto", categoria: "movilidad", sujeto: "tu moto" },
  { termino: "motos", categoria: "movilidad", sujeto: "tus motos" },
  { termino: "carro", categoria: "movilidad", sujeto: "tu carro" },
  { termino: "carros", categoria: "movilidad", sujeto: "tus carros" },
  { termino: "bici", categoria: "movilidad", sujeto: "tu bici" },
  { termino: "bicis", categoria: "movilidad", sujeto: "tus bicis" },
  { termino: "bicicleta", categoria: "movilidad", sujeto: "tu bicicleta" },
  { termino: "patineta", categoria: "movilidad", sujeto: "tu patineta" },

  // vida y familia
  { termino: "bebe", categoria: "vida-familia", sujeto: "a tu bebé" },
  { termino: "hijo", categoria: "vida-familia", sujeto: "a tu hijo" },
  { termino: "hija", categoria: "vida-familia", sujeto: "a tu hija" },
  { termino: "hijos", categoria: "vida-familia", sujeto: "a tus hijos" },
  { termino: "hijas", categoria: "vida-familia", sujeto: "a tus hijas" },
  { termino: "familia", categoria: "vida-familia", sujeto: "a tu familia" },
  { termino: "mama", categoria: "vida-familia", sujeto: "a tu mamá" },
  { termino: "papa", categoria: "vida-familia", sujeto: "a tu papá" },

  // mascotas
  { termino: "perro", categoria: "mascotas", sujeto: "a tu perro" },
  { termino: "perros", categoria: "mascotas", sujeto: "a tus perros" },
  { termino: "gato", categoria: "mascotas", sujeto: "a tu gato" },
  { termino: "gatos", categoria: "mascotas", sujeto: "a tus gatos" },
  { termino: "mascota", categoria: "mascotas", sujeto: "a tu mascota" },
  { termino: "mascotas", categoria: "mascotas", sujeto: "a tus mascotas" },

  // viajes
  { termino: "viaje", categoria: "viajes", sujeto: "tu viaje" },
  { termino: "viajes", categoria: "viajes", sujeto: "tus viajes" },
  { termino: "viajo", categoria: "viajes", sujeto: "tu viaje" },
  { termino: "viajar", categoria: "viajes", sujeto: "tu viaje" },
  { termino: "exterior", categoria: "viajes", sujeto: "tu viaje" },

  // hogar
  { termino: "apartamento", categoria: "hogar", sujeto: "tu apartamento" },
  { termino: "apartamentos", categoria: "hogar", sujeto: "tus apartamentos" },
  { termino: "casa", categoria: "hogar", sujeto: "tu casa" },
  { termino: "arriendo", categoria: "hogar", sujeto: "tu arriendo" },
  { termino: "arrendado", categoria: "hogar", sujeto: "tu hogar" },

  // exequial
  { termino: "papas", categoria: "exequial", sujeto: "a tus papás" },
  { termino: "abuelo", categoria: "exequial", sujeto: "a tu abuelo" },
  { termino: "abuela", categoria: "exequial", sujeto: "a tu abuela" },
  { termino: "abuelos", categoria: "exequial", sujeto: "a tus abuelos" },
  { termino: "exequial", categoria: "exequial", sujeto: "a los tuyos" },
];

/** minúsculas, sin tildes, partida en palabras. */
function normalizar(frase: string): string[] {
  return frase
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * Devuelve la primera coincidencia, o `null` si no reconoce nada.
 * Sin coincidencia el hero sigue funcionando: enseña un mensaje neutro
 * y deja continuar igual.
 */
export function clasificar(frase: string): Coincidencia | null {
  const palabras = new Set(normalizar(frase));
  return PALABRAS.find(({ termino }) => palabras.has(termino)) ?? null;
}
