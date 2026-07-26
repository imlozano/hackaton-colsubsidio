import Image from "next/image";

type HeroAssetProps = {
  src: string;
  /** Descriptor `sizes` de next/image. Lo calcula la escena: es la
   *  única que sabe cuánto ocupa este asset dentro del escenario. */
  sizes: string;
  z: number;
  priority?: boolean;
  className?: string;
};

/**
 * Un asset ilustrado y nada más.
 *
 * No sabe dónde está, ni cuánto mide, ni si gira, ni en qué escena vive:
 * de eso se encarga `HeroScene`. Mantenerlo ignorante del layout es lo
 * que permite que la etapa de animaciones envuelva o reemplace al
 * contenedor sin tocar este archivo.
 *
 * `alt=""` siempre: la ilustración es decorativa y además cuelga de un
 * contenedor `aria-hidden`. Describirla sería ruido para el lector de
 * pantalla, que ya tiene el h1 y el input.
 */
export function HeroAsset({
  src,
  sizes,
  z,
  priority = false,
  className,
}: HeroAssetProps) {
  return (
    <Image
      src={src}
      alt=""
      /* Sin dimensiones intrínsecas: el ancho lo fija la escena en % del
         escenario y la altura va en auto. Con `sizes` presente, next
         genera igual el srcset completo. No hay salto de layout porque
         la escena está fuera de flujo. */
      width={0}
      height={0}
      sizes={sizes}
      quality={85}
      priority={priority}
      draggable={false}
      style={{ zIndex: z }}
      className={`relative h-auto w-full ${className ?? ""}`}
    />
  );
}
