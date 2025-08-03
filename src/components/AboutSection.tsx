'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="py-20 bg-black lg:py-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
        {/* Imágenes y cuadrados de colores a la izquierda */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative h-[420px] md:h-[300px] mb-20 md:mb-0 contenedor-imagenes">
          {/* Cuadro verde inferior izquierda */}
          <div className="absolute -bottom-5 left-50 w-25 h-24 bg-[#5E8D6B] z-0 green-img" />

          {/* Cuadro azul superior derecha */}
          <div className="absolute top-0 right-45 w-36 h-28 bg-[#01454F] z-0 blue-img" />

          {/* Imagen de código (detrás) */}
          <Image
            src="/Compu.png"
            alt="Código"
            width={384}
            height={256}
            className="absolute top-8 left-30 w-64 h-48 object-cover shadow-lg z-10 border-4 border-black imagen-codigo"
            priority
          />

          {/* Imagen de persona (adelante) */}
          <Image
            src="/ChicoOficina.png"
            alt="Trabajo en equipo"
            width={384}
            height={256}
            className="absolute bottom-0 right-20 w-64 h-48 object-cover shadow-lg z-20 border-4 border-black imagen-persona"
            priority
          />
        </div>
        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-2 md:px-4">
          <h3 className="text-xl font-semibold mb-8 text-[#5E8D6B] text-left">
            Sobre Folkode
          </h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Sobre Nosotros
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Somos un equipo apasionado por el desarrollo web moderno y el diseño centrado en el usuario. Creamos soluciones digitales que destacan por su funcionalidad y estética.
          </motion.p>
        </div>
      </div>
    </section>
  )
}