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
      <div
        className="backdrop-blur-xl bg-white/1 border border-white/10 rounded-2xl shadow-none p-8 md:p-12"
        style={{
          boxShadow: 'none',
          border: '2px solid rgba(134,168,105,0.08)',
          maxWidth: '1000px',
          minWidth: '740px',
          background:
            'linear-gradient(135deg, rgba(1,69,79,0.03) 0%, rgba(2,81,89,0.03) 60%, rgba(134,168,105,0.01) 100%)',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-white hero-title py-2 text-h1"
          style={{
            textShadow: '0 2px 12px #01454F88',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'visible',
          }}
        >
          Bienvenidos a Folkode
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="hero-text text-lg md:text-xl text-white"
          style={{
            textShadow: '0 1px 8px #02515988',
            fontWeight: 500,
            marginBottom: '1.5rem',
          }}
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
            <Button
              className="whitespace-nowrap btn-primary hero-button shadow-xl border-2 transition-all duration-200"
              style={{
                border: '2px solid #86A869',
                background: 'linear-gradient(90deg, rgba(134,168,105,0.85) 0%, rgba(2,81,89,0.85) 100%)',
                color: '#fff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '2px solid #3383b7';
                e.currentTarget.style.background = 'linear-gradient(90deg, rgba(51,131,183,0.95) 0%, rgba(134,168,105,0.85) 100%)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(2,81,89,0.28)';
                e.currentTarget.style.transform = 'scale(1.07)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '2px solid #86A869';
                e.currentTarget.style.background = 'linear-gradient(90deg, rgba(134,168,105,0.85) 0%, rgba(2,81,89,0.85) 100%)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(2,81,89,0.18)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Contáctanos
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>
  )
}
