'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const personas = [
  {
    comment: 'Laburan con prolijidad que da gusto. Se nota que les gusta lo que hacen, y eso hoy es difícil de encontrar.',
    author: 'Giuliana Mancuso',
    avatarUrl: '/images/avatars/giuliana.jpeg',
  },
  {
    comment:"No fue solo desarrollo, me sentí parte de él. Estuvieron en cada detalle, explicando sin vueltas y bancando todas nuestras dudas.",
    author:"Yanina Gomez",
    avatarUrl:"/images/avatars/yanina.jpeg"
},
{
    comment:"Desde que lanzamos la web nueva, los clientes no paran de elogiarla. ¡Un golazo!",
    author:"Javier Retamozo",
    avatarUrl:"/images/avatars/javier.jpeg"
},
{
    comment:"Después de varias decepciones, encontramos gente que cumple. nos escucharon, nos entendieron, y lo que entregaron fue mejor de lo que imaginábamos.",
    author:"Agustina Ramirez",
    avatarUrl:"/images/avatars/agustina.jpeg"
},
{
    comment:"El diseño es lo que queríamos y la estructura está pensada para crecer. se nota que saben lo que hacen.",
    author:"Tomás Ochoa",
    avatarUrl:"/images/avatars/tomas.jpeg"
},
{
    comment:"Ahora todo funciona como debe ser. Y eso, para mí, vale oro.",
    author:"Axel Diaz",
    avatarUrl:"/images/avatars/axel.jpeg"
},
]
export default function ClientesComentarios() {
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
      <div>
        <h1 className="text-4xl font-bold text-center mb-8 mt-16 text-white">Comentarios De los Clientes</h1>
      </div>
      <div
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
        {/* Flecha izquierda */}

        {/* Avatar + Texto */}
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
        {/* Flecha derecha */}
  {/* Las flechas ahora están posicionadas absolutamente */}
  </div>
      </div>
    </>
  );
};