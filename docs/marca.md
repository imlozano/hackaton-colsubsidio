# docs/marca.md — Fuente de verdad de marca

> Reemplaza cualquier versión anterior. Los valores provisionales naranjas quedan **anulados**.
> **Azul y amarillo salen del archivo oficial `logo-colsubsidio.svg`, no del muestreo de píxeles.**
> El muestreo daba `#005BA8` / `#FEC700`; quedan anulados. Si el azul del logo y el
> del botón difieren, se nota lado a lado.

## 1. Colores de marca

```
#0067B1   Azul Colsubsidio      ← institucional, estructura, confianza, botón primario
#FFD000   Amarillo Colsubsidio  ← acento, energía, el tangram. NUNCA texto ni botón primario
#F9F9F9   Lienzo                ← el fondo por defecto de la página
#0A0A0A   Tinta                 ← titulares y cuerpo. NO es negro puro
```

**Regla dura: el fondo nunca es blanco puro.** `#F9F9F9` es el lienzo. `#FFFFFF` se reserva para superficies elevadas (tarjetas, modales), para que la elevación se lea sin necesidad de sombras.

## 2. Tokens completos

```css
@theme {
  /* ---- Azul institucional — rampa H 205°, anclada al 500 del logo ---- */
  --color-blue-50:  #EFF6FB;
  --color-blue-100: #D5E8F6;
  --color-blue-200: #A8D2F0;
  --color-blue-300: #70B8EB;
  --color-blue-400: #1D96ED;
  --color-blue-500: #0067B1;  /* ★ MARCA */
  --color-blue-600: #005694;
  --color-blue-700: #004475;
  --color-blue-800: #003357;
  --color-blue-900: #00243D;
  --color-blue-950: #001626;

  /* ---- Amarillo tangram — rampa H 49°, anclada al 500 del logo ---- */
  --color-yellow-50:  #FDFAEF;
  --color-yellow-100: #FAF4D6;
  --color-yellow-200: #F9EBA9;
  --color-yellow-300: #FBE274;
  --color-yellow-400: #FFD933;
  --color-yellow-500: #FFD000;  /* ★ MARCA */
  --color-yellow-600: #D4AD00;
  --color-yellow-700: #A68700;
  --color-yellow-800: #7D6600;  /* ← el único amarillo válido para texto */
  --color-yellow-900: #574700;
  --color-yellow-950: #362C00;

  /* ---- Neutros ---- */
  --color-canvas:      #F9F9F9;
  --color-surface:     #FFFFFF;
  --color-ink:         #0A0A0A;
  --color-ink-soft:    #525252;
  --color-ink-mute:    #8A8A8A;
  --color-line:        #E4E4E4;
  --color-line-strong: #0A0A0A;

  /* ---- Semánticos ---- */
  --color-primary:       var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-accent:        var(--color-yellow-500);
  --color-focus:         var(--color-blue-400);
  --color-ok:            #128A5E;
}
```

## 3. Reglas de uso del color

Contrastes verificados sobre lienzo `#F9F9F9`:

| Combinación | Ratio | Veredicto |
|---|---|---|
| `#0067B1` sobre `#F9F9F9` | **5.6:1** | ✅ texto normal, AA |
| Blanco sobre `#0067B1` | **5.9:1** | ✅ botón primario |
| `#FFD000` sobre `#F9F9F9` | **1.4:1** | ❌ ilegible, nunca texto |
| `#7D6600` sobre `#F9F9F9` | **5.3:1** | ✅ el amarillo válido para texto |
| Tinta `#0A0A0A` sobre `#FFD000` | **13.5:1** | ✅ el bloque amarillo |

**El amarillo es superficie, no tinta.** Vive en: bloques de fondo completo, el subrayado de un dato clave, el punto activo de la barra de progreso, y detalles del tangram. Nunca en texto, nunca en el botón principal.

**Proporción 60/30/10:** 60% neutros, 30% azul, 10% amarillo. Si ves amarillo en más de un elemento por viewport, sobraste.

## 4. Tipografía

**Familias (del research, mandan):** **Geist** para sans y **Geist Mono** para mono, vía `next/font/google`, expuestas como `--font-sans` y `--font-mono`. Si Geist falla, el respaldo es Inter Tight + JetBrains Mono.

- **Titulares:** peso 500–600, nunca black. Tracking `-0.03em`, line-height 0.95–1.05.
- **Los titulares terminan en punto.** "No necesitas saber qué seguro necesitas." Es un tic de la marca en el sitio del evento. Respétalo.
- **Eyebrows:** mono, `0.8125rem`, uppercase, letter-spacing `0.08em`.
- **Mono para labels, eyebrows de sección y toda cifra.** El sitio de la hackathon usa mono en la navegación; ese detalle es parte del lenguaje visual del ecosistema.
- **TODAS las cifras** (primas, coberturas, número de póliza, cédulas, fechas) van en mono con `font-variant-numeric: tabular-nums`. En seguros eso no es estética, es legibilidad de datos.
- Máximo dos pesos por sección. Ancho máximo de párrafo: 65 caracteres.

## 5. Assets — descárgalos a `/public`, no los hotlinkees

| Asset | Origen |
|---|---|
| Logo Colsubsidio horizontal (PNG) | `innovacion.colsubsidio.com/Colsubsidio_horizontal.png` |
| Logo Colsubsidio (SVG) | `colsubsidio.com/assets/icons/logo-colsubsidio.svg` |
| Logo 30X (SVG) | `innovacion.colsubsidio.com/30x-ink.svg` |
| Vigilado Supersubsidio, variante oscura (PNG) | `innovacion.colsubsidio.com/vigilado-supersubsidio.png` |
| Vigilado Supersubsidio, variante blanca (SVG) | `cms.colsubsidio.com/.../Vigilado SuperSubsidio.svg` |
| Vigilado Supersalud, variante blanca (SVG) | `cms.colsubsidio.com/.../Logo-Vigilado-Supersalud-2024-white_0.svg` |

Los dos SVG de sellos son **variantes blancas**, hechas para fondo oscuro: sobre el footer `blue-950` se leen sin recolorear nada. El PNG oscuro queda para fondos claros.

Si el sitio se cae durante el demo y estabas hotlinkeando, tu página queda rota. Descárgalos.

## 6. Legal — no negociable

- Los sellos correctos son **Vigilado Supersubsidio** y **Vigilado Supersalud**, y van **los dos**, como en el footer real de colsubsidio.com. Colsubsidio es una caja de compensación y además opera servicios de salud.
- **NO escribas "Vigilado Superintendencia Financiera de Colombia".** Esa vigila a las aseguradoras (Bolívar, Chubb, BMI), no a Colsubsidio. Es un error que un jurado de una entidad vigilada detecta de inmediato.
- Disclaimer obligatorio en el footer:
  > Prototipo desarrollado para la Hackathon Colsubsidio × 30X. No constituye una oferta comercial ni un contrato de seguro.

## 7. Voz

- Verbos concretos: "Cotiza en 2 minutos", no "Optimiza tu experiencia aseguradora".
- Cero jerga sin explicar. Si escribes "deducible", explícalo al lado. El reto entero es que la gente no entiende qué seguro necesita.
- Los botones dicen lo que pasa al hacer clic: "Ver mi cotización", no "Enviar".
- Los estados vacíos dan dirección, no disculpas.
- **Sin emojis.** No están en ninguna parte de la marca.

## 8. Aliados reales

Seguros Bolívar · Chubb · BMI Seguros Colombia. Colsubsidio distribuye; la aseguradora responde por el contrato.
