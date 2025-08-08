import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/AboutSection";
import Tecnologias from "@/components/Tecnologias";
import QueHacemosSection from "@/components/QueHacemosSection";
import ProyClientes from "@/components/ProyectoClientes";
import IconosTecnologias from "@/components/IconosTecnologias";
import Unirte from "@/components/Unirte";
import TeamMemberSection from "@/components/TeamMemberSection";
import FactoryCard from "@/components/FactoryCard";
import ContactateSection from "@/components/sections/ContactateSection";
import ClientComent from "@/components/ClientComent";
import CoverParticles from "@/components/cover-particles";
import ComentariosEquipo from "@/components/ComentariosEquipo";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-6 items-start">
        <CoverParticles />
        <HeroSection />
      <div className="container mx-auto px-6 py-24">
        <Reveal><QueHacemosSection /></Reveal>
        <Reveal><AboutSection /></Reveal>
        <Reveal><TeamMemberSection /></Reveal>
        <Reveal><FactoryCard /></Reveal>
        <Reveal><Unirte /></Reveal>
        <Reveal><h1 className="text-3xl font-bold text-center mb-8 mt-8">Comentarios Del Equipo</h1></Reveal>
        <Reveal><ComentariosEquipo/></Reveal>
        <Reveal><Tecnologias /></Reveal>
        <Reveal><IconosTecnologias /></Reveal>
        <Reveal><ProyClientes /></Reveal>
        <Reveal><h1 className="text-3xl font-bold text-center mb-8 mt-8 text-white">Comentarios De los Clientes</h1></Reveal>
        <Reveal>
          <ClientComent
            comment="El equipo de Folkode ha sido increíble. Su profesionalismo y dedicación nos ayudaron a llevar nuestro proyecto al siguiente nivel."
            author="Juan Pérez"
            role="CEO de Empresa X"
            avatarUrl="/images/avatars/juan.jpeg"
          />
        </Reveal>
        <Reveal><ContactateSection /></Reveal>
      </div>
    </main>
  );
}