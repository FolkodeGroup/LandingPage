
'use client'
import RadioGo from '@/assets/images/ProyClientes/RadioGo.webp';
import Andet from '@/assets/images/ProyClientes/Andet.webp';
import Autopartes from '@/assets/images/ProyClientes/Autopartes.webp';
import Luminova from '@/assets/images/ProyClientes/Luminova.webp';
import Revisteria from '@/assets/images/ProyClientes/Revisteria.webp';
import Congreso from '@/assets/images/ProyClientes/congreso.webp';
import Image, { StaticImageData } from 'next/image';
import { motion, useMotionValue, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  previewImages?: string[];
};

function ClienteCard({ image, title, description, url, category, onClick, previewImages }: ClienteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Detectar móvil para ajustar estilos y lógica
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tilt efecto solo en desktop
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
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      className="proyecto-card"
      ref={cardRef}
      style={{
        zIndex: 0,
        perspective: 1000,
        cursor: onClick && !isMobile ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s, transform 0.3s',
        opacity: isInView ? 1 : 0,
        minHeight: isMobile ? 420 : undefined, // Altura mínima en móvil
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
      }}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      whileHover={!isMobile ? {
        scale: 1.02,
        boxShadow: '0 20px 60px 0 rgba(51,131,183,0.25)',
      } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={onClick && !isMobile ? handleCardClick : undefined}
    >
      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <div className="proyecto-img-wrapper">
          <span className="proyecto-etiqueta">{category}</span>
          {/* Mini-slider de imágenes dentro de la card */}
          {previewImages && previewImages.length > 0 ? (
            <div 
              style={{ position: 'relative', width: '100%', height: '200px', cursor: onClick && !isMobile ? 'pointer' : 'default' }}
              onClick={onClick && !isMobile ? handleCardClick : undefined}
            >
              <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true,
                }}
                loop={true}
                onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                {previewImages.map((imgSrc, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      src={imgSrc}
                      alt={`${title} - ${idx + 1}`}
                      fill
                      className="proyecto-img"
                      sizes="(max-width: 768px) 90vw, 400px"
                      style={{ objectFit: 'cover', cursor: onClick && !isMobile ? 'pointer' : 'default' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Indicador de cantidad de imágenes */}
              <div style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: 12,
                fontSize: '0.75rem',
                fontWeight: 600,
                zIndex: 10,
                pointerEvents: 'none',
              }}>
                {currentImageIndex + 1} / {previewImages.length}
              </div>
            </div>
          ) : (
            <Image
              src={image}
              alt={title}
              width={image.width}
              height={image.height}
              className="proyecto-img"
              sizes="(max-width: 768px) 90vw, 400px"
              style={{ cursor: onClick && !isMobile ? 'pointer' : 'default' }}
              onClick={onClick && !isMobile ? handleCardClick : undefined}
            />
          )}
        </div>
        <div className="proyecto-info" style={{ cursor: onClick && !isMobile ? 'pointer' : 'default', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <h3 className="proyecto-titulo">{title}</h3>
          <p className="proyecto-desc">{description}</p>
          {/* El botón solo se muestra en móvil fuera de la card, no aquí */}
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

// Estructura de datos para el modal de Luminova
const luminovaModalData = {
  title: 'Luminova',
  sections: [
    {
      key: 'login',
      title: 'Login',
      description: 'Pantalla de acceso seguro al sistema Luminova ERP.',
      images: [
        '/images/proyectos/luminova/login/luminova-login.webp',
      ],
    },
    {
      key: 'admin',
      title: 'Panel Administrador',
      description: 'Gestión centralizada de usuarios, permisos y configuraciones.',
      images: [
        '/images/proyectos/luminova/administrador/luminova-admin-01.webp',
        '/images/proyectos/luminova/administrador/luminova-admin-02.webp',
        '/images/proyectos/luminova/administrador/luminova-admin-03.webp',
        '/images/proyectos/luminova/administrador/luminova-admin-04.webp',
      ],
    },
    {
      key: 'compras',
      title: 'Módulo de Compras',
      description: 'Gestión de órdenes de compra, proveedores y recepción de materiales.',
      images: [
        '/images/proyectos/luminova/compras/luminova-compras-01.webp',
        '/images/proyectos/luminova/compras/luminova-compras-02.webp',
        '/images/proyectos/luminova/compras/luminova-compras-03.webp',
        '/images/proyectos/luminova/compras/luminova-compras-04.webp',
        '/images/proyectos/luminova/compras/luminova-compras-05.webp',
      ],
    },
    {
      key: 'deposito',
      title: 'Depósito y Stock',
      description: 'Control de inventario, movimientos y ubicaciones de stock.',
      images: [
        '/images/proyectos/luminova/deposito/luminova-deposito-01.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-02.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-03.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-04.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-05.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-06.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-07.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-08.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-09.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-10.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-11.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-12.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-13.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-14.webp',
      ],
    },
    {
      key: 'produccion',
      title: 'Producción',
      description: 'Planificación y seguimiento de procesos productivos.',
      images: [
        '/images/proyectos/luminova/produccion/luminova-produccion-01.webp',
        '/images/proyectos/luminova/produccion/luminova-produccion-02.webp',
        '/images/proyectos/luminova/produccion/luminova-produccion-03.webp',
        '/images/proyectos/luminova/produccion/luminova-produccion-04.webp',
        '/images/proyectos/luminova/produccion/luminova-produccion-05.webp',
        '/images/proyectos/luminova/produccion/luminova-produccion-06.webp',
        '/images/proyectos/luminova/produccion/luminova-produccion-07.webp',
      ],
    },
    {
      key: 'ventas',
      title: 'Ventas',
      description: 'Gestión de clientes, presupuestos y facturación.',
      images: [
        '/images/proyectos/luminova/ventas/luminova-ventas-01.webp',
        '/images/proyectos/luminova/ventas/luminova-ventas-02.webp',
        '/images/proyectos/luminova/ventas/luminova-ventas-03.webp',
        '/images/proyectos/luminova/ventas/luminova-ventas-04.webp',
      ],
    },
  ],
};

// Estructura de datos para el modal de Autopartes Deloreans
const autopartesModalData = {
  title: 'Autopartes Deloreans',
  sections: [
    {
      key: 'galeria',
      title: 'Galería de Capturas',
      description: 'Visualiza la experiencia y funcionalidades de Autopartes Deloreans a través de estas capturas de pantalla.',
      images: [
        '/images/proyectos/autopartes-deloreans/autopartes-01.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-02.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-03.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-04.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-05.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-06.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-07.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-08.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-09.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-10.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-11.webp',
      ],
    },
  ],
};

// Estructura de datos para el modal de Andet
const andetModalData = {
  title: 'Andet',
  sections: [
    {
      key: 'galeria',
      title: 'Galería de Capturas',
      description: 'Visualiza la experiencia y funcionalidades de Andet a través de estas capturas de pantalla.',
      images: [
        '/images/proyectos/andet/andet-01.webp',
        '/images/proyectos/andet/andet-02.webp',
        '/images/proyectos/andet/andet-03.webp',
        '/images/proyectos/andet/andet-04.webp',
        '/images/proyectos/andet/andet-05.webp',
        '/images/proyectos/andet/andet-06.webp',
        '/images/proyectos/andet/andet-07.webp',
      ],
    },
  ],
};

// Estructura de datos para el modal de La Revisteria
const revisteriaModalData = {
  title: 'La Revisteria',
  sections: [
    {
      key: 'galeria',
      title: 'Galería de Capturas',
      description: 'Descubre la experiencia de usuario y las funcionalidades de La Revisteria a través de estas capturas de pantalla.',
      images: [
        '/images/proyectos/revisteria/revisteria-01.webp',
        '/images/proyectos/revisteria/revisteria-02.webp',
        '/images/proyectos/revisteria/revisteria-03.webp',
        '/images/proyectos/revisteria/revisteria-04.webp',
        '/images/proyectos/revisteria/revisteria-05.webp',
        '/images/proyectos/revisteria/revisteria-06.webp',
        '/images/proyectos/revisteria/revisteria-07.webp',
        '/images/proyectos/revisteria/revisteria-08.webp',
        '/images/proyectos/revisteria/revisteria-09.webp',
      ],
    },
  ],
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

// Estructura de datos para el modal de RadioGo
const radioGoModalData = {
  title: 'RadioGo',
  sections: [
    {
      key: 'galeria',
      title: 'Galería de Capturas',
      description: 'Explora la interfaz y funcionalidades de RadioGo a través de estas capturas de pantalla.',
      images: [
        '/images/proyectos/radio-go/radio-go-01.webp',
        '/images/proyectos/radio-go/radio-go-02.webp',
        '/images/proyectos/radio-go/radio-go-03.webp',
        '/images/proyectos/radio-go/radio-go-04.webp',
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

  // Obtener el link del proyecto según el título del modal
  const projectLinks: Record<string, string> = {
    'Congreso de Logística y Transporte': 'https://www.congresologistica.unab.edu.ar/',
    'RadioGo': 'https://radiogo.com.ar/',
    'Andet': 'https://demo-andet-ecommerce.onrender.com/',
    'Autopartes Deloreans': 'https://web-autopartes.vercel.app/',
    'Luminova': 'https://luminovaerp.pythonanywhere.com/',
    'La Revisteria': 'https://revisteria.pythonanywhere.com/'
  };
  const projectUrl = projectLinks[data.title] || '';


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
                width={1600}
                height={900}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  borderRadius: 16,
                  objectFit: 'contain',
                  background: '#000000',
                  boxShadow: '0 8px 32px 0 rgba(2,81,89,0.14)'
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
        {/* Botón Ver Proyecto debajo del slider */}
        {projectUrl && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proyecto-btn"
              style={{
                fontSize: 18,
                padding: '12px 36px',
                borderRadius: 8,
                background: 'linear-gradient(90deg, #3383b7 0%, #86A869 100%)',
                color: '#fff',
                fontWeight: 600,
                boxShadow: '0 4px 24px 0 rgba(2,81,89,0.18)',
                textDecoration: 'none',
                marginTop: 8,
                transition: 'background 0.2s, box-shadow 0.2s',
                letterSpacing: '0.5px',
                textAlign: 'center',
                minWidth: 180
              }}
            >
              Ver Proyecto
            </a>
          </div>
        )}
        </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProyClientes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Utilidad para extraer todas las imágenes de un modalData (incluyendo subsecciones)
  function getAllModalImages(modalData: ModalData): string[] {
    let imgs: string[] = [];
    for (const section of modalData.sections) {
      if (section.images) imgs = imgs.concat(section.images);
      if (section.subsections) {
        for (const sub of section.subsections) {
          if (sub.images) imgs = imgs.concat(sub.images);
        }
      }
    }
    return imgs;
  }

  const proyectos = [
    {
      image: Congreso,
      title: 'Congreso',
      description: 'Página oficial del Congreso De Logística y Transporte de la Universidad Nacional Guillermo Brown',
      url: 'https://www.congresologistica.unab.edu.ar/',
      category: 'Web',
      previewImages: isMobile ? getAllModalImages(congresoModalData) : [
        '/images/proyectos/congreso/home/home-1.webp',
        '/images/proyectos/congreso/home/home-2.webp',
        '/images/proyectos/congreso/registro/registro.webp',
        '/images/proyectos/congreso/contacto/contacto.webp',
      ],
      onClick: isMobile ? undefined : () => {
        setModalData(congresoModalData);
        setModalOpen(true);
      },
    },
    {
      image: RadioGo,
      title: 'RadioGo',
      description: 'Página de Streaming de radio y entretenimiento',
      url: 'https://radiogo.com.ar/',
      category: 'Web',
      previewImages: isMobile ? getAllModalImages(radioGoModalData) : [
        '/images/proyectos/radio-go/radio-go-01.webp',
        '/images/proyectos/radio-go/radio-go-02.webp',
        '/images/proyectos/radio-go/radio-go-03.webp',
        '/images/proyectos/radio-go/radio-go-04.webp',
      ],
      onClick: isMobile ? undefined : () => {
        setModalData(radioGoModalData);
        setModalOpen(true);
      },
    },
    {
      image: Andet,
      title: 'Andet',
      description: 'E-commerce de productos industriales de servicios eléctricos',
      url: 'https://demo-andet-ecommerce.onrender.com/',
      category: 'E-commerce',
      previewImages: isMobile ? getAllModalImages(andetModalData) : [
        '/images/proyectos/andet/andet-01.webp',
        '/images/proyectos/andet/andet-02.webp',
        '/images/proyectos/andet/andet-03.webp',
        '/images/proyectos/andet/andet-04.webp',
      ],
      onClick: isMobile ? undefined : () => {
        setModalData(andetModalData);
        setModalOpen(true);
      },
    },
    {
      image: Autopartes,
      title: 'Autopartes Deloreans',
      description: 'E-commerce Empresarial de gestión de autopartes',
      url: 'https://web-autopartes.vercel.app/',
      category: 'Software',
      previewImages: isMobile ? getAllModalImages(autopartesModalData) : [
        '/images/proyectos/autopartes-deloreans/autopartes-01.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-02.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-03.webp',
        '/images/proyectos/autopartes-deloreans/autopartes-04.webp',
      ],
      onClick: isMobile ? undefined : () => {
        setModalData(autopartesModalData);
        setModalOpen(true);
      },
    },
    {
      image: Luminova,
      title: 'Luminova',
      description: 'Software ERP de ensamblado de luminarias con productos importados',
      url: 'https://luminovaerp.pythonanywhere.com/ ',
      category: 'Software',
      previewImages: isMobile ? getAllModalImages(luminovaModalData) : [
        '/images/proyectos/luminova/login/luminova-login.webp',
        '/images/proyectos/luminova/administrador/luminova-admin-01.webp',
        '/images/proyectos/luminova/compras/luminova-compras-01.webp',
        '/images/proyectos/luminova/deposito/luminova-deposito-01.webp',
      ],
      onClick: isMobile ? undefined : () => {
        setModalData(luminovaModalData);
        setModalOpen(true);
      },
    },
    {
      image: Revisteria,
      title: 'La Revisteria',
      description: 'E-commerce de libros y cómics de colección',
      url: 'https://revisteria.pythonanywhere.com/',
      category: 'E-commerce',
      previewImages: isMobile ? getAllModalImages(revisteriaModalData) : [
        '/images/proyectos/revisteria/revisteria-01.webp',
        '/images/proyectos/revisteria/revisteria-02.webp',
        '/images/proyectos/revisteria/revisteria-03.webp',
        '/images/proyectos/revisteria/revisteria-04.webp',
      ],
      onClick: isMobile ? undefined : () => {
        setModalData(revisteriaModalData);
        setModalOpen(true);
      },
    }
  ];
  return (
    <section id="proyectos" className="proyectos-seccion">
      <div className="proyectos-cabecera">
        <h2 className="proyectos-titulo-principal">Proyectos de Nuestros Clientes</h2>
        <p className="proyectos-descripcion">Soluciones digitales a medida para empresas y emprendedores. Descubre cómo potenciamos negocios con tecnología y diseño.</p>
      </div>
      
      {isMobile ? (
        // Vista móvil: Slider horizontal estilo Netflix
        <div style={{ width: '100%', padding: '0 1rem' }}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            grabCursor={true}
            pagination={{ clickable: true }}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
            }}
            style={{
              paddingBottom: '40px',
            }}
          >
            {proyectos.map((proyecto, index) => (
              <SwiperSlide key={index}>
                <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                  <ClienteCard {...proyecto} />
                  {/* Botón centrado debajo de la card en móvil */}
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <a
                      href={proyecto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proyecto-btn"
                      style={{
                        fontSize: 16,
                        padding: '10px 24px',
                        borderRadius: 8,
                        background: 'linear-gradient(90deg, #3383b7 0%, #86A869 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        boxShadow: '0 4px 24px 0 rgba(2,81,89,0.18)',
                        textDecoration: 'none',
                        marginTop: 12,
                        marginBottom: 8,
                        transition: 'background 0.2s, box-shadow 0.2s',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        minWidth: 140,
                      }}
                    >
                      Ver Proyecto
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        // Vista desktop: Grid tradicional
        <div className="proyectos-contenedor">
          {proyectos.map((proyecto, index) => (
            <ClienteCard key={index} {...proyecto} />
          ))}
        </div>
      )}
      
      <AnimatePresence>
        {modalOpen && modalData && (
          <ProyectoModal data={modalData} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}