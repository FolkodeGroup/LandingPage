'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from "@/components/Button"
import heroImage from '@/assets/images/heroimage.png'

export default function HeroSection() {
  const [navHeight, setNavHeight] = useState(0)

  useEffect(() => {
    const navbar = document.getElementById('main-navbar')
    if (navbar) {
      setNavHeight(navbar.offsetHeight)
    }
  }, [])

  return (
    <section
      className="relative w-full flex flex-col items-start justify-center"
      style={{ paddingTop: navHeight }}
    >
      <div className="relative w-full">
        <motion.img
          src={heroImage.src}
          alt="Hero"
          className="w-full h-auto object-contain"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        <motion.div
          initial={{ opacity: 0, x: '100vw' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-10 transform -translate-y-1/2 px-6 max-w-xl text-white"
          style={{ maxWidth: '400px' }}
        >
          {/* Título en un solo renglón */}
          <h1 className="text-4xl md:text-6xl font-bold whitespace-nowrap">
            Bienvenidos a Folkode Group
          </h1>

          {/* Párrafo debajo del título, sin quiebre de línea */}
          <motion.p
            initial={{ opacity: 0, x: '100vw' }}
            animate={{ opacity: 1, x: 40 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-4 text-lg md:text-xl text-gray-200 whitespace-nowrap"
          >
            Creamos soluciones digitales modernas y escalables.
          </motion.p>

          {/* Botón alineado a la derecha */}
          <motion.div
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 60 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-6 flex justify-end"
          >
            <Button
              size="lg"
              className="px-10 py-6 text-2xl md:px-16 md:py-8 md:text-3xl"
            >
              Contáctanos
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
