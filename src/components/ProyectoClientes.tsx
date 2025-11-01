'use client'
import RadioGo from '@/assets/images/ProyClientes/RadioGo.webp';
import Andet from '@/assets/images/ProyClientes/Andet.webp';
import Autopartes from '@/assets/images/ProyClientes/Autopartes.webp';
import Luminova from '@/assets/images/ProyClientes/Luminova.webp';
import Revisteria from '@/assets/images/ProyClientes/Revisteria.webp';
import Congreso from '@/assets/images/ProyClientes/congreso.webp';
import Image, { StaticImageData } from 'next/image';
import { motion, useMotionValue, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
// Utilidad simple de throttle tipada correctamente
function throttle<Args extends unknown[]>(fn: (...args: Args) => void, wait: number): (...args: Args) => void {
  let last = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Args;
  return function(this: unknown, ...args: Args) {
    const now = Date.now();
    lastArgs = args;
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        last = Date.now();
        timeout = null;
        fn.apply(this, lastArgs);
      }, wait - (now - last));
    }
  };
}
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';


// Componente hijo para la tarjeta con efecto tilt




type ClienteCardProps = {
  image: StaticImageData;
  title: string;
  description: string;
  url: string;
  category: string;
  onClick?: () => void;
};

function ClienteCard({ image, title, description, url, category, onClick }: ClienteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });
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

  // Throttle el movimiento del mouse para tilt
  const throttledMouseMove = useRef<((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | null>(null);

  if (!throttledMouseMove.current) {
    throttledMouseMove.current = throttle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!cardRef.current) return;
      const { rotateX: rx, rotateY: ry } = calcTilt(e, cardRef.current);
      rotateX.set(rx);
      rotateY.set(ry);
    }, 24);
  }
  const handleMouseMove = throttledMouseMove.current as (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="proyecto-card"
      ref={cardRef}
      style={{
        zIndex: 0,
        perspective: 1000,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s, transform 0.3s',
        opacity: isInView ? 1 : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 60px 0 rgba(51,131,183,0.25)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div>
        <div className="proyecto-img-wrapper">
          <span className="proyecto-etiqueta">{category}</span>
          <Image
            src={image}
            alt={title}
            width={image.width}
            height={image.height}
            className="proyecto-img"
            sizes="(max-width: 768px) 90vw, 400px"
          />
        </div>
        <div className="proyecto-info">
          <h3 className="proyecto-titulo">{title}</h3>
          <p className="proyecto-desc">{description}</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="proyecto-btn" onClick={e => e.stopPropagation()}>
            Ver Proyecto
          </a>
        </div>
      </div>
    </motion.div>
  );
}


// Tipos para el modal de proyectos
type ModalSection = {
  key: string;
  title: string;
  description: string;
  images?: string[];
  subsections?: ModalSection[];
};

type ModalData = {
  title: string;
  sections: ModalSection[];
};

// Estructura de datos para el modal del Congreso
const congresoModalData = {
  title: 'Congreso de Logística y Transporte',
  sections: [
    {
      key: 'home',
      title: 'Inicio',
      description: 'Portada principal del sitio, acceso rápido a información clave y bienvenida al Congreso.',
      images: [
        '/images/proyectos/congreso/home/home-1.webp',
        '/images/proyectos/congreso/home/home-2.webp',
      ],
    },
    {
      key: 'sobre',
      title: 'Sobre el Congreso',
      description: 'Información general y detalles sobre el evento.',
      subsections: [
        {
          key: 'disertantes',
          title: 'Disertantes',
          description: 'Listado y perfiles de los disertantes del congreso.',
          images: [
            '/images/proyectos/congreso/sobre-el-congreso/disertantes/disertantes.webp',
          ],
        },
        {
          key: 'empresas',
          title: 'Empresas',
          description: 'Empresas participantes y colaboradoras.',
          images: [
            '/images/proyectos/congreso/sobre-el-congreso/empresas/empresas-1.webp',
          ],
        },
        {
          key: 'info',
          title: 'Información General',
          description: 'Detalles generales sobre el evento y su organización.',
          images: [
            '/images/proyectos/congreso/sobre-el-congreso/informacion-general/sobre-el-congreso.webp',
          ],
        },
        {
          key: 'programa',
          title: 'Programa',
          description: 'Programa completo del congreso, cronograma y actividades.',
          images: [
            '/images/proyectos/congreso/sobre-el-congreso/programa/programa-1.webp',
            '/images/proyectos/congreso/sobre-el-congreso/programa/programa-2.webp',
          ],
        },
      ],
    },
    {
      key: 'registro',
      title: 'Registro',
      description: 'Formulario y proceso de inscripción al evento.',
      images: [
        '/images/proyectos/congreso/registro/registro.webp',
        '/images/proyectos/congreso/registro/registro-1.webp',
        '/images/proyectos/congreso/registro/registro-2.webp',
        '/images/proyectos/congreso/registro/registro-3.webp',
      ],
    },
    {
      key: 'contacto',
      title: 'Contacto',
      description: 'Información de contacto y canales de comunicación.',
      images: [
        '/images/proyectos/congreso/contacto/contacto.webp',
      ],
    },
    {
      key: 'historia',
      title: 'Historia del Campus',
      description: 'Reseña histórica y galería del campus universitario.',
      images: [
        '/images/proyectos/congreso/historia/historia-1.webp',
        '/images/proyectos/congreso/historia/historia-2.webp',
        '/images/proyectos/congreso/historia/historia-3.webp',
        '/images/proyectos/congreso/historia/historia-4.webp',
      ],
    },
  ],
};
// Modal para mostrar detalles del proyecto
function ProyectoModal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  const [sectionIdx, setSectionIdx] = useState<number>(0);
  const [subIdx, setSubIdx] = useState<number>(0);
  const [imgIdx, setImgIdx] = useState<number>(0);

  const section = data.sections[sectionIdx];
  const isSubsection = !!section.subsections;
  const subsection = isSubsection ? section.subsections![subIdx] : undefined;
  const images = isSubsection ? subsection?.images ?? [] : section.images ?? [];
  const description = isSubsection ? subsection?.description ?? '' : section.description;
  const title = isSubsection ? subsection?.title ?? '' : section.title;


  // Navegación de imágenes
  const handlePrevImg = () => setImgIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const handleNextImg = () => setImgIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  // Cambio de sección/subsección
  const handleSection = (idx: number) => {
    setSectionIdx(idx);
    setSubIdx(0);
    setImgIdx(0);
  };
  const handleSubsection = (idx: number) => {
    setSubIdx(idx);
    setImgIdx(0);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1400px',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          zIndex: 9999,
          background: 'none',
          boxSizing: 'border-box',
        }}
        onClick={e => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            width: '100%',
            minWidth: 0,
            height: 'auto',
            minHeight: '600px',
            maxHeight: '90vh',
            background: 'linear-gradient(135deg, #0a2342 0%, #163d5c 100%)',
            borderRadius: 20,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            border: '1px solid rgba(30, 111, 163, 0.3)',
            display: 'flex',
            boxSizing: 'border-box',
            padding: '1rem',
          }}
        >
        <button 
          style={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            cursor: 'pointer', 
            fontSize: 24, 
            color: '#ffffff', 
            background: 'rgba(30, 111, 163, 0.2)', 
            borderRadius: '50%', 
            padding: 10, 
            border: 'none', 
            zIndex: 10001,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }} 
          onClick={onClose}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 0.2)'}
        >
          <FaTimes />
        </button>
        
        {/* Sidebar */}
        <aside style={{ 
          width: 250, 
          background: 'rgba(10, 35, 66, 0.8)', 
          padding: '40px 0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 8, 
          borderRight: '1px solid rgba(30, 111, 163, 0.3)' 
        }}>
          {data.sections.map((sec: ModalSection, idx: number) => (
            <div key={sec.key}>
              <button
                style={{
                  width: '100%', 
                  background: idx === sectionIdx ? 'linear-gradient(90deg, #1e6fa3 0%, #0a2342 100%)' : 'transparent',
                  color: idx === sectionIdx ? '#ffffff' : '#b3d9ff', 
                  border: 'none', 
                  padding: '14px 24px', 
                  textAlign: 'left', 
                  fontWeight: idx === sectionIdx ? 600 : 500, 
                  cursor: 'pointer', 
                  fontSize: 16, 
                  borderRadius: 8, 
                  marginBottom: 4, 
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.3px'
                }}
                onClick={() => handleSection(idx)}
                onMouseEnter={e => {
                  if (idx !== sectionIdx) {
                    e.currentTarget.style.background = 'rgba(30, 111, 163, 0.2)';
                  }
                }}
                onMouseLeave={e => {
                  if (idx !== sectionIdx) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {sec.title}
              </button>
              {/* Subsections */}
              {sec.subsections && idx === sectionIdx && (
                <div style={{ marginLeft: 16, marginTop: 8 }}>
                  {sec.subsections?.map((sub: ModalSection, sidx: number) => (
                    <button
                      key={sub.key}
                      style={{
                        width: '90%', 
                        background: sidx === subIdx ? 'linear-gradient(90deg, #1e6fa3 0%, #0a2342 100%)' : 'transparent',
                        color: sidx === subIdx ? '#ffffff' : '#b3d9ff', 
                        border: 'none', 
                        padding: '10px 20px', 
                        textAlign: 'left', 
                        fontSize: 14, 
                        cursor: 'pointer', 
                        borderRadius: 6, 
                        marginBottom: 2, 
                        fontWeight: sidx === subIdx ? 600 : 400, 
                        transition: 'all 0.2s ease',
                      }}
                      onClick={() => handleSubsection(sidx)}
                      onMouseEnter={e => {
                        if (sidx !== subIdx) {
                          e.currentTarget.style.background = 'rgba(30, 111, 163, 0.15)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (sidx !== subIdx) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {sub.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>
        
        {/* Main content */}
        <main style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 40, 
          position: 'relative', 
          minWidth: 0,
          color: '#ffffff'
        }}>
          <h2 style={{ 
            color: '#ffffff', 
            fontSize: 32, 
            marginBottom: 12, 
            fontWeight: 700, 
            textAlign: 'center',
            letterSpacing: '0.5px'
          }}>
            {title}
          </h2>
          <p style={{ 
            color: '#b3d9ff', 
            fontSize: 18, 
            marginBottom: 30, 
            maxWidth: 600, 
            textAlign: 'center', 
            fontWeight: 400, 
            lineHeight: 1.5
          }}>
            {description}
          </p>
          
          {/* Slider de imágenes */}
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: 700, 
            height: 420, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'rgba(0, 0, 0, 0.3)', 
            borderRadius: 16, 
            overflow: 'hidden', 
            marginBottom: 20, 
            border: '1px solid rgba(30, 111, 163, 0.2)' 
          }}>
            <button 
              onClick={handlePrevImg} 
              style={{ 
                position: 'absolute', 
                left: 15, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'rgba(30, 111, 163, 0.8)', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '50%', 
                width: 44, 
                height: 44, 
                fontSize: 18, 
                cursor: 'pointer', 
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 0.8)'}
            >
              <FaChevronLeft />
            </button>
            
            {images && images.length > 0 ? (
              <Image
                src={images[imgIdx]}
                alt={title}
                width={700}
                height={420}
                sizes="(max-width: 900px) 90vw, 700px"
                style={{ 
                  maxWidth: '95%', 
                  maxHeight: '95%', 
                  borderRadius: 12, 
                  objectFit: 'contain',
                  background: '#000000'
                }}
              />
            ) : (
              <div style={{ color: '#1e6fa3', fontSize: 20 }}>Sin imágenes</div>
            )}
            
            <button 
              onClick={handleNextImg} 
              style={{ 
                position: 'absolute', 
                right: 15, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'rgba(30, 111, 163, 0.8)', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '50%', 
                width: 44, 
                height: 44, 
                fontSize: 18, 
                cursor: 'pointer', 
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 0.8)'}
            >
              <FaChevronRight />
            </button>
            
            {/* Miniaturas debajo del slider */}
            {images && images.length > 1 && (
              <div style={{ 
                position: 'absolute', 
                bottom: 15, 
                left: '50%', 
                transform: 'translateX(-50%)', 
                display: 'flex', 
                gap: 8, 
                zIndex: 2 
              }}>
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setImgIdx(idx)} 
                    style={{ 
                      border: 'none', 
                      background: 'transparent', 
                      padding: 0, 
                      cursor: 'pointer' 
                    }}
                  >
                    <Image
                      src={img}
                      alt={`miniatura-${idx}`}
                      width={60}
                      height={36}
                      sizes="60px"
                      style={{ 
                        borderRadius: 6, 
                        border: idx === imgIdx ? '2px solid #1e6fa3' : '1px solid rgba(255, 255, 255, 0.3)', 
                        opacity: idx === imgIdx ? 1 : 0.7, 
                        transition: 'all 0.2s ease', 
                        objectFit: 'cover',
                        background: '#000000'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProyClientes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const proyectos = [
    {
      image: Congreso,
      title: 'Congreso',
      description: 'Página oficial del Congreso De Logística y Transporte de la Universidad Nacional Guillermo Brown',
      url: 'https://www.congresologistica.unab.edu.ar/',
      category: 'Web',
      onClick: () => {
        setModalData(congresoModalData);
        setModalOpen(true);
      },
    },
    { image: RadioGo, title: 'RadioGo', description: 'Página de Streaming de radio y entretenimiento', url: 'https://radiogo.com.ar/', category: 'Web' },
    { image: Andet, title: 'Andet', description: 'E-commerce de productos industriales de servicios eléctricos', url: 'https://demo-andet-ecommerce.onrender.com/', category: 'E-commerce' },
    { image: Autopartes, title: 'Autopartes', description: 'E-commerce Empresarial de gestión de autopartes', url: 'https://web-autopartes.vercel.app/', category: 'Software' },
    { image: Luminova, title: 'Luminova', description: 'Software ERP de ensamblado de luminarias con productos importados', url: 'https://luminova.pythonanywhere.com/', category: 'Software' },
    { image: Revisteria, title: 'La Revisteria', description: 'E-commerce de libros y cómics de colección', url: 'https://revisteria.pythonanywhere.com/', category: 'E-commerce' }
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
      <AnimatePresence>
        {modalOpen && modalData && (
          <ProyectoModal data={modalData} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}