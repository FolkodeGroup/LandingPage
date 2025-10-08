
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from 'swiper/types';
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

// Ejemplo de tecnologías, puedes expandir o modificar según el branding
const tecnologias = [
  { nombre: "MySQL", icono: "/mysql.svg", descripcion: "Base de datos relacional popular." },
  { nombre: "Astro", icono: "/astro.svg", descripcion: "Framework moderno para sitios rápidos." },
  { nombre: "Angular", icono: "/angular.svg", descripcion: "Framework robusto para aplicaciones web." },
  { nombre: "Bash", icono: "/bash.svg", descripcion: "Automatización y scripting en sistemas Unix." },
  { nombre: "C", icono: "/c.svg", descripcion: "Lenguaje de programación de bajo nivel." },
  { nombre: "C++", icono: "/cpp.svg", descripcion: "Lenguaje orientado a objetos y alto rendimiento." },
  { nombre: "Python", icono: "/python.svg", descripcion: "Lenguaje versátil para IA, web y más." },
  { nombre: "CSS", icono: "/css.svg", descripcion: "Estilos para la web moderna." },
  { nombre: "TypeScript", icono: "/typescript.svg", descripcion: "JavaScript tipado para proyectos robustos." },
  { nombre: "MongoDB", icono: "/mongodb.svg", descripcion: "Base de datos NoSQL flexible." },
  { nombre: "PowerShell", icono: "/powershell.svg", descripcion: "Automatización en sistemas Windows." },
  { nombre: "React.js", icono: "/react.svg", descripcion: "Biblioteca para interfaces interactivas." },
  { nombre: "Node.js", icono: "/nodejs.svg", descripcion: "Entorno para aplicaciones backend rápidas." },
  { nombre: "Next.js", icono: "/nextjs.svg", descripcion: "Framework para React con SSR y SSG." },
  { nombre: "Tailwind CSS", icono: "/tailwind.svg", descripcion: "Framework de utilidades para estilos rápidos." },
  { nombre: "GraphQL", icono: "/graphql.svg", descripcion: "API flexible y eficiente para datos." },
  // ...agrega más según tu stack
];

export default function CarruselTecnologias() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    let observer: IntersectionObserver | null = null;
    const node = containerRef.current;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setIsInView(entries[0].isIntersecting);
    };
    observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0.05,
    });
    observer.observe(node);
    return () => {
      if (observer && node) observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;
    if (isInView) {
      swiperRef.current.autoplay?.start?.();
    } else {
      swiperRef.current.autoplay?.stop?.();
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="carrusel-tecnologias w-full py-4 px-2 rounded-xl shadow-lg relative overflow-hidden"
      style={{ background: '#01454F' }}
    >
      {/* Glow esquina inferior izquierda */}
      <div
        className="absolute left-0 bottom-0 w-60 h-60 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 0% 90%, #01454F 0%, #01454F00 80%) bottom-",
        }}
      />
      <div className="relative z-10">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={6}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {tecnologias.map((tec) => (
            <SwiperSlide key={tec.nombre}>
              <div
                className="flex flex-col items-center justify-center gap-2 group cursor-pointer"
                title={tec.descripcion}
              >
                <Image
                  src={tec.icono}
                  alt={tec.nombre}
                  width={40}
                  height={40}
                  sizes="40px"
                  className="w-10 h-10 mb-1 transition-transform group-hover:scale-110 group-hover:drop-shadow-lg"
                  style={{ filter: "drop-shadow(0 2px 8px #00c6ff)" }}
                  loading="lazy"
                />
                <span className="text-white text-xs font-medium group-hover:text-[#00c6ff] transition-colors">
                  {tec.nombre}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
