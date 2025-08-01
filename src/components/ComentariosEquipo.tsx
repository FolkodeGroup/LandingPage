'use client'

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import CardComentarios from "../ui/CardComentarios"
import comentarios1 from "@/assets/images/comentarios1.png"
import comentarios2 from "@/assets/images/comentarios2.png"
import comentarios3 from "@/assets/images/comentarios3.png"

const images = [comentarios1.src, comentarios2.src, comentarios3.src]

export default function ComentariosEquipo() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={ref}
      className="w-full flex justify-center overflow-hidden px-4 py-6"
    >
      <div
        className="
          w-full max-w-[1152px]
          flex flex-row items-stretch justify-between
          gap-4 sm:gap-6 md:gap-8
        "
      >
        {/* Columna izquierda (imagen) */}
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-1/2 aspect-square flex items-center justify-center"
        >
          <motion.img
            key={index}
            src={images[index]}
            alt={`Equipo ${index + 1}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </motion.div>

        {/* Columna derecha */}
        <div className="w-1/2 aspect-square flex items-center justify-center">
          <CardComentarios />
        </div>
      </div>
    </section>
  )
}
