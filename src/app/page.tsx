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

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-6 items-start">
        <CoverParticles />
        <HeroSection />
      <div className="container mx-auto px-6 py-24">
        <hr className="border-t border-secondary my-4" />
        <QueHacemosSection />
        <AboutSection />
        <TeamMemberSection />
        <FactoryCard />
        <Unirte />
        <hr className="border-t border-secondary my-4" />
        <h1 className="text-3xl font-bold text-center mb-8 mt-8">Comentarios Del Equipo</h1>
        <ComentariosEquipo/>
        <hr className="border-t border-secondary my-4" />
        <Tecnologias />
        <IconosTecnologias />
        <hr className="border-t border-secondary my-4" />
        <ProyClientes />
        <hr className="border-t border-secondary my-4" />
        <h1 className="text-3xl font-bold text-center mb-8 mt-8">Comentarios De los Clientes</h1>
        <ClientComent
          comment="El equipo de Folkode ha sido increíble. Su profesionalismo y dedicación nos ayudaron a llevar nuestro proyecto al siguiente nivel."
          author="Juan Pérez"
          role="CEO de Empresa X"
          avatarUrl="/images/avatars/juan.jpeg"
        />

        <hr className="border-t border-secondary my-4" />
        <ContactateSection />
        <hr className="border-t border-secondary my-4" />

      </div>
    </main>
  );
}