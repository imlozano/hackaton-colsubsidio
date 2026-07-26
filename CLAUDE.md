# CLAUDE.md

## Qué es este proyecto

Prototipo de venta 100% autoservicio de seguros para la Hackathon Colsubsidio × 30X.
El reto: llevar al usuario desde "no sé qué seguro necesito" hasta "ya quedé asegurado", sin intervención humana.

**Entrega: domingo 26 de julio.** Prioriza que el recorrido completo funcione sobre que cualquier sección esté pulida.

## Fuente de verdad

Antes de cualquier trabajo, lee en este orden:

1. `docs/marca.md` — colores, tipografía, assets, reglas legales. **Manda sobre todo lo demás.**
2. `docs/brief.md` — alcance, secciones, copy, flujo, reglas técnicas.

Si algo del brief contradice a `marca.md`, gana `marca.md`. Si algo que yo diga en el chat contradice a cualquiera de los dos, **pregúntame antes de decidir**.

## Gestor de paquetes: pnpm

**Se usa pnpm exclusivamente. Nunca npm, nunca yarn.**

```
pnpm create next-app@latest .
pnpm install
pnpm add <paquete>
pnpm dev
pnpm build
pnpm dlx <herramienta>       # en vez de npx
```

- No ejecutes `npm install` ni `npx` bajo ninguna circunstancia.
- No crees ni modifiques `package-lock.json` ni `yarn.lock`. El único lockfile válido es `pnpm-lock.yaml`.
- Si encuentras un `package-lock.json` en el repo, avísame antes de tocarlo.
- El campo `packageManager` de `package.json` debe declarar pnpm.

## Stack

- Next.js 15 (App Router) + TypeScript
- **Tailwind v4** — los tokens van en `app/globals.css` bajo `@theme`, no en `tailwind.config.js`
- framer-motion, solo para fade-up y la transición del hero
- lucide-react, stroke 1.5
- Deploy en Vercel
- Sin Redux, sin React Query, sin librerías de componentes

## Esto es solo frontend

**No hay backend y no debe haberlo.** Todo se simula en el cliente:

- Catálogo, primas y copy en `lib/data.ts`
- Guion del asesor en `lib/conversacion.ts`, como árbol de decisión
- Toda la simulación se encapsula en **una sola función** en `lib/asesor.ts`, que devuelve una promesa con retraso de 600–900ms. En ningún otro archivo hay lógica simulada.
- Forma de la respuesta:
  `{ mensaje, opciones[], productoRecomendado, alternativas[], prima, coberturas[], siguientePaso }`
- Pago y emisión de póliza son simulados. El número de póliza se genera en el cliente.

## Reglas no negociables

1. **Ningún hex suelto en el código.** Todo sale de los tokens `@theme`. Se usan clases como `bg-canvas`, `text-ink`, `bg-blue-500`.
2. **El fondo es `#F9F9F9`, no blanco.** El blanco es solo para tarjetas y superficies elevadas.
3. **El amarillo `#FEC700` nunca es texto ni botón primario.** Da 1.5:1 de contraste. Para texto amarillo se usa `yellow-800`.
4. **El botón primario es `blue-500` con texto blanco.**
5. **Escala de espaciado únicamente** 4/8/12/16/24/32/48/64/96, con padding vertical idéntico entre todas las secciones.
6. **Mobile-first.** Se prueba a 390px. Sin scroll horizontal. Área táctil mínima 44×44px.
7. **No inventes contenido.** Si falta un dato, precio, nombre o cifra, déjalo como `TODO` visible y avísame. Jamás rellenes con datos plausibles.
8. **Legal:** el sello es *Vigilado Supersubsidio*. **Nunca escribas "Superintendencia Financiera"** — esa vigila a las aseguradoras, no a Colsubsidio. El disclaimer de prototipo va siempre en el footer. Las primas se rotulan como estimadas.
9. **No inventes ni redibujes logos.** Se usan los archivos de `/public/brand`.
10. Contraste AA 4.5:1, foco visible, `prefers-reduced-motion`, HTML semántico, un solo `<h1>`.
11. Todo el copy vive en `lib/data.ts`, nunca hardcodeado en JSX.

## Prohibido

- Gradientes en botones, fondos o títulos
- `background-clip: text`
- Emojis en la interfaz
- Fondos crema o beige — el lienzo es `#F9F9F9`, gris neutro
- Contenido centrado fuera del hero
- Tarjetas con borde + sombra + fondo distinto al mismo tiempo
- Más de dos pesos tipográficos por sección
- Parallax, blobs, partículas, gradientes animados
- Fotos de stock de gente sonriendo
- Estadísticas o contadores inventados
- Secciones fuera del alcance del brief

## Cómo trabajamos

- **Planifica antes de codificar.** Cuando te pida una etapa, devuelve primero el plan y espera mi aprobación explícita. No escribas archivos hasta que apruebe.
- **Una etapa por vez.** No adelantes trabajo de etapas siguientes.
- Al terminar cada etapa: qué construiste y qué falta, en dos líneas.
- Cuando te pegue una captura, corrige **solo** lo que te señale.
- Si una instrucción mía rompe una regla de este archivo, dímelo en vez de obedecer.

## Etapas

1. Cimientos: proyecto, tokens `@theme`, fuentes, assets, nav y footer
2. Hero conversacional con sus dos estados y la transición
3. Secciones restantes de la home
4. Flujo simulado: recomendación → cotización → datos → pago → póliza
5. Pulido: responsive 390px, accesibilidad, deploy
