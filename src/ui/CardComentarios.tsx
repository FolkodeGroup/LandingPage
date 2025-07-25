'use client'

import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const personas = [
  {
    nombre: 'Gabriel Sosa',
    puesto: 'Frontend Developer',
    comentario: 'Siempre buscamos mejorar cada detalle del diseño.',
    imagen: '/fotos/gabriel.jpg',
  },
  {
    nombre: 'Celina Pereyra',
    puesto: 'Backend Developer',
    comentario: 'Nos enfocamos en construir sistemas sólidos y escalables.',
    imagen: '/fotos/celina.jpg',
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

      <img
        src={actual.imagen}
        alt={actual.nombre}
        className="w-28 h-28 rounded-full object-cover border border-[#01454F] mt-4"
      />

      <p className="text-[20px] text-[#343434] dark:text-[#D0D0D0] text-center mt-6">
        {actual.comentario}
      </p>

      <div className="text-center mt-4">
        <p className="text-[14px] font-bold text-black dark:text-white">
          {actual.nombre}
        </p>
        <p className="text-[12px] text-[#696969] dark:text-[#A3A3A3]">
          {actual.puesto}
        </p>
      </div>
    </div>
  )
}
