'use client'

import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const personas = [
  {
    comment: 'Con Folkode logramos que RadioGo se convirtiera en una plataforma moderna y dinámica. Nos acompañaron en cada etapa, entendiendo la esencia de nuestro proyecto y potenciando la experiencia de nuestros oyentes.',
    author: 'Giuliana Mancuso',
    avatarUrl: '/images/avatars/giuliana.webp',
    proyecto: 'RadioGo',
  },
  {
    comment: 'El equipo de Folkode hizo posible que nuestro e-commerce Andet fuera intuitivo y robusto. Nos guiaron en todo momento y resolvieron cada desafío con profesionalismo y cercanía.',
    author: 'Yanina Gomez',
    avatarUrl: '/images/avatars/yanina.webp',
    proyecto: 'Andet',
  },
  {
    comment: 'La solución empresarial que desarrollaron para Autopartes superó nuestras expectativas. La comunicación fue constante y el resultado, un software que realmente facilita nuestro trabajo diario.',
    author: 'Javier Retamozo',
    avatarUrl: '/images/avatars/javier.webp',
    proyecto: 'Autopartes',
  },
  {
    comment: 'Folkode entendió perfectamente las necesidades de nuestro negocio. El software de luminarias Luminova que crearon es eficiente y fácil de usar, y el proceso fue transparente y colaborativo.',
    author: 'Agustina Ramirez',
    avatarUrl: '/images/avatars/agustina.webp',
    proyecto: 'Luminova',
  },
  {
    comment: 'Transformaron nuestra tienda en línea La Revisteria en una experiencia ágil y atractiva para los clientes. Nos explicaron cada paso y estuvieron atentos a todos los detalles, logrando un resultado excelente.',
    author: 'Tomás Ochoa',
    avatarUrl: '/images/avatars/tomas.webp',
    proyecto: 'La Revisteria',
  },
  {
    comment: 'Ahora en la radio todo funciona como debe ser. Y eso, para nosotros, vale oro.',
    author: 'Axel Diaz',
    avatarUrl: '/images/avatars/axel.webp',
    proyecto: 'RadioGo',
  },
]

const ClientComent: React.FC = () => {
  const [index, setIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const siguiente = () => setIndex((prev) => (prev + 1) % personas.length)
  const anterior = () => setIndex((prev) => (prev - 1 + personas.length) % personas.length)

  // IntersectionObserver para pausar autoplay fuera de viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    let observer: IntersectionObserver | null = null;
    const node = sectionRef.current;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setIsInView(entries[0].isIntersecting);
    };
    observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0.05,
    });
    observer.observe(node);
    return () => {
      if (observer && node) observer.unobserve(node);
    };
  }, []);

  // Autoplay solo si está visible
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (isInView) {
      intervalRef.current = setInterval(siguiente, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView]);

  const actual = personas[index]

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null)
  const touchCurrentX = useRef<number | null>(null)
  const SWIPE_THRESHOLD = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchCurrentX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchCurrentX.current === null) return
    const delta = touchCurrentX.current - touchStartX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) siguiente()
      else anterior()
    }
    touchStartX.current = null
    touchCurrentX.current = null
  }

  // Detect mobile to enable swipe only on responsive mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    // Usar requestAnimationFrame para evitar forzar layout
    requestAnimationFrame(() => {
      check()
    })
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center mb-8 mt-16 text-white">Comentarios De los Clientes</h1>
      </div>
      <div
        ref={sectionRef}
        {...(isMobile
          ? {
              onTouchStart: handleTouchStart,
              onTouchMove: handleTouchMove,
              onTouchEnd: handleTouchEnd,
            }
          : {})}
        className="max-w-4xl w-full h-full border-0 p-6 flex flex-col items-center justify-center mx-auto transition-all duration-300 relative rounded-lg"
        style={{ backgroundColor: '#fff', minHeight: '13rem'}}
      >
        {/* Imagen + Nombre */}
        <button
          onClick={anterior}
          className="absolute left-2 z-10 flex items-center justify-center shrink-0 pointer flecha-comentario"
          aria-label="Anterior"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            top: 'calc(50% - 3.5rem)',
            transform: 'none',
          }}
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
        </button>
        <button
          onClick={siguiente}
          className="absolute right-2 z-10 flex items-center justify-center shrink-0 pointer flecha-comentario"
          aria-label="Siguiente"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            top: 'calc(50% - 3.5rem)',
            transform: 'none',
          }}
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
        </button>
        <style jsx>{`
          @media (min-width: 1024px) {
            .flecha-comentario {
              top: 50% !important;
              transform: translateY(-50%) !important;
            }
          }
        `}</style>
        <div className="flex flex-col items-center w-full">
          {/* Avatar + Texto (solo slide activo) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center w-full avatar-cm-client">
            {/* Avatar + Nombre */}
            <div className="flex flex-col items-center min-w-[90px] sm:min-w-[120px] name-cm-client">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                <Image
                  src={actual.avatarUrl}
                  alt={actual.author}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <p className="font-bold text-black mt-2">{actual.author}</p>
              {actual.proyecto && (
                <button
                  className="px-3 py-1 mt-2 rounded-full text-xs font-semibold bg-[#01454F] text-white shadow-sm border-none cursor-default"
                  style={{ letterSpacing: '0.04em' }}
                  tabIndex={-1}
                >
                  {actual.proyecto}
                </button>
              )}
            </div>
            {/* Texto + Estrellas */}
            <div className="flex flex-1 flex-col justify-center min-h-[100px] text-left text-cm-client" style={{height: '100%'}}>
              <div className="flex flex-col justify-center h-full flex-1">
                <p
                  className="text-black mb-3"
                  style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {actual.comment}
                </p>
                <div className="flex justify-center sm:justify-start self-center sm:self-auto">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">★</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientComent;