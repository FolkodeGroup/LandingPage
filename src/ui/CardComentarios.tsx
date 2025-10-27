'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const personas = [
  {
    nombre: 'Celina Pereyra',
    puesto: 'FrontEnd Developer',
    comentario: 'Trabajar en Folkode me hizo sentir parte de algo más grande. Aprendí a confiar en el equipo y a disfrutar el proceso creativo compartido.',
  imagen: '/celi.webp',
  },
  {
    nombre: 'Daro Giménez',
    puesto: 'Full Stack Developer',
    comentario: 'La colaboración en Folkode me impulsó a salir de mi zona de confort y descubrir nuevas formas de resolver problemas junto a personas increíbles.',
  imagen: '/Daro.webp',
  },
  {
    nombre: 'Gabriel Sosa',
    puesto: 'Full Stack Developer',
    comentario: 'En Folkode encontré un ambiente donde cada idea suma. Aprendí que juntos podemos transformar cualquier reto en una oportunidad.',
  imagen: '/gabrielsosa.webp',
  },
  {
    nombre: 'Matias Daniel Alessandrello',
    puesto: 'Full Stack Developer',
    comentario: 'El trabajo en equipo en Folkode me enseñó a valorar la diversidad de perspectivas. Ahora cada proyecto se siente más enriquecedor.',
  imagen: '/matias.webp',
  },
  {
    nombre: 'Agustin Ovejero',
    puesto: 'BackEnd Developer',
    comentario: 'Unirme a Folkode me permitió crecer profesionalmente y personalmente. El apoyo constante del equipo hace que cada día sea motivador.',
  imagen: '/Ovejero.webp',
  },
  {
    nombre: 'Lucas Echavarria',
    puesto: 'Backend Developer',
    comentario: 'Colaborar en Folkode me ayudó a mejorar mi comunicación y a entender que el éxito se construye entre todos, paso a paso.',
  imagen: '/cuqui.webp',
  },
  {
    nombre: 'Fede Paal',
    puesto: 'FrontEnd Developer',
    comentario: 'En Folkode aprendí que la creatividad florece cuando se comparte. El trabajo colaborativo me inspira a dar lo mejor de mí.',
  imagen: '/fede.webp',
  },
  /* {
    nombre: 'Paula Bigorra',
    puesto: 'BackEnd Developer',
    comentario: 'Ser parte de Folkode me mostró el valor de la confianza y el respeto. Juntos logramos resultados que superan cualquier expectativa.',
  imagen: '/pau.webp',
  }, */
  {
    nombre: 'Mauricio Barreras',
    puesto: 'FrontEnd Developer',
    comentario: 'La experiencia en Folkode me enseñó que el aprendizaje nunca termina. Cada integrante aporta algo único y eso nos hace crecer.',
  imagen: '/mauri.webp',
  },
  {
    nombre: 'Sasha Porchia',
    puesto: 'FrontEnd Developer',
    comentario: 'Trabajar en equipo en Folkode me dio la libertad de experimentar y aprender de los demás. Hoy disfruto más cada desafío.',
  imagen: '/sasha.webp',
  },
  {
    nombre: 'Maia Avalos',
    puesto: 'FullStack Developer',
    comentario: 'En Folkode descubrí que la colaboración es la clave para avanzar. El ambiente de apoyo me motiva a seguir mejorando.',
  imagen: '/Mai.webp',
  },
  {
    nombre: 'Facundo Carrizo',
    puesto: 'Backend Developer',
    comentario: 'Folkode me enseñó que los logros compartidos son los más gratificantes. El trabajo en equipo potencia nuestras capacidades.',
  imagen: '/Facu.webp',
  },
  {
    nombre: 'Nahuel Dalesio',
    puesto: 'FullStack Developer',
    comentario: 'La cultura colaborativa de Folkode me ayudó a crecer y a confiar en mis ideas. Juntos logramos resultados sorprendentes.',
  imagen: '/nahue.webp',
  },
]


export default function CardComentarios() {
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false })

  // Touch swipe refs
  const touchStartX = useRef<number | null>(null)
  const touchCurrentX = useRef<number | null>(null)
  const SWIPE_THRESHOLD = 50 // px

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

  const siguiente = () => setIndex((prev) => (prev + 1) % personas.length)
  const anterior = () => setIndex((prev) => (prev - 1 + personas.length) % personas.length)

  useEffect(() => {
    if (!isInView) return;
    const intervalo = setInterval(siguiente, 5000)
    return () => clearInterval(intervalo)
  }, [isInView])

  const actual = personas[index]

  return (
    <>
      <div
        ref={ref}
        {...(isMobile
          ? {
              onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => {
                touchStartX.current = e.touches[0].clientX
                touchCurrentX.current = null
              },
              onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => {
                touchCurrentX.current = e.touches[0].clientX
              },
              onTouchEnd: () => {
                if (touchStartX.current === null || touchCurrentX.current === null) return
                const delta = touchCurrentX.current - touchStartX.current
                if (Math.abs(delta) > SWIPE_THRESHOLD) {
                  if (delta < 0) siguiente()
                  else anterior()
                }
                touchStartX.current = null
                touchCurrentX.current = null
              },
            }
          : {})}
        className="w-full h-full border-2 rounded-xl p-2 sm:p-4 flex flex-col items-center justify-between transition-all duration-300 bg-white/80 dark:bg-black/40 card-comentarios-equipo"
        style={{ borderColor: '#01454F' }}
      >
  <div className="contenedor-flechas-imagen flex items-center justify-center w-full">
          <button
            onClick={anterior}
            className="mr-2 sm:mr-3 flex items-center justify-center shrink-0 pointer"
            aria-label="Anterior"
          >
            <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#01454F]" />
          </button>

          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 aspect-square rounded-full overflow-hidden border border-secondary flex items-center justify-center bg-white/60 dark:bg-black/30 img-com-equipo">
            <Image
              src={actual.imagen}
              alt={actual.nombre}
              width={112}
              height={112}
              className="object-cover w-full h-full"
              sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 112px"
            />
          </div>

          <button
            onClick={siguiente}
            className="ml-2 sm:ml-3 flex items-center justify-center shrink-0 pointer"
            aria-label="Siguiente"
          >
            <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#01454F]" />
          </button>
        </div>

        <p
          className="comentario text-center mt-2 mb-2 sm:mb-6 text-primary dark:text-text-tertiary max-w-[95vw] sm:max-w-[75%] md:max-w-[80%] mx-auto break-words text-com-equipo"
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
            letterSpacing: '0.02em',
          }}
        >
          {actual.comentario}
        </p>

        <div className="text-center mt-2 sm:mt-4">
          <p
            className="font-bold text-primary dark:text-text-inverse mb-1"
            style={{
              fontSize: 'clamp(0.85rem, 2vw, 1.2rem)',
            }}
          >
            {actual.nombre}
          </p>
          <p
            className="text-secondary dark:text-text-tertiary"
            style={{
              fontSize: 'clamp(0.7rem, 1.5vw, 1.05rem)',
            }}
          >
            {actual.puesto}
          </p>
        </div>
      </div>

      <style jsx>{`
        .comentario {
          line-height: 1.25;
        }
        @media (max-width: 767px) {
          .comentario {
            line-height: 1.1 !important;
            margin-bottom: 0.25rem !important;
          }
          .text-center.mt-2.sm\:mt-4 {
            margin-top: 0.5rem !important;
          }
          .contenedor-flechas-imagen {
            margin-bottom: 0.75rem;
            gap: 0.5rem;
          }
        }
        .contenedor-flechas-imagen {
          margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
          gap: clamp(0.5rem, 1vw, 0.75rem);
        }
        @media (min-width: 1024px) {
          .comentario {
            font-size: 1.5rem !important;
            line-height: 1.6 !important;
            max-width: 70% !important;
          }
          .text-center.mt-2.sm\:mt-4 > p.font-bold {
            font-size: 1.4rem !important;
          }
          .text-center.mt-2.sm\:mt-4 > p.text-secondary {
            font-size: 1.2rem !important;
          }
          .contenedor-flechas-imagen {
            margin-top: clamp(1rem, 3vw, 2rem);
            transform: translateY(clamp(0px, 1vw, 10px));
          }
          .contenedor-flechas-imagen > button {
            width: 28px;
            height: 28px;
          }
          .contenedor-flechas-imagen > div {
            width: 96px !important;
            height: 96px !important;
          }
        }
      `}</style>
    </>
  )
}
