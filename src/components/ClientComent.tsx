'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const personas = [
  {
    comment: 'Laburan con prolijidad que da gusto. Se nota que les gusta lo que hacen, y eso hoy es difícil de encontrar.',
    author: 'Giulana Mancuso',
    avatarUrl: '/images/avatars/giuliana.png',
  },
  {
    comment:"El equipo de Folkode ha sido increíble. Su profesionalismo y dedicación nos ayudaron a llevar nuestro proyecto al siguiente nivel.",
    author:"Juan Pérez",
    avatarUrl:"/images/avatars/juan.jpeg"
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
    <div
      className="w-full max-w-4xl h-full border-0 p-6 flex flex-col lg:flex-row items-center lg:items-center justify-center justify-self-center transition-all duration-300"
      style={{ backgroundColor: '#fff', minHeight: '13rem'}}
    >
      {/* Imagen + Nombre */}
      <div className="contenedor-flechas-imagen flex items-center justify-center w-full flex-row">
          <button
            onClick={anterior}
            className="mr-3 flex items-center justify-center shrink-0 pointer"
            aria-label="Anterior"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
        </button>
      <div className="flex flex-col items-center justify-center lg:items-start lg:mr-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
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
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
        <p
          className="text-black mb-3"
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
            letterSpacing: '0.02em',
          }}
        >
          {actual.comment}
        </p>

        {/* Estrellas (ejemplo con 5 fijas, podés mapearlo si es dinámico) */}
        <div className="flex justify-center lg:justify-start">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="text-yellow-500 text-xl">★</span>
            ))}
        </div>
      </div>
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