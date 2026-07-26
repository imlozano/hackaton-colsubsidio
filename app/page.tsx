import { Hero } from "@/components/sections/Hero";
import { Tangram } from "@/components/sections/Tangram";

export default function Home() {
  return (
    <>
      <Hero />
      {/* La banda va entre "Qué puedes proteger" y "Cómo funciona", que
          llegan en la Etapa 3. Por ahora sigue al hero. */}
      <Tangram />
    </>
  );
}
