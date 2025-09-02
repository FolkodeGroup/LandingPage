'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className='mt-20'>
      <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-10 text-center">
            Sobre Nosotros
          </h3>
    <div id="sobre-folkode" className="py-10 bg-black lg:py-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
        {/* Imágenes y cuadrados de colores a la izquierda */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative h-[420px] md:h-[300px] mb-20 md:mb-0 contenedor-imagenes">

          {/* Imagen de persona (adelante) */}
          <Image
            src="/dark-about-img.png"
            alt="Trabajo en equipo"
            width={384}
            height={256}
          />
        </div>
        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-2 md:px-4">
          <h3 className="titulo-about">
            Sobre Folkode
          </h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl titulo-about-h3"
          >
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:text-xl text-white dark:text-gray-300 max-w-2xl mx-auto text-about"
          >
            Somos un equipo apasionado por el desarrollo web moderno y el diseño centrado en el usuario. Creamos soluciones digitales que destacan por su funcionalidad y estética.
          </motion.p>
        </div>
      </div>
    </div>
     </section>
  )
}