"use client";

import { motion, useReducedMotion } from "framer-motion";

import { tangram } from "@/lib/data";
import type { PiezaTangram } from "@/lib/types";

/**
 * Banda del tangram — brief §5.
 *
 * Las siete piezas clásicas teselan **exactamente** un triángulo rectángulo
 * isósceles de catetos 4 (en unidades donde el triángulo pequeño tiene
 * cateto 1). Girado 45° ese triángulo se lee como un techo: la hipotenusa
 * queda horizontal abajo y el ángulo recto arriba, en el vértice.
 *
 * Sin assets externos, sin librerías nuevas, sin 3D y sin scroll-scrubbing.
 */

const SUAVE = [0.22, 1, 0.36, 1] as const;
const DURACION = 0.6;
const STAGGER = 0.08;

const ESCALA = 50;
const DESPLAZAMIENTO_X = 150;
const DESPLAZAMIENTO_Y = 10;

/** Gira 45° el espacio del tangram para que el triángulo quede de techo. */
function proyectar([x, y]: [number, number]) {
  const k = ESCALA / Math.SQRT2;
  return `${DESPLAZAMIENTO_X + k * (x - y)},${DESPLAZAMIENTO_Y + k * (x + y)}`;
}

const puntos = (pieza: PiezaTangram) => pieza.puntos.map(proyectar).join(" ");

/* Seis piezas en escala de azules y una —el cuadrado— en amarillo: es el
   único amarillo de este viewport. */
const PIEZAS: PiezaTangram[] = [
  {
    nombre: "Triángulo grande derecho",
    puntos: [
      [2, 0],
      [4, 0],
      [2, 2],
    ],
    relleno: "fill-blue-500",
    desde: { x: 70, y: 40, giro: 24 },
  },
  {
    nombre: "Triángulo grande izquierdo",
    puntos: [
      [0, 2],
      [0, 4],
      [2, 2],
    ],
    relleno: "fill-blue-600",
    desde: { x: -70, y: 40, giro: -24 },
  },
  {
    nombre: "Triángulo mediano",
    puntos: [
      [2, 0],
      [2, 2],
      [1, 1],
    ],
    relleno: "fill-blue-700",
    desde: { x: 48, y: -34, giro: -30 },
  },
  {
    nombre: "Romboide",
    puntos: [
      [0, 1],
      [1, 1],
      [2, 2],
      [1, 2],
    ],
    relleno: "fill-blue-800",
    desde: { x: -26, y: 52, giro: 28 },
  },
  {
    nombre: "Triángulo pequeño superior",
    puntos: [
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    relleno: "fill-blue-600",
    desde: { x: -42, y: -30, giro: 35 },
  },
  {
    nombre: "Triángulo pequeño inferior",
    puntos: [
      [1, 0],
      [2, 0],
      [1, 1],
    ],
    relleno: "fill-blue-700",
    desde: { x: 22, y: 56, giro: -18 },
  },
  {
    nombre: "Cuadrado",
    puntos: [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    relleno: "fill-yellow-500",
    desde: { x: 0, y: -62, giro: 45 },
  },
];

export function Tangram() {
  const reducido = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-page px-5 py-16 md:px-10 md:py-32">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="max-w-prosa text-titulo text-balance md:text-titulo-lg">
            {tangram.titulo}
          </h2>
          <p className="mt-6 max-w-prosa text-cuerpo text-ink-soft md:text-cuerpo-lg">
            {tangram.apoyo}
          </p>
        </div>

        {/* El disparo va en el contenedor, no en cada pieza: las piezas
            que entran desde más lejos arrancan fuera de vista y sus
            observadores individuales nunca se cumplirían. */}
        <motion.svg
          viewBox="0 0 300 162"
          role="img"
          aria-label={tangram.alt}
          className="h-auto w-full"
          /* `initial` no puede depender de reducido: el servidor no conoce
             la preferencia del usuario y el marcado no coincidiría al
             hidratar. Con movimiento reducido el ensamblaje se resuelve
             en duración 0 — aparece armado, sin animación. */
          initial="disperso"
          whileInView="armado"
          /* Una sola vez, nunca en loop, nunca atado al scroll. */
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            armado: {
              transition: { staggerChildren: reducido ? 0 : STAGGER },
            },
          }}
        >
          {PIEZAS.map((pieza) => (
            <motion.polygon
              key={pieza.nombre}
              points={puntos(pieza)}
              className={pieza.relleno}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              variants={{
                disperso: {
                  opacity: 0,
                  x: pieza.desde.x,
                  y: pieza.desde.y,
                  rotate: pieza.desde.giro,
                },
                armado: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  transition: {
                    duration: reducido ? 0 : DURACION,
                    ease: SUAVE,
                  },
                },
              }}
            />
          ))}
        </motion.svg>
      </div>
    </section>
  );
}
