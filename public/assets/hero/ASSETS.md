# Hero Assets

Inventario real de `public/assets/hero/`. **15 archivos, todos WebP.**

Si añades o quitas un archivo, actualiza esta tabla en el mismo commit.
Un inventario que no coincide con el disco es peor que no tenerlo.

Estos assets son ilustración decorativa de este prototipo. **No son
identidad de marca de Colsubsidio** y no sustituyen a `/public/brand`.
Ver la excepción acotada en `CLAUDE.md` y en `docs/brief.md` §4.

## characters

| Archivo | Dimensiones | Peso |
|---|---|---|
| `characters/mascot-left.webp` | 1024×1024 | 125.1 KB |
| `characters/mascot-right.webp` | 1024×1024 | 126.4 KB |

Los dos son el mismo personaje casi en espejo. Usarlos en ambos flancos
a la vez se lee como copia reflejada.

## objects

| Archivo | Dimensiones | Peso |
|---|---|---|
| `objects/house.webp` | 1024×1024 | 139.9 KB |
| `objects/laptop.webp` | 1024×1024 | 148.9 KB |
| `objects/platform.webp` | 1280×853 | 121.3 KB |
| `objects/scooter.webp` | 1280×853 | 96.5 KB |

## numbers

| Archivo | Dimensiones | Peso |
|---|---|---|
| `numbers/number-2.webp` | 1024×1536 | 164.5 KB |
| `numbers/number-4.webp` | 1024×1536 | 143.1 KB |
| `numbers/number-7.webp` | 1024×1536 | 134.6 KB |
| `numbers/slash.webp` | 1024×1536 | 119.7 KB |

## effects

| Archivo | Dimensiones | Peso |
|---|---|---|
| `effects/arrow.webp` | 1280×853 | 25.7 KB |
| `effects/cloud-left.webp` | 1024×1536 | 115.6 KB |
| `effects/cloud-right.webp` | 1024×1536 | 115.6 KB |
| `effects/sparkle-1.webp` | 1024×1536 | 58.7 KB |
| `effects/sparkle-2.webp` | 1024×1536 | 77.2 KB |

**Total en disco: 1.67 MB.**

## Formato

- WebP real con alfa, q82, lado largo máximo 1280px.
- El origen eran PNG de 27.51 MB nombrados `.webp`. Reencodificados con
  `pnpm dlx sharp-cli`; no hay dependencia de imagen en `package.json`.
- Fondo transparente limpio: las esquinas están en `alpha=0` y no hay
  halo al componer sobre el lienzo `#F9F9F9`.
- Se sirven con `next/image`, que vuelve a redimensionar y reencodificar
  por viewport. Lo que descarga el navegador es bastante menor que el
  peso en disco.

## Cómo regenerar

```
pnpm dlx sharp-cli -i "<origen>/*.png" -o <destino> \
  -f webp -q 82 resize 1280 --fit inside --withoutEnlargement
```
