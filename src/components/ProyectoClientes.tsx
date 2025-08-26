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
};

function ClienteCard({ image, title, description, url }: ClienteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Calcula el tilt según el mouse (más leve)
  const calcTilt = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const maxTilt = 7; // Ángulo más leve
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
      className="card-clientes"
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        z: 0,
        transition: 'box-shadow 0.3s',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)',
        willChange: 'transform',
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 0 0 0 rgba(0,0,0,0.10), 0 12px 40px 0 rgba(134,168,105,0.45)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='img-clientes'>
        <Image
          src={image}
          alt={title}
          width={image.width}
          height={image.height}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          priority
        />
      </div>
      <div className='text-clientes '>
        <h3 className="text-2xl font-bold mt-4">{title}</h3>
        <p className="text-md">{description}</p>
        <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors button-clientes">
          <a href={url} target="_blank" rel="noopener noreferrer">Ver Proyecto</a>
        </button>
      </div>
    </motion.div>
  );
}

export default function ProyClientes() {
    const proyectos = [
        { image: RadioGo, title: 'RadioGo', description: 'Página de entretenimiento de Radio', url: 'https://radio-go.vercel.app/' },
        { image: Andet, title: 'Andet', description: 'E-commerce de electrodomésticos', url: 'https://demo-andet-ecommerce.onrender.com/' },
        { image: Autopartes, title: 'Autopartes', description: 'Software Empresarial de autopartes', url: 'https://web-autopartes.vercel.app/' },
        { image: Luminova, title: 'Luminova', description: 'Software Empresarial de luminarias', url: 'https://luminova.pythonanywhere.com/' },
        { image: Revisteria, title: 'La Revisteria', description: 'E-commerce de libros y cómics', url: 'https://revisteria.pythonanywhere.com/' }
    ];
    return (
        <section id="proyectos" className="text-inverse section-proy-clientes">
            <div>
              <h3 className="text-4xl font-bold text-center mb-8 mt-16 text-white">Proyectos de Nuestros Clientes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 div-clientes">
                {proyectos.map((proyecto, index) => (
                    <ClienteCard key={index} {...proyecto} />
                ))}
            </div>
        </section>
    );
}