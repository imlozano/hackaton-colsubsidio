# CLAUDE.md

## Qué es este proyecto

Landing de captación de seguros para la Hackathon Colsubsidio × 30X.

El reto completo —llevar al usuario desde "no sé qué seguro necesito" hasta "ya quedé asegurado"— lo resuelve el equipo entre dos piezas:

- **Esta landing**: recoge en una frase qué quiere proteger el usuario, le confirma que la entendió, y lo entrega al agente.
- **El agente de voz** (lo construye otro miembro del equipo): hace el diagnóstico, la recomendación y la venta.

**Esta landing no simula el asesor, no cotiza, no vende y no emite pólizas.** Su único trabajo es que el usuario llegue al agente con contexto.

**Entrega: domingo 26 de julio.** Prioriza que la entrega al agente funcione sobre que cualquier sección esté pulida.

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

**No hay backend y no debe haberlo.** Tampoco hay asesor simulado:

- Catálogo y copy en `lib/data.ts`
- `lib/intencion.ts` clasifica la frase del usuario por **coincidencia de palabras clave** y devuelve una categoría. Es clasificación, no un asesor: no conversa, no recomienda producto, no calcula primas, no tiene turnos.
- El hero no muestra precios, coberturas ni recomendaciones. Nada de eso es nuestro.
- La entrega al agente es una navegación a `NEXT_PUBLIC_URL_PRODUCTO` con la frase y la categoría como query params. **Si la variable no existe, el botón queda deshabilitado con texto neutro — nunca roto.**

## Reglas no negociables

1. **Ningún hex suelto en el código.** Todo sale de los tokens `@theme`. Se usan clases como `bg-canvas`, `text-ink`, `bg-blue-500`.
2. **El fondo es `#F9F9F9`, no blanco.** El blanco es solo para tarjetas y superficies elevadas.
3. **El amarillo `#FEC700` nunca es texto ni botón primario.** Da 1.5:1 de contraste. Para texto amarillo se usa `yellow-800`.
4. **El botón primario es `blue-500` con texto blanco.**
5. **Escala de espaciado únicamente** 4/8/12/16/24/32/48/64/96, con padding vertical idéntico entre todas las secciones.
6. **Mobile-first.** Se prueba a 390px. Sin scroll horizontal. Área táctil mínima 44×44px.
7. **No inventes contenido.** Si falta un dato, precio, nombre o cifra, déjalo como `TODO` visible y avísame. Jamás rellenes con datos plausibles.
8. **Legal:** los sellos son *Vigilado Supersubsidio* y *Vigilado Supersalud*, los dos, como en el footer real de Colsubsidio. **Nunca escribas "Superintendencia Financiera"** — esa vigila a las aseguradoras, no a Colsubsidio. El disclaimer de prototipo va siempre en el footer. Si alguna vez aparece una prima, se rotula como estimada.
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
- Scroll-scrubbing: en móvil es frágil. Para entrar en viewport se usa `whileInView`
- Ilustraciones 3D, personajes, mascotas o imágenes generadas con IA. Colsubsidio no tiene mascota; inventarle una equivale a inventarle un logo
- Fotos de stock de gente sonriendo
- Estadísticas o contadores inventados
- Simular el asesor, cotizar, cobrar o emitir pólizas. Eso es del agente de voz
- Secciones fuera del alcance del brief

### EXCEPCIÓN — Ilustración del hero

La sección hero incorpora una ilustración decorativa compuesta por assets
ilustrados generados para este prototipo. Es la única excepción a la
prohibición de ilustraciones, personajes y assets generados.

Alcance estricto: `components/hero/` y `public/assets/hero/`.

Estos assets **NO son identidad de marca de Colsubsidio** y no deben
presentarse como tales. El resto de la interfaz sigue usando exclusivamente
el sistema de diseño oficial.

La prohibición sigue vigente para todo lo demás.

## Cómo trabajamos

- **Planifica antes de codificar.** Cuando te pida una etapa, devuelve primero el plan y espera mi aprobación explícita. No escribas archivos hasta que apruebe.
- **Una etapa por vez.** No adelantes trabajo de etapas siguientes.
- Al terminar cada etapa: qué construiste y qué falta, en dos líneas.
- Cuando te pegue una captura, corrige **solo** lo que te señale.
- Si una instrucción mía rompe una regla de este archivo, dímelo en vez de obedecer.

## Etapas

1. Cimientos: proyecto, tokens `@theme`, fuentes, assets, nav y footer
2. Hero con sus dos estados y la transición
3. Secciones restantes de la home, incluida la banda del tangram
4. Entrega al agente: `lib/intencion.ts`, reconocimiento y salida a `NEXT_PUBLIC_URL_PRODUCTO`
5. Pulido: responsive 390px, accesibilidad, deploy
