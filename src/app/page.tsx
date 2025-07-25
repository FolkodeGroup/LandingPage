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
import ClientComment from "@/components/ClientComent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-6 items-start">
      <div className="container mx-auto px-6 py-24">
        <HeroSection />
        <QueHacemosSection />
        <AboutSection />
        <FactoryCard />
        <TeamMemberSection />
        <TeamMemberCard />
        <Unirte />
        <Tecnologias />
        <IconosTecnologias />
        <ProyClientes />
        <ContactFormSection />
        <ClientComment />
        
      </div>
    </main>
  );
}