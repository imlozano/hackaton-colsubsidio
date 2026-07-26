# docs/brief.md — Home del reto "Venta automatizada de seguros"
### Hackathon Colsubsidio × 30X · entrega domingo 26 de julio

> Este documento define **qué** se construye. `docs/marca.md` define **con qué colores y reglas**.
> Si algo aquí contradice a `marca.md`, gana `marca.md`.

---

## 1. La decisión de alcance

El reto pide llevar al usuario desde *"no sé qué seguro necesito"* hasta *"ya quedé asegurado"* sin intervención humana.

**No es una landing page más un producto aparte. Es una sola aplicación con un solo flujo.** La home es el primer scroll de esa aplicación. Si el jurado abre el link y ve una landing bonita con un botón que no lleva a nada, el reto no se cumplió.

```
Home (hero conversacional)
   → Diagnóstico de necesidad
   → Recomendación personalizada (1 principal + 2 alternativas)
   → Cotización con precio visible
   → Datos y beneficiarios
   → Pago simulado
   → Póliza emitida
```

Todo en la misma URL. El usuario nunca siente que cambió de sitio.

**Criterio para decidir qué construir:** el recorrido completo debe correrse en menos de 3 minutos sin que nadie explique nada. Lo que no aporte a ese recorrido, no se construye.

### Sí va
| # | Sección | Trabajo que hace |
|---|---|---|
| 1 | Nav | Logo + "Seguros" + "Mis pólizas" |
| 2 | **Hero conversacional** | El elemento firma. Ver §4 |
| 3 | Banda de confianza | Aseguradoras aliadas + Vigilado Supersubsidio |
| 4 | Qué puedes proteger | 6 categorías, entran al mismo flujo con contexto |
| 5 | Cómo funciona | Bloque amarillo, 3 pasos reales |
| 6 | El flujo | Recomendación → cotización → datos → pago → póliza |
| 7 | FAQ | 5 preguntas, acordeón |
| 8 | Footer | Legales, contacto, disclaimer de prototipo |

### No va
Blog, testimonios, contadores de estadísticas, carrusel, dark mode, login real, multi-idioma, "quiénes somos".

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

## 4. El elemento firma: el hero conversacional

**La idea:** la home no muestra un catálogo. Muestra **una sola pregunta**, y la página se reconstruye alrededor de la respuesta. El sitio *es* el asesor.

### Estado A — al cargar

```
┌──────────────────────────────────────────────────────────┐
│  [logo]  Seguros                          Mis pólizas    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   No necesitas saber                                     │
│   qué seguro necesitas.                                  │
│                                                          │
│   Cuéntanos qué quieres proteger y en 3 minutos          │
│   quedas asegurado. Sin llamadas, sin asesor.            │
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

**No navega a otra ruta.** El hero se transforma en el lugar:

1. H1 y subtítulo suben y se desvanecen (250ms).
2. El input baja al pie del bloque y se convierte en la barra de escritura del chat.
3. Aparece el mensaje del usuario y luego la respuesta del asesor, con indicador de "escribiendo".
4. Arriba aparece una barra de progreso de 6 pasos: **Diagnóstico → Recomendación → Cotización → Datos → Pago → Póliza**. El paso activo se marca con el amarillo de marca. En un flujo financiero, saber cuánto falta es lo que reduce el abandono.

---

## 5. Las demás secciones

### Banda de confianza
Fondo `blue-900`, texto claro, banda angosta.
> **Respaldado por aseguradoras, operado por Colsubsidio.**
> Bolívar · Chubb · BMI Seguros Colombia · Vigilado Supersubsidio

### Qué puedes proteger
6 tarjetas blancas sobre lienzo. Ícono de línea, título, una frase, y "Desde $X/mes" en mono.
Al hacer clic **no navegan**: hacen scroll al hero y precargan la conversación con ese contexto. Una sola entrada al flujo, siempre.

Vida y familia · Exequial · Movilidad · Hogar · Mascotas · Viajes

### Cómo funciona
**Bloque amarillo a sangre completa**, texto en tinta `#0A0A0A`. Es el único momento de amarillo grande de la página y por eso funciona.

01 **Cuéntanos tu situación.** En tus palabras. No necesitas conocer términos de seguros.
02 **Te mostramos lo que te sirve.** Con el precio de una vez, y por qué te lo recomendamos.
03 **Quedas asegurado.** Pagas y recibes tu póliza por correo en el mismo momento.

### FAQ
Acordeón, 5 preguntas:
- ¿Necesito ser afiliado a Colsubsidio?
- ¿Quién responde si tengo un siniestro?
- ¿Puedo cancelar cuando quiera?
- ¿Cómo pago?
- ¿Esto reemplaza a un asesor?

### Footer
Fondo `blue-950`. Cuatro columnas: Seguros · Ayuda (líneas de atención) · Legales (tratamiento de datos, PQRS) · Sello Vigilado Supersubsidio. Abajo, el disclaimer de prototipo.

---

## 6. El flujo (Etapa 4)

### Recomendación
Una tarjeta principal elevada con borde superior amarillo de 3px:
- Eyebrow en mono: "Recomendado para ti"
- Título del producto
- Una línea de razonamiento: "Porque tienes moto y tu mamá depende de ti."
- 4 coberturas con check de línea
- Prima grande en mono
- Botón `blue-500`: "Continuar con este"
- Link discreto: "Ver coberturas completas"

Dos alternativas más pequeñas y apagadas al lado.

### Cotización, datos, pago
**El precio se muestra antes de pedir cualquier dato personal.** Es lo contrario a como funcionan hoy los seguros y es un punto defendible en el pitch.

Formulario mínimo: nombre, cédula, correo, beneficiario. Nada más. Cada campo de más es abandono.

### Póliza emitida
Check de línea en verde, "Ya estás asegurado.", y una tarjeta con los datos en mono: número de póliza, producto, vigencia, prima mensual, aseguradora. Dos botones: "Descargar póliza (PDF)" y "Enviar a mi correo". Nota al pie: "Prototipo. No constituye un contrato de seguro."

---

## 7. Reglas técnicas

```
Stack:      Next.js 15 (App Router) + TypeScript + Tailwind v4
Paquetes:   pnpm — nunca npm ni yarn
Animación:  framer-motion, solo lo de §2
Íconos:     lucide-react, stroke 1.5, sin emojis
Estado:     useState/useReducer. Sin Redux, sin React Query.
Datos:      lib/data.ts (copy y catálogo), lib/conversacion.ts (guion), lib/asesor.ts (simulación)
Deploy:     Vercel
```

Estructura:

```
/app        layout.tsx · page.tsx · globals.css (@theme con todos los tokens)
/components /sections  Nav Hero ComoFunciona Coberturas Faq Footer
            /ui        Button Card Eyebrow Accordion ProgressBar
/lib        types.ts · data.ts · conversacion.ts · asesor.ts
/public     /brand  logos y sellos
```

Obligatorio:
- Tokens en `@theme` de `globals.css`. **Ningún hex suelto en componentes.**
- Mobile-first, se prueba a 390px. Sin scroll horizontal. Área táctil mínima 44×44px.
- Contraste AA 4.5:1. Foco visible. Navegable por teclado, incluido el asesor.
- `aria-live="polite"` en las respuestas del asesor.
- HTML semántico, un solo `<h1>`. Zoom 200% sin romper.
- `prefers-reduced-motion` respetado.

Prohibido:
- Gradientes · `background-clip: text` · emojis · fondos crema o beige
- Todo centrado fuera del hero
- Tarjetas con borde + sombra + fondo distinto al tiempo
- Más de dos pesos tipográficos por sección
- Fotos de stock de gente sonriendo · estadísticas inventadas

---

## 8. Sólo frontend

No hay backend y no debe haberlo. Toda la simulación se encapsula en **una sola función** en `lib/asesor.ts`, que devuelve una promesa con retraso de 600–900ms y esta forma:

```ts
{ mensaje, opciones[], productoRecomendado, alternativas[], prima, coberturas[], siguientePaso }
```

Si más adelante aparece un backend real, se cambia esa función y nada más.

---

## 9. Checklist antes de presentar

- [ ] Abre en celular sin scroll horizontal
- [ ] El recorrido completo corre en menos de 3 minutos
- [ ] El precio aparece antes de pedir datos personales
- [ ] Los logos son los archivos oficiales de `/public/brand`, sin deformar
- [ ] En ningún lado dice "Superintendencia Financiera"
- [ ] El disclaimer de prototipo está en el footer
- [ ] Las primas están rotuladas como estimadas
- [ ] Tienes video de respaldo por si falla el internet
