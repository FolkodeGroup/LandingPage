'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const personas = [
  {
    nombre: 'Celina Pereyra',
    puesto: 'FrontEnd Developer',
    comentario: 'Construyendo soluciones con pasión por la tecnología.',
    imagen: '/celi.jpg',
  },
  {
    nombre: 'Darío Giménez',
    puesto: 'Full Stack Developer',
    comentario: 'Creando experiencias de usuario memorables y funcionales.',
    imagen: '/Daro.png',
  },
  {
    nombre: 'Gabriel Sosa',
    puesto: 'Full Stack Developer',
    comentario: 'Lo que diga Daro.',
    imagen: '/gabrielsosa.png',
  },
  {
    nombre: 'Matias Daniel Alessandrello',
    puesto: 'Full Stack Developer',
    comentario:
      'Los detalles importan. Cada línea de código cuenta para lograr un producto excepcional.',
    imagen: '/matias.png',
  },
  {
    nombre: 'Agustin Ovejero',
    puesto: 'Aca va el Rol',
    comentario: 'Desarrollando soluciones innovadoras con un enfoque en la usabilidad.',
    imagen: '/Ovejero.png',
  },
  {
    nombre: 'Lucas Echavarria',
    puesto: 'Backend Developer',
    comentario: 'Desarrollando soluciones innovadoras con un enfoque en la usabilidad.',
    imagen: '/Ovejero.png',
  },
  {
    nombre: 'Fede Paal',
    puesto: 'Aca va el Rol',
    comentario: 'Desarrollando soluciones innovadoras con un enfoque en la usabilidad.',
    imagen: '/Ovejero.png',
  },
]

export default function CardComentarios() {
  const [index, setIndex] = useState(0)

  const siguiente = () => setIndex((prev) => (prev + 1) % personas.length)
  const anterior = () => setIndex((prev) => (prev - 1 + personas.length) % personas.length)

  useEffect(() => {
    const intervalo = setInterval(siguiente, 5000)
    return () => clearInterval(intervalo)
  }, [])

  const actual = personas[index]

  return (
    <>
      <div
        className="w-full max-w-md lg:max-w-none h-full border-2 rounded-xl p-4 flex flex-col items-center justify-between transition-all duration-300"
        style={{ borderColor: '#01454F' }}
      >
        <div className="contenedor-flechas-imagen flex items-center justify-center w-full">
          <button
            onClick={anterior}
            className="mr-3 flex items-center justify-center shrink-0"
            aria-label="Anterior"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
          </button>

          <div className="w-12 sm:w-16 md:w-24 lg:w-28 aspect-square rounded-full overflow-hidden border border-secondary flex items-center justify-center">
            <Image
              src={actual.imagen}
              alt={actual.nombre}
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <button
            onClick={siguiente}
            className="ml-3 flex items-center justify-center shrink-0"
            aria-label="Siguiente"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
          </button>
        </div>

        <p
          className="comentario text-center mt-0 mb-2 sm:mb-6 text-primary dark:text-text-tertiary max-w-[90%] sm:max-w-[75%] md:max-w-[80%] mx-auto break-words"
          style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            letterSpacing: '0.02em',
          }}
        >
          {actual.comentario}
        </p>

        <div className="text-center mt-2 sm:mt-4">
          <p
            className="font-bold text-primary dark:text-text-inverse mb-1"
            style={{
              fontSize: 'clamp(0.75rem, 1.2vw, 1.125rem)',
            }}
          >
            {actual.nombre}
          </p>
          <p
            className="text-secondary dark:text-text-tertiary"
            style={{
              fontSize: 'clamp(0.6rem, 1vw, 1rem)',
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
          .text-center.mt-2.sm\\:mt-4 {
            margin-top: 0.5rem !important;
          }
        }

        .contenedor-flechas-imagen {
          margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
          gap: clamp(0.5rem, 1vw, 0.75rem);
          /* Sin margin-top ni transform acá para no afectar pantallas chicas */
        }

        @media (min-width: 1024px) {
          .comentario {
            font-size: 1.5rem !important;
            line-height: 1.6 !important;
            max-width: 70% !important;
          }

          .text-center.mt-2.sm\\:mt-4 > p.font-bold {
            font-size: 1.4rem !important;
          }

          .text-center.mt-2.sm\\:mt-4 > p.text-secondary {
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
