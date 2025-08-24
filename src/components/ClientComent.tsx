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
      className="w-full max-w-4xl h-full border-0 p-6 flex flex-col lg:flex-row items-center lg:items-center justify-center justify-self-center transition-all duration-300"
      style={{ backgroundColor: '#fff', minHeight: '13rem'}}
    >
      {/* Imagen + Nombre */}
      <div className="contenedor-flechas-imagen flex items-center justify-between w-full flex-row">
        {/* Flecha izquierda */}
        <button
          onClick={anterior}
          className="mr-3 flex items-center justify-center shrink-0 pointer"
          aria-label="Anterior"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
        </button>

        {/* Avatar + Texto */}
        <div className="flex flex-row items-center gap-8 justify-center w-full avatar-cm-client">
          {/* Avatar + Nombre */}
          <div className="flex flex-col items-center min-w-[120px] name-cm-client">
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
          <div className="flex flex-col text-left text-cm-client">
            <p
              className="text-black mb-3"
              style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
                letterSpacing: '0.02em',
              }}
            >
              {actual.comment}
            </p>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
            </div>
          </div>
        </div>
        {/* Flecha derecha */}
        <button
          onClick={siguiente}
          className="ml-3 flex items-center justify-center shrink-0 pointer"
          aria-label="Siguiente"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
        </button>
      </div>
    </div>
  </>
);
};