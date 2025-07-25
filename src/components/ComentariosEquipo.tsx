'use client';

import React from "react";
import CardComentarios from "../ui/CardComentarios";
import comentarios1 from "@/assets/images/comentarios1.png";
import comentarios2 from "@/assets/images/comentarios2.png";
import comentarios3 from "@/assets/images/comentarios3.png";

export default function ComentariosEquipo() {
  return (
    <section className="w-full max-w-[1152px] min-h-[528px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:px-0">
      {/* Columna Izquierda: carrusel con animación CSS */}
      <div className="w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-center overflow-hidden relative">
        <div className="carousel w-full h-full relative flex">
          <img
            src={comentarios1.src}
            alt="Equipo 1"
            className="w-full h-full object-contain flex-shrink-0"
          />
          <img
            src={comentarios2.src}
            alt="Equipo 2"
            className="w-full h-full object-contain flex-shrink-0"
          />
          <img
            src={comentarios3.src}
            alt="Equipo 3"
            className="w-full h-full object-contain flex-shrink-0"
          />
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-start gap-4">
        <h2 className="text-[40px] font-bold leading-tight text-[#474A45] dark:text-[#D9D9D9]">
          Comentarios de Equipo
        </h2>
        <CardComentarios />
      </div>

      <style jsx>{`
        .carousel {
          animation: slide 20s linear infinite;
          width: 300%;
        }
        .carousel img {
          width: 100%;
        }
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          33% {
            transform: translateX(0%);
          }
          34% {
            transform: translateX(-100%);
          }
          66% {
            transform: translateX(-100%);
          }
          67% {
            transform: translateX(-200%);
          }
          100% {
            transform: translateX(-200%);
          }
        }
      `}</style>
    </section>
  );
}
