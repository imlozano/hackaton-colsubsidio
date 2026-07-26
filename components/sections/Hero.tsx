"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Fragment, useEffect, useRef, useState } from "react";

import { HeroScene } from "@/components/hero/HeroScene";
import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/data";
import { clasificar } from "@/lib/intencion";
import type { Coincidencia } from "@/lib/types";

/* Movimiento — brief §2. Una sola curva en toda la página. */
const SUAVE = [0.22, 1, 0.36, 1] as const;
const ENTRADA = { duration: 0.4, ease: SUAVE };
const SALIDA_TITULAR = { duration: 0.25, ease: SUAVE };

/**
 * Coreografía de entrada del contenido, en ms desde el load.
 *
 * El contenido va primero y la ilustración detrás: `HeroScene` no
 * arranca hasta 300ms, cuando esto ya casi terminó. Esa jerarquía no se
 * negocia.
 *
 * Estos cinco **no usan framer-motion**. La librería serializa `initial`
 * en el HTML del servidor y el hero quedaba en blanco hasta hidratar;
 * la excepción está documentada en `app/globals.css` bajo la clase
 * `.entrada-hero`. La ilustración sí sigue con framer-motion.
 */
const ENTRA = {
  titulo: 0,
  subtitulo: 60,
  input: 120,
  chips: 180,
  confianza: 240,
} as const;

/** Pasa el retraso al keyframe CSS. Viaja en el HTML del servidor, así
 *  que funciona con JavaScript desactivado. */
function retraso(ms: number): CSSProperties {
  return { "--entrada-retraso": `${ms}ms` } as CSSProperties;
}

/* Placeholder que se escribe solo — brief §4. */
const MS_POR_CARACTER = 45;
const MS_POR_FRASE = 3500;

/** Destino del agente de voz. Sin la variable, el botón se deshabilita. */
const URL_PRODUCTO = process.env.NEXT_PUBLIC_URL_PRODUCTO;

/** `null` mientras no esté escribiendo: así el primer render —servidor y
 *  cliente— siempre muestra la misma frase completa y no hay desajuste al
 *  hidratar, tenga el usuario movimiento reducido o no. */
function usePlaceholderEscrito(frases: readonly string[], activo: boolean) {
  const [texto, setTexto] = useState<string | null>(null);

  useEffect(() => {
    if (!activo) {
      setTexto(null);
      return;
    }

    let frase = 0;
    let caracter = 0;
    let transcurrido = 0;
    setTexto("");

    const id = setInterval(() => {
      transcurrido += MS_POR_CARACTER;
      const actual = frases[frase];

      if (caracter < actual.length) {
        caracter += 1;
        setTexto(actual.slice(0, caracter));
      }

      if (transcurrido >= MS_POR_FRASE) {
        frase = (frase + 1) % frases.length;
        caracter = 0;
        transcurrido = 0;
        setTexto("");
      }
    }, MS_POR_CARACTER);

    return () => clearInterval(id);
  }, [frases, activo]);

  return texto;
}

/** La frase y la categoría viajan como query params al agente. */
function destino(frase: string, coincidencia: Coincidencia | null) {
  if (!URL_PRODUCTO) return null;

  try {
    const url = new URL(URL_PRODUCTO);
    url.searchParams.set("frase", frase);
    if (coincidencia) url.searchParams.set("categoria", coincidencia.categoria);
    return url.toString();
  } catch {
    // URL mal formada en el entorno: mejor botón deshabilitado que 404.
    return null;
  }
}

/** Lo que manda "Qué puedes proteger" al elegir una tarjeta. El
 *  contador existe para que elegir dos veces la misma tarjeta vuelva a
 *  disparar el efecto: con solo el texto, React vería el mismo valor. */
export type Precarga = { frase: string; n: number };

type Props = {
  precarga?: Precarga | null;
};

export function Hero({ precarga = null }: Props) {
  const reducido = useReducedMotion();

  const [valor, setValor] = useState("");
  const [enviado, setEnviado] = useState<string | null>(null);
  const [enfocado, setEnfocado] = useState(false);

  const entradaRef = useRef<HTMLInputElement>(null);
  const pedirFoco = useRef(false);

  /* Las tarjetas escriben aquí, no envían: el usuario sigue mandando
     sobre la frase antes de entregarla al agente. */
  useEffect(() => {
    if (!precarga) return;
    setEnviado(null);
    setValor(precarga.frase);
    pedirFoco.current = true;
  }, [precarga]);

  /* El foco va en un efecto aparte porque `setEnviado(null)` puede tener
     que volver a montar el input: en el efecto de arriba la ref todavía
     apunta a null. Sin lista de dependencias, pero sale enseguida. */
  useEffect(() => {
    if (!pedirFoco.current) return;
    const entrada = entradaRef.current;
    if (!entrada) return;
    pedirFoco.current = false;
    entrada.scrollIntoView({
      behavior: reducido ? "auto" : "smooth",
      block: "center",
    });
    entrada.focus({ preventScroll: true });
  });

  /* Se detiene al hacer foco, si ya hay texto escrito, después de enviar,
     y siempre que el usuario pidió menos movimiento. */
  const animaPlaceholder = !enfocado && !valor && !enviado && !reducido;
  const escrito = usePlaceholderEscrito(hero.placeholders, animaPlaceholder);
  const placeholder = escrito ?? hero.placeholders[0];

  const coincidencia = enviado ? clasificar(enviado) : null;
  const url = enviado ? destino(enviado, coincidencia) : null;

  const reconocimiento = coincidencia
    ? hero.reconocimiento.replace("$sujeto", coincidencia.sujeto)
    : hero.reconocimientoNeutro;

  function enviar(texto: string) {
    const limpio = texto.trim();
    if (!limpio) return;
    setValor(limpio);
    setEnviado(limpio);
  }

  function reiniciar() {
    setEnviado(null);
    setValor("");
  }

  return (
    /* `overflow-hidden` recorta la ilustración contra los bordes de la
       sección: a 390px los assets asoman por los flancos y sin esto
       aparecería scroll horizontal. */
    <section className="relative mx-auto w-full max-w-page overflow-hidden px-5 py-16 md:px-10 md:py-32">
      {/* Dos zonas verticales. Arriba la escena, en su propio
          contenedor; debajo el contenido, sin un solo asset detrás. */}
      <HeroScene />

      <div className="relative z-10 mx-auto flex w-full max-w-hero flex-col items-center">
        {/* Titular. No se desmonta: la página siempre conserva su único
            <h1>, aunque tras enviar quede fuera de vista. */}
        {/* Ningún `initial` ni `layout` puede depender de `reducido`: el
            servidor no conoce la preferencia del usuario y el marcado no
            coincidiría al hidratar. La preferencia solo cambia duraciones,
            que no afectan el primer render. */}
        <motion.div
          layout
          animate={
            enviado
              ? { opacity: 0, y: -12, height: 0 }
              : { opacity: 1, y: 0, height: "auto" }
          }
          transition={reducido ? { duration: 0 } : SALIDA_TITULAR}
          className="w-full overflow-hidden text-center"
        >
          {/* La clase `entrada-hero` va en el h1 y no en el motion.div
              de arriba: si compartieran nodo, el keyframe y el transform
              que escribe framer para `layout` se pisarían. */}
          <h1
            style={retraso(ENTRA.titulo)}
            className="entrada-hero text-hero text-balance md:text-hero-lg"
          >
            {hero.titulo.map((linea, i) => (
              /* El espacio entre líneas es un nodo de texto real: dos
                 <span> en block se concatenan sin separación y el lector
                 de pantalla leía "saberqué". Entre dos cajas de bloque el
                 nodo en blanco no genera caja, así que no se ve nada. */
              <Fragment key={linea}>
                {i > 0 && " "}
                <span className="block">{linea}</span>
              </Fragment>
            ))}
          </h1>
          <p
            style={retraso(ENTRA.subtitulo)}
            className="entrada-hero mx-auto mt-6 max-w-prosa-hero text-cuerpo text-ink-soft md:text-cuerpo-lg"
          >
            {hero.subtitulo}
          </p>
          <div className="h-12" />
        </motion.div>

        {/* Reconocimiento y entrega. Sin precios, sin coberturas, sin
            recomendación de producto: nada de eso es nuestro. */}
        <div
          aria-live="polite"
          aria-label={hero.etiquetaReconocimiento}
          className="w-full"
        >
          <AnimatePresence>
            {enviado && (
              <motion.div
                key="reconocimiento"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reducido ? { duration: 0 } : ENTRADA}
                className="mb-8 w-full text-center"
              >
                <p className="text-subtitulo text-balance md:text-subtitulo-lg">
                  {reconocimiento}
                </p>

                <div className="mt-8 flex flex-col items-center gap-4">
                  {url ? (
                    <Button onClick={() => window.location.assign(url)}>
                      {hero.entrega.boton}
                    </Button>
                  ) : (
                    <Button disabled aria-disabled="true">
                      {hero.entrega.botonSinDestino}
                    </Button>
                  )}

                  <button
                    type="button"
                    onClick={reiniciar}
                    className="inline-flex min-h-11 items-center rounded-xs px-2 text-cuerpo text-ink-soft underline underline-offset-4 transition-colors duration-150 hover:text-ink"
                  >
                    {hero.entrega.volver}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* El input solo existe antes de enviar: una vez entendida la
            frase, lo que sigue es la entrega, no seguir escribiendo. */}
        <AnimatePresence>
          {!enviado && (
            <motion.form
              key="entrada"
              layout
              /* Sin `initial` ni `animate`: la entrada la hace el
                 keyframe CSS sobre el div de dentro. Aquí solo queda la
                 salida, que sí necesita framer por AnimatePresence. */
              exit={{ opacity: 0 }}
              transition={reducido ? { duration: 0 } : ENTRADA}
              onSubmit={(evento) => {
                evento.preventDefault();
                enviar(valor);
              }}
              className="w-full"
            >
              <label htmlFor="entrada-hero" className="sr-only">
                {hero.etiquetaEntrada}
              </label>
              <div
                style={retraso(ENTRA.input)}
                className="entrada-hero relative"
              >
                <input
                  id="entrada-hero"
                  ref={entradaRef}
                  type="text"
                  autoComplete="off"
                  value={valor}
                  placeholder={placeholder}
                  onChange={(evento) => setValor(evento.target.value)}
                  onFocus={() => setEnfocado(true)}
                  onBlur={() => setEnfocado(false)}
                  /* 60px de alto los fija el brief §4 para este input.
                     El anillo de foco es un box-shadow, por eso la
                     transición lo nombra junto al borde. Ningún asset de
                     la ilustración se mueve al enfocar. */
                  className="h-[60px] w-full rounded-lg border border-line bg-surface pr-16 pl-6 text-cuerpo text-ink transition-[border-color,box-shadow] duration-150 ease-marca placeholder:text-ink-mute focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none"
                />
                {/* Circular, no píldora: por eso no usa Button. */}
                <button
                  type="submit"
                  aria-label={hero.etiquetaEnviar}
                  className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-full bg-blue-500 text-white transition-colors duration-150 ease-marca hover:bg-blue-600"
                >
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-6"
                  />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Chips de situación de vida — solo antes de enviar.
            Entran como un solo bloque en 240ms. Antes se escalonaban de
            60 en 60, y así el último llegaba después de la línea de
            confianza y rompía el orden del guion. */}
        <AnimatePresence>
          {!enviado && (
            <motion.ul
              key="chips"
              layout
              /* La entrada la hacen los <li> con el keyframe CSS; aquí
                 solo queda la salida de AnimatePresence. */
              exit={{ opacity: 0 }}
              transition={reducido ? { duration: 0 } : SALIDA_TITULAR}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {hero.chips.map((chip) => (
                <li
                  key={chip}
                  style={retraso(ENTRA.chips)}
                  className="entrada-hero"
                >
                  <Button variante="chip" onClick={() => enviar(chip)}>
                    {chip}
                  </Button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* La escena ya no está detrás, así que el aire aquí es el mismo
            en las dos anchuras. */}
        <p
          style={retraso(ENTRA.confianza)}
          className="entrada-hero mt-24 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-eyebrow tracking-eyebrow text-ink-mute uppercase"
        >
          <span className="whitespace-nowrap">{hero.confianza.aliados}</span>
          {hero.confianza.sellos.map((sello) => (
            <span key={sello} className="whitespace-nowrap">
              {sello}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
