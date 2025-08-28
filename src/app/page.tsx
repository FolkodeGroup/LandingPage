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
        <Reveal><ComentariosEquipo/></Reveal>
        <section id="tecnologias" className="mt-16">
          <Reveal><Tecnologias /></Reveal>
        </section>
        <section id="iconos-tecnologias">
          <Reveal><IconosTecnologias /></Reveal>
        </section>
        <section id="proyectos" className="mt-16">
          <Reveal><ProyClientes /></Reveal>
        </section>
        <section className="mb-16">
          <Reveal>
              <ClientComent />
          </Reveal>
        </section>
        <section id="contacto" className="mt-12 -mb-16">
          <Reveal><ContactateSection /></Reveal>
        </section>
      </div>
    </main>
  );
}