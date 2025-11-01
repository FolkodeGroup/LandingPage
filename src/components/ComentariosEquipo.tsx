'use client'

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import CardComentarios from "../ui/CardComentarios"
import comentarios1 from "@/assets/images/comentarios1.webp"
import comentarios2 from "@/assets/images/comentarios2.webp"
import comentarios3 from "@/assets/images/comentarios3.webp"

const images = [comentarios1.src, comentarios2.src, comentarios3.src]

export default function ComentariosEquipo() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={ref}>
      <div>
        <h1 className="text-4xl font-bold text-center text-white mb-8 mt-8">Comentarios Del Equipo</h1>
      </div>
      <div className="w-full flex justify-center overflow-hidden px-4 py-6">
        <div
          className="w-full max-w-[1152px] flex flex-col sm:flex-row items-stretch justify-between gap-4 sm:gap-6 md:gap-8"
          style={{ minWidth: 0 }}
        >
          {/* Columna izquierda (imagen con efecto de difuminado) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden sm:flex w-full sm:w-1/2 aspect-square items-center justify-center"
          >
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={images[index]}
                alt={`Equipo ${index + 1}`}
                width={600}
                height={600}
                className="w-full h-full object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* Columna derecha (slider con animación) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full sm:w-1/2 aspect-square flex items-center justify-center"
          >
            <div className="w-full h-full flex items-center justify-center equipo-text">
              <CardComentarios />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
