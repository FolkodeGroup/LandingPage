'use client';

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CardComentarios from "../ui/CardComentarios";
import comentarios1 from "@/assets/images/comentarios1.png";
import comentarios2 from "@/assets/images/comentarios2.png";
import comentarios3 from "@/assets/images/comentarios3.png";

const images = [comentarios1.src, comentarios2.src, comentarios3.src];

export default function ComentariosEquipo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [index, setIndex] = useState(0);

  // Cambia imagen cada 6s si la sección está visible
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="w-full max-w-[1152px] min-h-[528px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:px-0"
    >
      {/* Columna Izquierda con animación de entrada */}
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-center overflow-hidden relative"
      >
        {/* Contenedor imagen con fade animado */}
        <motion.img
          key={index} // para que Framer detecte cambio y anime
          src={images[index]}
          alt={`Equipo ${index + 1}`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
      </motion.div>

      {/* Columna Derecha */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-start gap-4">
        <h2 className="text-[40px] font-bold leading-tight text-[#474A45] dark:text-[#D9D9D9]">
          Comentarios de Equipo
        </h2>
        <CardComentarios />
      </div>
    </section>
  );
}
