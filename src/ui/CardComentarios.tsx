'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const personas = [
  {
    nombre: 'Gabriel Sosa',
    puesto: 'Frontend Developer',
    comentario: 'Siempre buscamos mejorar cada detalle del diseño.',
    imagen: '/assets/images/gabriel.jpg',
  },
  {
    nombre: 'Celina Pereyra',
    puesto: 'Backend Developer',
    comentario: 'Nos enfocamos en construir sistemas sólidos y escalables.',
    imagen: '/assets/images/celina.jpg',
  },
]

export default function CardComentariosClient() {
  const [index, setIndex] = useState(0)

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % personas.length)
  }

  const anterior = () => {
    setIndex((prev) => (prev - 1 + personas.length) % personas.length)
  }

  useEffect(() => {
    const intervalo = setInterval(siguiente, 5000)
    return () => clearInterval(intervalo)
  }, [])

  const actual = personas[index]

  return (
    <div
      className="w-[432px] h-[454px] border-2 rounded-xl flex flex-col items-center justify-between p-6 transition-all duration-300"
      style={{ borderColor: '#01454F' }}
    >
      <div className="flex justify-between w-full">
        <button onClick={anterior}>
          <FaChevronLeft className="w-5 h-5 text-[#01454F]" />
        </button>
        <button onClick={siguiente}>
          <FaChevronRight className="w-5 h-5 text-[#01454F]" />
        </button>
      </div>

      <div className="w-28 h-28 rounded-full overflow-hidden border border-secondary mt-4 flex items-center justify-center">
        <Image
          src={actual.imagen}
          alt={actual.nombre}
          width={112}
          height={112}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <p className="text-[20px] text-primary dark:text-text-tertiary text-center mt-6">
        {actual.comentario}
      </p>

      <div className="text-center mt-4">
        <p className="text-[14px] font-bold text-primary dark:text-text-inverse">
          {actual.nombre}
        </p>
        <p className="text-[12px] text-secondary dark:text-text-tertiary">
          {actual.puesto}
        </p>
      </div>
    </div>
  )
}