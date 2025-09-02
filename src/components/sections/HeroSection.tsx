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
  className="relative w-full flex items-center justify-center hero-section min-h-[300px] !pb-0"
      style={{ marginTop: navHeight }}
    >
      {/* Imagen del triángulo decorativo - ahora FUERA del contenedor */}
      <motion.img
        src={TrianglesImage.src}
        alt="HeroTriangles"
        className="hero-triangles absolute bottom-0 right-0 z-[1]"
        initial={{ x: 200, opacity: 0, scale: 0.8 }}   // Empieza desplazado a la derecha
        animate={{ x: 0, opacity: 1, scale: 1 }}       // Termina en posición normal
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="w-full h-full relative">
    {/* Imagen hero completa */}
    <picture className="w-full h-full">
      <source media="(max-width: 768px)" srcSet="/PC-Hero-img.png" />
      <motion.img
        src={heroImage.src}
        alt="Hero"
        className="hero-img"
        initial={{ scale: 1.2, opacity: 0, scaleX: -1 }}
        animate={{ scale: 1, opacity: 1, scaleX: -1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </picture>

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
      <h1 className="text-white whitespace-nowrap hero-title py-2">
        Bienvenidos a Folkode
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
