'use client'

import React, { useEffect, useState, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion, AnimatePresence, useInView } from 'framer-motion'

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
  const [animando, setAnimando] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [direction, setDirection] = useState(1)

  const siguiente = () => {
    if (animando) return
    setDirection(1)
    setAnimando(true)
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % personas.length)
      setAnimando(false)
    }, 700)
  }

  const anterior = () => {
    if (animando) return
    setDirection(-1)
    setAnimando(true)
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + personas.length) % personas.length)
      setAnimando(false)
    }, 700)
  }

  useEffect(() => {
    const intervalo = setInterval(siguiente, 8000)
    return () => clearInterval(intervalo)
  }, [])

  const actual = personas[index]

  const variants = {
    enter: (direction: number) => ({
      opacity: 1,
      rotateZ: direction * -90,
      x: direction * -100,
    }),
    center: {
      opacity: 1,
      rotateZ: 0,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 1,
      rotateZ: direction * 90,
      x: direction * 100,
    }),
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 3, ease: 'easeOut' }}
      className="w-[432px] h-[454px] border-2 rounded-xl flex flex-col items-center justify-between p-6"
      style={{ borderColor: '#01454F' }}
    >
      <div className="relative w-full flex items-center justify-center mb-2" style={{ height: '250px' }}>
        {/* Flecha izquierda */}
        <button
          onClick={anterior}
          className="absolute left-0 z-30 p-2 hover:text-[#01454F] text-[#01454F]"
          aria-label="Anterior"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Imagen */}
        <div className="z-20">
          <img
            src={actual.imagen}
            alt={actual.nombre}
            className="w-28 h-28 rounded-full object-cover border border-[#01454F]"
          />
        </div>

        {/* Flecha derecha */}
        <button
          onClick={siguiente}
          className="absolute right-0 z-30 p-2 hover:text-[#01454F] text-[#01454F]"
          aria-label="Siguiente"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute flex flex-col items-center mt-2 px-4"
            style={{ maxWidth: '90%' }}
          >
            <p className="text-[20px] text-[#343434] dark:text-[#D0D0D0] text-center mt-4">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
