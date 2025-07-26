import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/AboutSection";
import Tecnologias from "@/components/Tecnologias";
import QueHacemosSection from "@/components/QueHacemosSection";
import ProyClientes from "@/components/ProyectoClientes";
import IconosTecnologias from "@/components/IconosTecnologias";
import TeamMemberCard from "@/components/TeamMemberCard";
import Unirte from "@/components/Unirte";
import TeamMemberSection from "@/components/TeamMemberCard";
import FactoryCard from "@/components/FactoryCard";
import ContactFormSection from "@/components/ContactFormSection";
import ContactDatos from "@/components/ContactDatos";
import ClientComent from "@/components/ClientComent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-6 items-start">
        <HeroSection />
      <div className="container mx-auto px-6 py-24">
        <hr className="border-t border-secondary my-4" />
        <QueHacemosSection />
        <h1 className="text-3xl font-bold text-center mb-8 mt-8">Sobre Folkode</h1>
        <hr className="border-t border-secondary my-4" />
        <AboutSection />
        <hr className="border-t border-secondary my-4" />
        <FactoryCard />
        <hr className="border-t border-secondary my-4" />
        <h1 className="text-3xl font-bold text-center mb-8 mt-8">Nuestro Equipo de Desarrolladores</h1>
        <hr className="border-t border-secondary my-4" />
        <TeamMemberSection />
        <TeamMemberCard />
        <hr className="border-t border-secondary my-4" />
        <Unirte />
        <hr className="border-t border-secondary my-4" />
        <h1 className="text-3xl font-bold text-center mb-8 mt-8">Comentarios Del Equipo</h1>
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
          avatarUrl="/images/avatars/juan.jpg"
        />
        
        <hr className="border-t border-secondary my-4" />
        <section className="w-full flex flex-col md:flex-row gap-8 items-start justify-center py-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <ContactDatos />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <ContactFormSection />
          </div>
        </section>
        <hr className="border-t border-secondary my-4" />

      </div>
    </main>
  );
}