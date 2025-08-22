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
        className="w-full max-w-md lg:max-w-none h-full border-2 rounded-xl p-4 flex flex-col items-center justify-between transition-all duration-300"
        style={{ borderColor: '#01454F', backgroundColor: '#f9f9f9' }}
      >
        <div className="contenedor-flechas-imagen flex items-center justify-center w-full flex-row">
          <button
            onClick={anterior}
            className="mr-3 flex items-center justify-center shrink-0 pointer"
            aria-label="Anterior"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
          </button>

          <div className="w-12 sm:w-16 md:w-24 lg:w-28 aspect-square rounded-full overflow-hidden border border-secondary flex items-center justify-center">
            <Image
              src={actual.avatarUrl}
              alt={actual.author}
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <button
            onClick={siguiente}
            className="ml-3 flex items-center justify-center shrink-0 pointer"
            aria-label="Siguiente"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#01454F]" />
          </button>
        </div>

          <p
            className="font-bold text-primary dark:text-text-inverse mb-1"
            style={{
              fontSize: 'clamp(0.75rem, 1.2vw, 1.125rem)',
              color: '#000',
            }}
          >
            {actual.author}
          </p>
        

        <p
          className="comentario text-center mt-0 mb-2 sm:mb-6 dark:text-text-tertiary max-w-[90%] sm:max-w-[75%] md:max-w-[80%] mx-auto break-words"
          style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            letterSpacing: '0.02em',
            color: '#000',
          }}
        >
          {actual.comment}
        </p>
      </div>
    </>
  )
}