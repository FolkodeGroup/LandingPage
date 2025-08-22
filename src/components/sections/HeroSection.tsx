'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from "@/components/Button"
import heroImage from '@/assets/images/heroimage.png'
import TrianglesImage from '@/assets/images/trianglesoscuro.png'
import Link from "next/link";

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
      id="inicio"
      className="relative w-full flex items-center justify-center bg-black overflow-x-hidden hero-section"
      style={{ marginTop: navHeight }}
    >
      {/* Imagen del triángulo decorativo - ahora FUERA del contenedor */}
      <motion.img
        src={TrianglesImage.src}
        alt="HeroTriangles"
        className="hero-triangles absolute bottom-0 right-0 z-[1]"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="w-full flex flex-col items-center justify-center">
    {/* Imagen hero completa */}
    <motion.img
      src={heroImage.src}
      alt="Hero"
      className="hero-img"
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
        max-w-none z-[2]
      "
    >
      <h1 className="text-white whitespace-nowrap hero-title">
        Bienvenidos a Folkode Group
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="whitespace-nowrap hero-text"
      >
        Creamos soluciones digitales modernas y escalables.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-5 flex justify-start"
      >
      <Link href="#contacto">
        <Button className="whitespace-nowrap btn-primary hero-button">
          Contáctanos
        </Button>
      </Link>
      </motion.div>
    </motion.div>
  </div>
</section>
  )
}
