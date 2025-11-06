'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <section className="mt-20 fade-in">
      <h3 className="text-3xl md:text-4xl font-extrabold text-center text-white drop-shadow-lg tracking-tight mb-2">
        Sobre Nosotros
      </h3>
      <div
        id="sobre-folkode"
        className="w-full flex justify-center items-center"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          className="w-full mx-auto flex item-strech flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-4 md:p-12"
          style={{
            boxShadow: '0 8px 32px 0 rgba(2,81,89,0.14)',
            border: '2px solid rgba(134,168,105,0.22)',
            background: 'rgba(13,17,23,0.85)',
            maxWidth: '100%',
          }}
        >
          {/* Imagen a la izquierda en desktop, arriba en mobile */}
          <div className="self-center md:w-1/2 flex items-center relative mb-6 md:mb-0" >
            <Image
              src="/image.png"
              alt="Trabajo en equipo"
              width={440}
              height={440}
              quality={95}
              sizes="(max-width: 768px) 90vw, 440px"
              className="w-full h-full object-cover rounded-xl shadow-lg border border-white/20"
              style={{ objectFit: 'cover', boxShadow: '0 4px 24px 0 rgba(2,81,89,0.18)' }}
              priority
            />
          </div>
          {/* Texto a la derecha o debajo */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-1 md:px-4" ref={ref}>
            <h3 className="text-lg md:text-2xl font-bold text-[#86A869] mb-2 tracking-tight text-center md:text-left">
              Sobre Folkode
            </h3>
            <div className="bg-[#1a232b]/80 rounded-xl p-4 md:p-6 flex flex-col gap-4 shadow-inner border border-[#86A869]/20">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-base md:text-lg text-white dark:text-gray-300 text-center md:text-left"
                style={{
                  fontWeight: 400,
                  lineHeight: '1.7',
                }}
              >
                Somos un equipo apasionado por el desarrollo web moderno y el diseño centrado en el usuario.<br className="hidden md:block" />
                <span className="block mt-2">Creamos soluciones digitales que combinan funcionalidad, estética y tecnología de vanguardia.</span>
              </motion.p>
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-semibold text-[#86A869] text-base md:text-lg mb-1 text-center md:text-left">¿Qué nos diferencia?</span>
                <ul className="list-none flex flex-col gap-3 pl-0 text-base md:text-lg">
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-1 text-[#86A869]">●</span>
                    <span>Innovación constante: Usamos las últimas tecnologías para soluciones robustas y escalables.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-1 text-[#86A869]">●</span>
                    <span>Colaboración activa: Trabajamos junto a nuestros clientes para entender y superar sus expectativas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-1 text-[#86A869]">●</span>
                    <span>Compromiso con la calidad: Cada línea de código refleja nuestra dedicación a la excelencia.</span>
                  </li>
                </ul>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base md:text-lg text-white dark:text-gray-300 text-center md:text-left mt-2"
                style={{
                  fontWeight: 400,
                  lineHeight: '1.7',
                }}
              >
                <span className="font-semibold text-[#86A869]">Nuestro objetivo:</span> Construir productos que no solo funcionen, sino que inspiren y conecten con las personas.<br className="hidden md:block" />
                <span className="block mt-2">En Folkode, tu visión es nuestra misión.</span>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}