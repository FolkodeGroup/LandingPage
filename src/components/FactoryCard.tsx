

'use client';
import React, { useEffect, useState } from "react";

const AccordionSection = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-2 w-full">
      <button
        className={`w-full flex justify-between items-center px-3 py-2 md:px-4 md:py-3 rounded-lg bg-[#01454F]/80 text-left font-semibold text-base md:text-lg text-[#86A869] transition-colors focus:outline-none focus:ring-2 focus:ring-[#86A869] ${open ? 'shadow-lg' : 'cursor-pointer'} cursor-pointer`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {title}
        <span className={`ml-2 transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 bg-[#1a232b]/80 rounded-b-lg ${open ? 'max-h-[1000px] py-2 px-2 md:py-3 md:px-4' : 'max-h-0 py-0 px-2 md:px-4'}`}
        style={{}}
      >
        {open && <div className="text-white text-base md:text-lg" style={{lineHeight:'1.7'}}>{children}</div>}
      </div>
    </div>
  );
};




// ...existing code...


const FactoryCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      id="que-ofrecemos"
      className="rounded-2xl w-full mb-12"
      style={{
        maxWidth: '100%',
        background: 'linear-gradient(135deg, rgba(1,69,79,0.70) 0%, rgba(2,81,89,0.70) 60%, rgba(134,168,105,0.30) 100%)',
        boxShadow: '0 8px 32px 0 rgba(2,81,89,0.14)',
        border: '2px solid rgba(134,168,105,0.22)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 0.5rem',
      }}
    >
  <h2 className="hidden md:block text-xl md:text-3xl font-bold mb-4 text-white text-center drop-shadow-lg" style={{letterSpacing:'-0.01em'}}>¿Qué Ofrecemos?</h2>
  <div className="flex flex-col items-center w-full mx-auto gap-3 max-w-sm md:max-w-xl px-1 md:px-0">
        <AccordionSection title="¿Qué es una software factory colaborativa?" defaultOpen={mounted ? !isMobile : false}>
          <>
            Una software factory colaborativa es mucho más que un equipo de desarrollo: es una forma de trabajo donde especialistas técnicos y clientes se integran como socios estratégicos.<br className="hidden md:block" />
            En Folkode, cada proyecto se aborda con una visión compartida, combinando metodologías ágiles, comunicación continua y una cultura de colaboración auténtica.
          </>
        </AccordionSection>
        <AccordionSection title="Nuestro enfoque" defaultOpen={mounted ? !isMobile : false}>
          <>
            Nuestro enfoque permite transformar ideas en soluciones digitales robustas, escalables y alineadas con los objetivos de negocio.<br className="hidden md:block" />
            No solo desarrollamos software: diseñamos experiencias, optimizamos procesos y acompañamos a nuestros clientes en cada etapa, desde la concepción hasta la evolución del producto.
          </>
        </AccordionSection>
        <AccordionSection title="¿Por qué elegir una software factory colaborativa?" defaultOpen={mounted ? !isMobile : false}>
          <ul className="flex flex-col gap-2 text-base md:text-lg text-left mx-auto px-2" style={{color:'#e6edf3', fontWeight:400, lineHeight:'1.7'}}>
            <li className="flex items-start gap-2"><span className="inline-block mt-1 text-[#86A869]">●</span>Participación activa del cliente en todo el proceso.</li>
            <li className="flex items-start gap-2"><span className="inline-block mt-1 text-[#86A869]">●</span>Equipos multidisciplinarios que suman valor desde distintas perspectivas.</li>
            <li className="flex items-start gap-2"><span className="inline-block mt-1 text-[#86A869]">●</span>Adaptabilidad y flexibilidad para responder a cambios y nuevos desafíos.</li>
            <li className="flex items-start gap-2"><span className="inline-block mt-1 text-[#86A869]">●</span>Transparencia total en avances, decisiones y resultados.</li>
            <li className="flex items-start gap-2"><span className="inline-block mt-1 text-[#86A869]">●</span>Compromiso con la calidad, la innovación y el crecimiento conjunto.</li>
          </ul>
        </AccordionSection>
        {/* <AccordionSection title="Frase inspiradora" defaultOpen={!isMobile}> */}
          <p className="text-base md:text-lg italic text-center mt-2" style={{color:'#86A869'}}>
            En Folkode, creemos que la colaboración es el motor de la transformación digital.<br className="hidden md:block" />
            <span className="block mt-2">Tu visión, nuestro expertise: <span className="text-white font-semibold">juntos creamos soluciones que trascienden.</span></span>
          </p>
        {/* </AccordionSection> */}
      </div>
    </div>
  );
};

export default FactoryCard;