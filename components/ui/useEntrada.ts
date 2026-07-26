"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Marca una sección para que su contenido entre al llegar al viewport.
 *
 * Devuelve la `ref` de la sección y el valor de `data-entra`, que es lo
 * que dispara el keyframe declarado en `globals.css`.
 *
 * En el servidor devuelve `undefined`. Es deliberado: sin ese atributo
 * el CSS no esconde nada, así que una página a la que no le llegue el
 * JavaScript se lee entera. Con el `whileInView` de framer el estado
 * inicial viajaría dentro del HTML y la sección se quedaría en
 * `opacity: 0` esperando un observador que nunca corre.
 *
 * `once` va activado: una sección que ya entró no vuelve a `espera`, así
 * que nada se reanima al volver a subir.
 */
export function useEntrada<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  /* El margen negativo pide que la sección esté algo dentro antes de
     disparar; si no, entra cuando apenas asoma un píxel. */
  const enVista = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  const [hidratado, setHidratado] = useState(false);
  useEffect(() => setHidratado(true), []);

  return {
    ref,
    entra: !hidratado ? undefined : enVista ? "dentro" : "espera",
  } as const;
}
