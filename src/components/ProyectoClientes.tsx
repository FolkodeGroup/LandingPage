'use client'
import RadioGo from '@/assets/images/ProyClientes/RadioGo.png';
import Andet from '@/assets/images/ProyClientes/Andet.png';
import Autopartes from '@/assets/images/ProyClientes/Autopartes.png';
import Luminova from '@/assets/images/ProyClientes/Luminova.png';
import Revisteria from '@/assets/images/ProyClientes/Revisteria.png';

import Image, { StaticImageData } from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import { useRef } from 'react';


// Componente hijo para la tarjeta con efecto tilt

type ClienteCardProps = {
  image: StaticImageData;
  title: string;
  description: string;
  url: string;
  category: string;
};



function ClienteCard({ image, title, description, url, category }: ClienteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Tilt efecto
  const calcTilt = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const maxTilt = 7;
    const rotateY = ((x - midX) / midX) * maxTilt;
    const rotateX = -((y - midY) / midY) * maxTilt;
    return { rotateX, rotateY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const { rotateX: rx, rotateY: ry } = calcTilt(e, cardRef.current);
    rotateX.set(rx);
    rotateY.set(ry);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="proyecto-card"
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        z: 0,
        transition: 'box-shadow 0.3s',
        willChange: 'transform',
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 20px 60px 0 rgba(51,131,183,0.25)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="proyecto-img-wrapper">
        <span className="proyecto-etiqueta">{category}</span>
        <Image
          src={image}
          alt={title}
          width={image.width}
          height={image.height}
          className="proyecto-img"
          priority
        />
      </div>
      <div className="proyecto-info">
        <h3 className="proyecto-titulo">{title}</h3>
        <p className="proyecto-desc">{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="proyecto-btn">
          Ver Proyecto
        </a>
      </div>
    </motion.div>
  );
}


// Ajustes en el componente para asegurar legibilidad y diseño responsivo
export default function ProyClientes() {
  const proyectos = [
    { image: RadioGo, title: 'RadioGo', description: 'Página de entretenimiento de Radio', url: 'https://radio-go.vercel.app/', category: 'Web' },
    { image: Andet, title: 'Andet', description: 'E-commerce de electrodomésticos', url: 'https://demo-andet-ecommerce.onrender.com/', category: 'E-commerce' },
    { image: Autopartes, title: 'Autopartes', description: 'Software Empresarial de autopartes', url: 'https://web-autopartes.vercel.app/', category: 'Software' },
    { image: Luminova, title: 'Luminova', description: 'Software Empresarial de luminarias', url: 'https://luminova.pythonanywhere.com/', category: 'Software' },
    { image: Revisteria, title: 'La Revisteria', description: 'E-commerce de libros y cómics', url: 'https://revisteria.pythonanywhere.com/', category: 'E-commerce' }
  ];

  return (
    <section id="proyectos" className="proyectos-seccion">
      <div className="proyectos-cabecera">
        <h2 className="proyectos-titulo-principal">Proyectos de Nuestros Clientes</h2>
        <p className="proyectos-descripcion">Soluciones digitales a medida para empresas y emprendedores. Descubre cómo potenciamos negocios con tecnología y diseño.</p>
      </div>
      <div className="proyectos-contenedor">
        {proyectos.map((proyecto, index) => (
          <ClienteCard key={index} {...proyecto} />
        ))}
      </div>
    </section>
  );
}