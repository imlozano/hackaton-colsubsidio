# docs/marca.md — Fuente de verdad de marca

> Reemplaza cualquier versión anterior. Los valores provisionales naranjas quedan **anulados**.
> Estos colores fueron extraídos por muestreo de píxeles de colsubsidio.com e innovacion.colsubsidio.com.

## 1. Colores de marca

```
#005BA8   Azul Colsubsidio      ← institucional, estructura, confianza, botón primario
#FEC700   Amarillo Colsubsidio  ← acento, energía, el tangram. NUNCA texto ni botón primario
#F9F9F9   Lienzo                ← el fondo por defecto de la página
#0A0A0A   Tinta                 ← titulares y cuerpo. NO es negro puro
```

**Regla dura: el fondo nunca es blanco puro.** `#F9F9F9` es el lienzo. `#FFFFFF` se reserva para superficies elevadas (tarjetas, modales), para que la elevación se lea sin necesidad de sombras.

## 2. Tokens completos

```css
@theme {
  /* ---- Azul institucional ---- */
  --color-blue-50:  #EFF5FB;
  --color-blue-100: #D6E7F5;
  --color-blue-200: #A9CFEF;
  --color-blue-300: #6FB3EC;
  --color-blue-400: #2A94EE;
  --color-blue-500: #005BA8;  /* ★ MARCA */
  --color-blue-600: #004986;
  --color-blue-700: #003868;
  --color-blue-800: #002A4D;
  --color-blue-900: #001D36;
  --color-blue-950: #001222;

  /* ---- Amarillo tangram ---- */
  --color-yellow-50:  #FBF8EF;
  --color-yellow-100: #F6EFD5;
  --color-yellow-200: #F1E1A7;
  --color-yellow-300: #F2D469;
  --color-yellow-400: #FACA1F;
  --color-yellow-500: #FEC700;  /* ★ MARCA */
  --color-yellow-600: #CB9F00;
  --color-yellow-700: #9D7B00;
  --color-yellow-800: #755C00;  /* ← el único amarillo válido para texto */
  --color-yellow-900: #514000;
  --color-yellow-950: #332800;

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
| `#005BA8` sobre `#F9F9F9` | **6.5:1** | ✅ texto normal, AA |
| Blanco sobre `#005BA8` | **6.9:1** | ✅ botón primario |
| `#FEC700` sobre `#F9F9F9` | **1.5:1** | ❌ ilegible, nunca texto |
| `#755C00` sobre `#F9F9F9` | ✅ | el amarillo válido para texto |

**El amarillo es superficie, no tinta.** Vive en: bloques de fondo completo, el subrayado de un dato clave, el punto activo de la barra de progreso, y detalles del tangram. Nunca en texto, nunca en el botón principal.

**Proporción:** ~70% lienzo, 15% tinta, 12% azul, 3% amarillo.

## 4. Tipografía

- **Sans neutra** para todo: titulares, cuerpo, botones. Tracking negativo (-2%) en titulares grandes, line-height 1.05–1.15.
- **Mono** para labels, eyebrows de sección, primas, número de póliza, cédulas y fechas. El sitio de la hackathon usa mono en la navegación; ese detalle es parte del lenguaje visual del ecosistema y le da carácter técnico al producto.
- Máximo dos pesos por sección. Ancho máximo de párrafo: 65 caracteres.

> Si el documento de research original nombra las familias exactas, esas mandan sobre esta recomendación.

## 5. Assets — descárgalos a `/public`, no los hotlinkees

| Asset | Origen |
|---|---|
| Logo Colsubsidio horizontal (PNG) | `innovacion.colsubsidio.com/Colsubsidio_horizontal.png` |
| Logo Colsubsidio (SVG) | `colsubsidio.com/assets/icons/logo-colsubsidio.svg` |
| Logo 30X (SVG) | `innovacion.colsubsidio.com/30x-ink.svg` |
| Vigilado Supersubsidio | `innovacion.colsubsidio.com/vigilado-supersubsidio.png` |

Si el sitio se cae durante el demo y estabas hotlinkeando, tu página queda rota. Descárgalos.

## 6. Legal — no negociable

- El sello correcto es **Vigilado Supersubsidio**. Colsubsidio es una caja de compensación.
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
