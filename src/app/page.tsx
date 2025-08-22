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
    <main className="min-h-screen flex flex-col gap-6 items-start" id="inicio">
        <CoverParticles />
          <HeroSection />
      <div className="container mx-auto px-6 py-24">
        <section id="servicios">
          <Reveal><QueHacemosSection /></Reveal>
        </section>
        <section id="sobre-folkode">
          <Reveal><AboutSection /></Reveal>
        </section>
        <section id="nuestro-equipo">
          <Reveal><TeamMemberSection /></Reveal>
        </section>
        <section id="que-ofrecemos">
          <Reveal><FactoryCard /></Reveal>
        </section>
        <section id="unirte">
          <Reveal><Unirte /></Reveal>
        </section>
        <Reveal><h1 className="text-3xl font-bold text-center mb-8 mt-8">Comentarios Del Equipo</h1></Reveal>
        <Reveal><ComentariosEquipo/></Reveal>
        <section id="tecnologias">
          <Reveal><Tecnologias /></Reveal>
        </section>
        <section id="iconos-tecnologias">
          <Reveal><IconosTecnologias /></Reveal>
        </section>
        <section id="proyectos">
          <Reveal><ProyClientes /></Reveal>
        </section>
        <Reveal><h1 className="text-3xl font-bold text-center mb-8 mt-8 text-white">Comentarios De los Clientes</h1></Reveal>
        <Reveal>
          <ClientComent
            comment="El equipo de Folkode ha sido increíble. Su profesionalismo y dedicación nos ayudaron a llevar nuestro proyecto al siguiente nivel."
            author="Juan Pérez"
            role="CEO de Empresa X"
            avatarUrl="/images/avatars/juan.jpeg"
          />
        </Reveal>
        <section id="contacto">
          <Reveal><ContactateSection /></Reveal>
        </section>
      </div>
    </main>
  );
}