import React from "react";

const FactoryCard: React.FC = () => (
  <div className="bg-secondary rounded-xl p-8 text-white max-w-3xl mx-auto shadow-lg mb-12">
    <h2 className="text-2xl md:text-3xl font-bold mb-6">
      ¿Qué es una software factory colaborativa?
    </h2>
    <p className="text-base md:text-lg leading-relaxed">
      Un software factory colaborativa es un modelo de desarrollo que prioriza el trabajo conjunto entre especialistas técnicos y clientes para crear soluciones digitales a medida. En Folkode, esto se traduce en metodologías ágiles, comunicación constante y equipos multidisciplinarios que trabajan en sintonía para transformar ideas en productos funcionales, escalables y centrados en el usuario.
      <br /><br />
      Nuestro equipo trabaja junto a vos—desde la concepción hasta la implementación—asegurando que cada proyecto refleje tus objetivos reales y tu identidad de marca.
    </p>
  </div>
);

export default FactoryCard;