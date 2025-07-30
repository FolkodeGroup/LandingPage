'use client'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section className="py-20 bg-black lg:py-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
        {/* Imágenes y cuadrados de colores a la izquierda */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative h-[420px] md:h-[300px] mb-20 md:mb-0">
          {/* Cuadrado azul detrás arriba */}
          <div className="static md:absolute left-20 md:left-40 lg:left-0 -top-1 w-40 h-16 xl:left-160 md:w-30 md:h-30 lg:w-64 lg:h-24 xl:w-20 xl:h-32 bg-[#01454F] z-0" />
          {/* Cuadrado verde detrás abajo */}
          <div className="static md:absolute left-20 top-10 w-20 h-20 md:w-20 md:h-70 bg-[#5E8D6B] z-0" />
          {/* Imagen secundaria (Compu) */}
          <img
            src="/Compu.png"
            alt="Código"
            className="static md:absolute md:left-10 md:top-5 w-24 h-32 md:w-60 md:h-56 lg:w-64 lg:h-32 xl:w-80 xl:h-40 2xl:w-96 2xl:h-48 object-cover rounded-lg shadow-lg z-20 border-4 border-black" />
          {/*  className="static md:absolute left-0 top-4 w-24 h-32 md:w-60 md:h-52 lg:w-160 lg:h-65 object-cover rounded-lg shadow-lg z-20 border-4 border-black" */}


          {/* Imagen principal (ChicoOficina) */}
          <img
            src="/ChicoOficina.png"
            alt="Trabajo en equipo"
            className="static md:absolute md:left-30 md:top-20 w-32 h-32 md:w-60 md:h-56 lg:w-64 lg:h-32 xl:w-80 xl:h-40 2xl:w-96 2xl:h-48 object-cover rounded-lg shadow-lg z-20 border-4 border-black"
          /* className="static md:absolute left-30 top-20 w-24 h-32 md:w-60 md:h-55 lg:w-64 lg:h-32 xl:w-80 xl:h-40 2xl:w-96 2xl:h-48 object-cover rounded-lg shadow-lg z-20 border-4 border-black" */
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