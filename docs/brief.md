# docs/brief.md — Home del reto "Venta automatizada de seguros"
### Hackathon Colsubsidio × 30X · entrega domingo 26 de julio

> Este documento define **qué** se construye. `docs/marca.md` define **con qué colores y reglas**.
> Si algo aquí contradice a `marca.md`, gana `marca.md`.

---

## 1. La decisión de alcance

El reto pide llevar al usuario desde *"no sé qué seguro necesito"* hasta *"ya quedé asegurado"* sin intervención humana. **El equipo lo resuelve con dos piezas, y esta es solo una de ellas.**

```
Landing (esta página)          Agente de voz (otro miembro del equipo)
  hero: una frase                 diagnóstico
  reconocimiento                  recomendación
  "Continuar con mi asesor"  →    cotización, datos, pago, póliza
```

**Esta landing no simula el asesor.** No conversa por turnos, no recomienda producto, no muestra precios ni coberturas, no cobra y no emite pólizas. Su único trabajo es que el usuario llegue al agente con contexto: la frase que escribió y la categoría que se dedujo de ella.

Si el jurado abre el link y ve una landing bonita con un botón que no lleva a nada, el reto no se cumplió. Por eso el botón de entrega es la pieza crítica.

**Criterio para decidir qué construir:** que un desconocido escriba una frase y llegue al agente en menos de 30 segundos, sin que nadie le explique nada. Lo que no aporte a eso, no se construye.

### Sí va
| # | Sección | Trabajo que hace |
|---|---|---|
| 1 | Nav | Logo + "Seguros" + "Mis pólizas" |
| 2 | **Hero** | El elemento firma. Ver §4 |
| 3 | Banda de confianza | Aseguradoras aliadas + los dos sellos de vigilancia |
| 4 | Qué puedes proteger | 6 categorías, precargan el hero con contexto |
| 5 | **Banda del tangram** | Animación de ensamblaje. Ver §5 |
| 6 | Cómo funciona | Bloque amarillo, 3 pasos reales + la barra ilustrada de 6 pasos |
| 7 | FAQ | 5 preguntas, acordeón |
| 8 | Footer | Legales, contacto, disclaimer de prototipo |

### No va
Blog, testimonios, contadores de estadísticas, carrusel, dark mode, login real, multi-idioma, "quiénes somos". Y nada que simule al agente: conversación por turnos, precios, coberturas, formularios de datos, pago o póliza.

---

## 2. Ritmo visual

Los colores y tipografías están en `docs/marca.md`. Aquí solo el ritmo:

- **Escala de espaciado:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. Nada fuera de esa lista.
- **Padding vertical entre secciones:** 4rem móvil, 8rem desktop. **Idéntico en todas.** El desorden visual casi siempre es espaciado inconsistente, no colores feos.
- **Contenedor:** máx. 1280px, padding lateral 20px móvil / 40px desktop.
- **Radios:** 4px / 8px / 16px. La marca es geométrica, no blandita. Tarjetas a 8–16px. **Píldora completa SOLO en botones y chips** — los inputs no.
- **Elevación:** el lienzo es `#F9F9F9` y las tarjetas son blancas. Eso ya crea jerarquía. Sombras casi imperceptibles o ninguna.
- **Alineación:** solo el hero se centra. Todo lo demás se alinea a la izquierda.
- **Grilla de tarjetas:** 1 columna móvil, 2 tablet, 3 desktop.

### Escala tipográfica

| Rol | Móvil | Desktop |
|---|---|---|
| Hero H1 | 34px | 60px |
| H2 sección | 26px | 40px |
| H3 tarjeta | 19px | 22px |
| Cuerpo | 16px | 17px |
| Label / eyebrow (mono) | 13px | 13px |
| Prima (mono) | 30px | 42px |

Ancho máximo de párrafo: 65 caracteres.

### Movimiento

Un solo momento coreografiado: **la transformación del hero** (§4). Todo lo demás es `fade + translateY(12px)`, 400ms, `cubic-bezier(0.22, 1, 0.36, 1)`, con stagger de 60ms. Hover de botón: solo cambio de fondo, 150ms. `prefers-reduced-motion` desactiva todo.

Si el agente propone parallax, blobs, partículas o gradientes animados: quítalo. Grita "generado con IA" y le baja credibilidad al producto.

---

## 3. Contenido real

Portafolio real de Colsubsidio:

**Personas y familia:** vida, exequial, accidentes personales, salud, viajes, vida + ahorro
**Movilidad:** carro, moto, bici y patineta
**Hogar:** contenido y estructura
**Mascotas:** perros y gatos
**Empresas:** colectivos

**Aseguradoras aliadas reales:** Seguros Bolívar, Chubb, BMI Seguros Colombia.

**Contacto real:** línea nacional 01 8000 947 900 · Bogotá +57 601 745 79 00

**Mensajes de marca existentes:** "Protege todo lo que valoras" · "Asistencia 24/7"

Las primas del prototipo son estimadas y así deben rotularse. No se presentan como tarifas oficiales.

---

## 4. El elemento firma: el hero

**La idea:** la home no muestra un catálogo. Pide **una sola frase**, y la página se reconstruye alrededor de ella. El sitio no es el asesor: es la puerta al asesor.

### Estado A — al cargar

```
┌──────────────────────────────────────────────────────────┐
│  [logo]                                      Seguros     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   No necesitas saber                                     │
│   qué seguro necesitas.                                  │
│                                                          │
│   Cuéntanos qué quieres proteger y en 3 minutos          │
│   quedas asegurado. Sin llamadas, sin papeleo.           │
│                                                          │
│   ┌────────────────────────────────────────────────┐    │
│   │ Tengo moto y vivo con mi mamá…            [→]  │    │
│   └────────────────────────────────────────────────┘    │
│                                                          │
│   Soy mamá primeriza · Compré moto · Viajo el otro mes   │
│   Vivo solo con mi perro · Cuido a mis papás             │
│                                                          │
│   Bolívar · Chubb · BMI     Vigilado Supersubsidio       │
└──────────────────────────────────────────────────────────┘
```

- El **placeholder se escribe solo**, rotando entre 4 frases cada 3.5s (45ms por carácter). Se detiene al hacer foco. Es la única animación llamativa y comunica el producto sin explicarlo.
- Los chips no son categorías ("Vida", "Hogar"), son **situaciones de vida**. Ese es el punto del reto: el usuario no habla en lenguaje de aseguradora.
- Input de 60px de alto, **radio 16px** (no píldora: la píldora es solo para botones y chips), borde `line`. Al hacer foco, borde `blue-500` con anillo suave. Botón circular `blue-500` con flecha blanca.

### Estado B — al enviar

**No es una conversación.** El hero se transforma en el lugar y prepara la entrega:

1. H1 y subtítulo suben y se desvanecen (250ms). El `<h1>` **colapsa, no se desmonta**: la página nunca se queda sin su único `<h1>`.
2. Aparece un reconocimiento breve, en una línea: *"Entendí que quieres proteger tu moto."*
3. La categoría sale de coincidencia de palabras clave en `lib/intencion.ts`:

   | Palabras | Categoría |
   |---|---|
   | moto, carro, bici, patineta | movilidad |
   | bebé, hijo, hija, familia, mamá, papá | vida y familia |
   | perro, gato, mascota | mascotas |
   | viaje, viajo, exterior | viajes |
   | apartamento, casa, arriendo | hogar |
   | papás, abuelos, exequial | exequial |
   | sin coincidencia | mensaje neutro que igual permite continuar |

4. Botón primario: **"Continuar con mi asesor"**. Navega a `NEXT_PUBLIC_URL_PRODUCTO` con la frase y la categoría como query params.
5. **Sin precios, sin coberturas, sin recomendación de producto.** Nada de eso es nuestro.

`lib/intencion.ts` es clasificación por palabras clave, no un asesor.

**La barra de 6 pasos ya no vive aquí.** En el hero prometía un flujo que no operamos; pasó a ser ilustración estática dentro de "Cómo funciona".

### La ilustración del hero — excepción acotada

El hero incorpora una ilustración decorativa compuesta por assets ilustrados generados para este prototipo. Es **la única excepción** a la prohibición de ilustraciones, personajes y assets generados que fija `CLAUDE.md`.

- **Alcance estricto:** `components/hero/` y `public/assets/hero/`. Fuera de ahí la prohibición sigue vigente.
- Estos assets **no son identidad de marca de Colsubsidio** y no se presentan como tales. No sustituyen ni compiten con `/public/brand`.
- El resto de la interfaz sigue usando exclusivamente el sistema de diseño oficial. La paleta del proyecto no cambia.
- La ilustración es **decorativa**: `aria-hidden` en la escena y `alt=""` en cada asset. No se describe, no aporta información.
- **El contenido manda.** A 390×844 se ven sin scrollear H1, input, CTA y al menos dos chips. Si la ilustración invade ese espacio, se reduce la ilustración: el contenido no se desplaza.

---

## 5. Las demás secciones

### Banda de confianza
Fondo `blue-900`, texto claro, banda angosta.
> **Respaldado por aseguradoras, operado por Colsubsidio.**
> Bolívar · Chubb · BMI Seguros Colombia · Vigilado Supersubsidio · Vigilado Supersalud

### Qué puedes proteger
6 tarjetas blancas sobre lienzo. Ícono de línea, título y una frase. **Sin precios.**
Al hacer clic **no navegan**: hacen scroll al hero y precargan la frase con ese contexto. Una sola entrada, siempre.

Vida y familia · Exequial · Movilidad · Hogar · Mascotas · Viajes

### Banda del tangram
Banda propia entre "Qué puedes proteger" y "Cómo funciona". `components/sections/Tangram.tsx`, SVG inline, sin assets externos y sin librerías nuevas — framer-motion, que ya está instalado.

- **Siete piezas de tangram clásico:** cinco triángulos (dos grandes, uno mediano, dos pequeños), un cuadrado y un romboide. Seis en escala de azules (`blue-500` a `blue-800`), **una en `yellow-500`**. Formas planas: sin sombras, sin degradados, sin 3D.
- **Estado inicial:** dispersas, rotadas, opacidad 0.
- **Al entrar en viewport** con `whileInView`, se ensamblan formando la silueta de un techo. Stagger de 80ms, 600ms por pieza, `cubic-bezier(0.22,1,0.36,1)`. **Una sola vez, no en loop.**
- `whileInView`, **nunca scroll-scrubbing**: en móvil es frágil y no hay tiempo de depurarlo.
- Al lado, alineado a la izquierda: un titular corto terminado en punto y una línea de apoyo.
- `prefers-reduced-motion`: renderiza el techo ya ensamblado, sin animación.
- **La pieza amarilla es el único amarillo de ese viewport.**

### Cómo funciona
**Bloque amarillo a sangre completa**, texto en tinta `#0A0A0A`. Es el único momento de amarillo grande de la página y por eso funciona.

01 **Cuéntanos tu situación.** En tus palabras. No necesitas conocer términos de seguros.
02 **Te pasamos con tu asesor.** Llega sabiendo qué quieres proteger.
03 **Quedas asegurado.** Él resuelve la cotización, el pago y tu póliza.

Aquí vive la **barra ilustrada de 6 pasos** — Diagnóstico → Recomendación → Cotización → Datos → Pago → Póliza. Es ilustración estática del recorrido completo, no un indicador vivo: explica lo que pasa después de la entrega.

### FAQ
Acordeón, 5 preguntas:
- ¿Necesito ser afiliado a Colsubsidio?
- ¿Quién responde si tengo un siniestro?
- ¿Puedo cancelar cuando quiera?
- ¿Cómo pago?
- ¿Esto reemplaza a un asesor?

### Footer
Fondo `blue-950`. Cuatro columnas: Seguros · Ayuda (líneas de atención) · Legales · Vigilancia. Abajo, el disclaimer de prototipo con el logo 30X pequeño y en monocromo.

**Los legales tienen URL real y sí navegan:**
- Tratamiento de datos → `https://www.colsubsidio.com/tratamientos-personales`
- PQRS → `https://www.colsubsidio.com/pqrs`
- Defensor del afiliado → `https://www.colsubsidio.com/compromiso-con-clientes/defensor-afiliado`

**Los dos sellos van juntos**, Supersubsidio y Supersalud, como en el footer real de Colsubsidio.

---

## 6. La entrega al agente (Etapa 4)

Todo lo que pasa después del botón —diagnóstico, recomendación, cotización, datos, pago y póliza— **lo hace el agente de voz, no esta landing.**

Lo único que construimos:

```ts
// lib/intencion.ts — clasificación por palabras clave, no un asesor
clasificar(frase) → { categoria, sujeto } | null
```

Y la salida:

```
NEXT_PUBLIC_URL_PRODUCTO?frase=<lo que escribió>&categoria=<la deducida>
```

**Si `NEXT_PUBLIC_URL_PRODUCTO` no está definida, el botón se deshabilita con texto neutro.** Nunca un enlace roto, nunca un 404 delante del jurado.

---

## 7. Reglas técnicas

```
Stack:      Next.js 15 (App Router) + TypeScript + Tailwind v4
Paquetes:   pnpm — nunca npm ni yarn
Animación:  framer-motion, solo lo de §2
Íconos:     lucide-react, stroke 1.5, sin emojis
Estado:     useState/useReducer. Sin Redux, sin React Query.
Datos:      lib/data.ts (copy y catálogo), lib/intencion.ts (palabras clave)
Entorno:    NEXT_PUBLIC_URL_PRODUCTO — destino del agente de voz
Deploy:     Vercel
```

Estructura:

```
/app        layout.tsx · page.tsx · globals.css (@theme con todos los tokens)
/components /sections  Nav Hero Tangram ComoFunciona Coberturas Faq Footer
            /ui        Button Card Eyebrow Accordion ProgressBar
/lib        types.ts · data.ts · intencion.ts
/public     /brand  logos y sellos
```

Obligatorio:
- Tokens en `@theme` de `globals.css`. **Ningún hex suelto en componentes.**
- Mobile-first, se prueba a 390px. Sin scroll horizontal. Área táctil mínima 44×44px.
- Contraste AA 4.5:1. Foco visible. Navegable por teclado.
- `aria-live="polite"` en el reconocimiento del hero.
- HTML semántico, un solo `<h1>`. Zoom 200% sin romper.
- `prefers-reduced-motion` respetado.

Prohibido:
- Gradientes · `background-clip: text` · emojis · fondos crema o beige
- Todo centrado fuera del hero
- Tarjetas con borde + sombra + fondo distinto al tiempo
- Más de dos pesos tipográficos por sección
- Fotos de stock de gente sonriendo · estadísticas inventadas
- Scroll-scrubbing · ilustraciones 3D · personajes o mascotas · imágenes generadas con IA

---

## 8. Sólo frontend

No hay backend y no debe haberlo. Tampoco hay asesor simulado: `lib/intencion.ts` es una tabla de palabras clave y nada más. No conversa, no tiene turnos, no recomienda producto, no calcula primas.

Si la clasificación por palabras clave se queda corta, se amplía la tabla. **No se la reemplaza por un modelo ni por lógica de asesoría:** eso es del agente de voz.

---

## 9. Checklist antes de presentar

- [ ] Abre en celular sin scroll horizontal
- [ ] Escribir una frase y llegar al agente toma menos de 30 segundos
- [ ] `NEXT_PUBLIC_URL_PRODUCTO` está definida en Vercel — si no, el botón se ve deshabilitado, no roto
- [ ] La landing no muestra precios, coberturas ni recomendaciones de producto
- [ ] Los logos son los archivos oficiales de `/public/brand`, sin deformar
- [ ] En ningún lado dice "Superintendencia Financiera"
- [ ] Los dos sellos de vigilancia están en el footer
- [ ] El disclaimer de prototipo está en el footer
- [ ] La banda del tangram se ensambla una sola vez y no hace scroll-scrubbing
- [ ] Tienes video de respaldo por si falla el internet
