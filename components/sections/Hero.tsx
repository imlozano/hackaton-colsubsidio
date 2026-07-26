"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { consultarAsesor } from "@/lib/asesor";
import { hero } from "@/lib/data";
import type { Mensaje, PasoId } from "@/lib/types";

/* Movimiento — brief §2. Un solo momento coreografiado: esta transición. */
const SUAVE = [0.22, 1, 0.36, 1] as const;
const ENTRADA = { duration: 0.4, ease: SUAVE };
const SALIDA_TITULAR = { duration: 0.25, ease: SUAVE };

/* Placeholder que se escribe solo — brief §4. */
const MS_POR_CARACTER = 45;
const MS_POR_FRASE = 3500;

function usePlaceholderEscrito(frases: readonly string[], activo: boolean) {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    if (!activo) return;

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

function Escribiendo() {
  const reducido = useReducedMotion();

  return (
    <div className="flex items-center gap-2 py-3">
      <span className="sr-only">{hero.etiquetaEscribiendo}</span>
      <span aria-hidden="true" className="flex gap-1">
        {[0, 1, 2].map((punto) => (
          <motion.span
            key={punto}
            className="block size-2 rounded-full bg-ink-mute"
            animate={reducido ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: punto * 0.15,
            }}
          />
        ))}
      </span>
    </div>
  );
}

export function Hero() {
  const reducido = useReducedMotion();

  const [conversando, setConversando] = useState(false);
  const [valor, setValor] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [pasoActivo, setPasoActivo] = useState<PasoId>("diagnostico");
  const [enfocado, setEnfocado] = useState(false);

  const contador = useRef(0);
  const nodoRef = useRef<PasoId | null>(null);

  /* Se detiene al hacer foco, si ya hay texto escrito, cuando arranca la
     conversación, y siempre que el usuario pidió menos movimiento. */
  const animaPlaceholder =
    !enfocado && !valor && !conversando && !reducido;
  const escrito = usePlaceholderEscrito(hero.placeholders, animaPlaceholder);
  const placeholder = conversando
    ? hero.placeholderChat
    : animaPlaceholder
      ? escrito
      : hero.placeholders[0];

  const enviar = useCallback(
    async (texto: string) => {
      const limpio = texto.trim();
      if (!limpio || escribiendo) return;

      setConversando(true);
      setValor("");
      contador.current += 1;
      setMensajes((previos) => [
        ...previos,
        { id: `u${contador.current}`, autor: "usuario", texto: limpio },
      ]);
      setEscribiendo(true);

      const respuesta = await consultarAsesor(limpio, nodoRef.current);

      nodoRef.current = respuesta.siguientePaso;
      setEscribiendo(false);
      setPasoActivo(respuesta.siguientePaso);
      contador.current += 1;
      setMensajes((previos) => [
        ...previos,
        {
          id: `a${contador.current}`,
          autor: "asesor",
          texto: respuesta.mensaje,
          opciones: respuesta.opciones,
        },
      ]);
    },
    [escribiendo],
  );

  return (
    <section className="mx-auto w-full max-w-page px-5 py-16 md:px-10 md:py-32">
      <div className="mx-auto flex w-full max-w-hero flex-col items-center">
        {/* Titular. No se desmonta: la página siempre conserva su único
            <h1>, aunque en la conversación quede fuera de vista. */}
        <motion.div
          layout={!reducido}
          animate={
            conversando
              ? { opacity: 0, y: -12, height: 0 }
              : { opacity: 1, y: 0, height: "auto" }
          }
          transition={reducido ? { duration: 0 } : SALIDA_TITULAR}
          className="w-full overflow-hidden text-center"
        >
          <h1 className="text-hero text-balance md:text-hero-lg">
            {hero.titulo.map((linea) => (
              <span key={linea} className="block">
                {linea}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-6 max-w-prosa-hero text-cuerpo text-ink-soft md:text-cuerpo-lg">
            {hero.subtitulo}
          </p>
          <div className="h-12" />
        </motion.div>

        {/* Barra de progreso — solo durante la conversación. */}
        <AnimatePresence>
          {conversando && (
            <motion.div
              key="progreso"
              layout={!reducido}
              initial={reducido ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reducido ? { duration: 0 } : ENTRADA}
              className="mb-12 w-full"
            >
              <ProgressBar pasoActivo={pasoActivo} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversación. */}
        <div
          aria-live="polite"
          aria-label={hero.etiquetaConversacion}
          className="flex w-full flex-col gap-4 text-left"
        >
          <AnimatePresence initial={false}>
            {mensajes.map((mensaje) => (
              <motion.div
                key={mensaje.id}
                initial={reducido ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reducido ? { duration: 0 } : ENTRADA}
                className={
                  mensaje.autor === "usuario" ? "self-end" : "self-start"
                }
              >
                <p
                  className={`max-w-prosa rounded-lg px-4 py-3 text-cuerpo ${
                    mensaje.autor === "usuario"
                      ? "bg-blue-50 text-ink"
                      : "bg-surface text-ink"
                  }`}
                >
                  {mensaje.texto}
                </p>

                {mensaje.opciones && mensaje.opciones.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {mensaje.opciones.map((opcion) => (
                      <li key={opcion}>
                        <Button
                          variante="opcion"
                          onClick={() => enviar(opcion)}
                          disabled={escribiendo}
                        >
                          {opcion}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {escribiendo && <Escribiendo />}
        </div>

        {/* El input: en reposo es la entrada del hero; al conversar baja y
            se vuelve la barra de escritura del chat. Es el mismo nodo, por
            eso se anima de posición en vez de remontarse. */}
        <motion.form
          layout={!reducido}
          transition={reducido ? { duration: 0 } : ENTRADA}
          onSubmit={(evento) => {
            evento.preventDefault();
            enviar(valor);
          }}
          className={`w-full ${conversando ? "mt-6" : ""}`}
        >
          <label htmlFor="entrada-asesor" className="sr-only">
            {hero.etiquetaEntrada}
          </label>
          <div className="relative">
            <input
              id="entrada-asesor"
              type="text"
              autoComplete="off"
              value={valor}
              placeholder={placeholder}
              onChange={(evento) => setValor(evento.target.value)}
              onFocus={() => setEnfocado(true)}
              onBlur={() => setEnfocado(false)}
              /* 60px de alto los fija el brief §4 para este input. */
              className="h-[60px] w-full rounded-lg border border-line bg-surface pr-16 pl-6 text-cuerpo text-ink placeholder:text-ink-mute focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:outline-none"
            />
            {/* Circular, no píldora: por eso no usa Button. */}
            <button
              type="submit"
              aria-label={hero.etiquetaEnviar}
              disabled={escribiendo}
              className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-full bg-blue-500 text-white transition-colors duration-150 hover:bg-blue-600 disabled:opacity-50"
            >
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-6"
              />
            </button>
          </div>
        </motion.form>

        {/* Chips de situación de vida — solo en reposo. */}
        <AnimatePresence>
          {!conversando && (
            <motion.ul
              key="chips"
              layout={!reducido}
              initial={false}
              exit={{ opacity: 0 }}
              transition={reducido ? { duration: 0 } : SALIDA_TITULAR}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {hero.chips.map((chip, i) => (
                <motion.li
                  key={chip}
                  initial={reducido ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reducido
                      ? { duration: 0 }
                      : { ...ENTRADA, delay: 0.06 * i }
                  }
                >
                  <Button variante="chip" onClick={() => enviar(chip)}>
                    {chip}
                  </Button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <p className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-eyebrow tracking-eyebrow text-ink-mute uppercase">
          <span>{hero.confianza.aliados}</span>
          <span>{hero.confianza.sello}</span>
        </p>
      </div>
    </section>
  );
}
