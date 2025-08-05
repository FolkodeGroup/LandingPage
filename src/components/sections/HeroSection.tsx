'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from "@/components/Button"
import heroImage from '@/assets/images/heroimage.png'

export default function HeroSection() {
  const [navHeight, setNavHeight] = useState(0)

  useEffect(() => {
    const navbar = document.querySelector('nav.navbar') as HTMLElement | null
    if (!navbar) return

    const updateHeight = () => setNavHeight(navbar.offsetHeight)
    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(navbar)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative w-full flex items-center justify-center bg-black overflow-x-auto"
      style={{ marginTop: navHeight }}
    >
      <div className="w-full flex flex-col items-center justify-center">
        {/* Imagen hero completa */}
        <motion.img
          src={heroImage.src}
          alt="Hero"
          className="w-full h-auto max-h-[90vh] object-contain"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Textos alineados a la izquierda */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            absolute top-1/2 left-0 -translate-y-1/2 
            text-left px-6 sm:px-10 md:px-16
            max-w-none
          "
        >
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white whitespace-nowrap">
            Bienvenidos a Folkode Group
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 whitespace-nowrap"
          >
            Creamos soluciones digitales modernas y escalables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-5 flex justify-start"
          >
            <Button
              size="lg"
              className="
                px-6 py-3 text-sm 
                sm:px-10 sm:py-5 sm:text-lg 
                md:px-12 md:py-6 md:text-xl
                whitespace-nowrap text-white
              "
            >
              Contáctanos
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
