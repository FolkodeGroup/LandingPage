import React from "react";

const FactoryCard: React.FC = () => (
  <div
    id="que-ofrecemos"
    className="rounded-2xl p-8 w-full mb-12"
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
    }}
  >
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center drop-shadow-lg" style={{letterSpacing:'-0.01em'}}>¿Qué es una software factory colaborativa?</h2>
    <div className="flex flex-col items-center justify-left w-full mx-auto">
      <p className="text-white text-base md:text-lg mb-4 text-left" style={{lineHeight:'1.7', width:'90%'}}>
        Una software factory colaborativa es mucho más que un equipo de desarrollo: es una forma de trabajo donde especialistas técnicos y clientes se integran como socios estratégicos. En Folkode, cada proyecto se aborda con una visión compartida, combinando metodologías ágiles, comunicación continua y una cultura de colaboración auténtica.
      </p>
      <p className="text-white text-base md:text-lg mb-4 text-left" style={{lineHeight:'1.7', width:'90%'}}>
        Nuestro enfoque permite transformar ideas en soluciones digitales robustas, escalables y alineadas con los objetivos de negocio. No solo desarrollamos software: diseñamos experiencias, optimizamos procesos y acompañamos a nuestros clientes en cada etapa, desde la concepción hasta la evolución del producto.
      </p>
      <h3 className="text-lg md:text-xl font-bold text-[#86A869] mb-2 text-left drop-shadow-lg">¿Por qué elegir una software factory colaborativa?</h3>
      <ul className="text-white text-base md:text-lg mb-4 text-center mx-auto px-2" style={{color:'#e6edf3', fontWeight:400, lineHeight:'1.7', width:'90%', display:'inline-block'}}>
        <li className="mb-2">• Participación activa del cliente en todo el proceso.</li>
        <li className="mb-2">• Equipos multidisciplinarios que suman valor desde distintas perspectivas.</li>
        <li className="mb-2">• Adaptabilidad y flexibilidad para responder a cambios y nuevos desafíos.</li>
        <li className="mb-2">• Transparencia total en avances, decisiones y resultados.</li>
        <li className="mb-2">• Compromiso con la calidad, la innovación y el crecimiento conjunto.</li>
      </ul>
      <p className="text-base md:text-lg italic text-center mt-2" style={{color:'#86A869', width:'90%'}}>
        En Folkode, creemos que la colaboración es el motor de la transformación digital. Tu visión, nuestro expertise: <span className="text-white">juntos creamos soluciones que trascienden.</span>
      </p>
    </div>
  </div>
);

export default FactoryCard;