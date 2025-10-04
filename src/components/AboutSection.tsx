'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="mt-20 fade-in">
      <h3 className="text-3xl md:text-4xl font-extrabold text-center text-white drop-shadow-lg tracking-tight mb-2">
        Sobre Nosotros
      </h3>
      <div
        id="sobre-folkode"
        className=" lg:py-2 w-full flex justify-center items-center"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Centrar completamente en el centro vertical
      >
        <div
          className="w-full mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 md:p-12"
          style={{
            boxShadow: '0 8px 32px 0 rgba(2,81,89,0.14)',
            border: '2px solid rgba(134,168,105,0.22)',
            background: 'rgba(13,17,23,0.85)',
            maxWidth: '100%',
          }}
        >
          {/* Imágenes y cuadrados de colores a la izquierda */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative h-[320px] md:h-[300px] mb-10 md:mb-0 contenedor-imagenes">
            <Image
              src="/dark-about-img.png"
              alt="Trabajo en equipo"
              width={400} // Ajustar el ancho para que coincida con el tamaño de la tarjeta
              height={300} // Ajustar la altura para que coincida con el tamaño de la tarjeta
              className="rounded-xl shadow-lg border border-white/20"
              style={{ objectFit: 'cover', boxShadow: '0 4px 24px 0 rgba(2,81,89,0.18)' }}
            />
          </div>
          {/* Texto a la derecha */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-2 md:px-4">
            <h3 className="titulo-about text-xl md:text-2xl font-bold text-[#86A869] mb-2 tracking-tight">
              Sobre Folkode
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="md:text-xl text-white dark:text-gray-300 max-w-2xl mx-auto text-about"
              style={{
                textShadow: '0 1px 8px #02515988',
                fontWeight: 400,
                lineHeight: '1.6',
              }}
            >
              Somos un equipo apasionado por el desarrollo web moderno y el diseño centrado en el usuario. Nos especializamos en crear soluciones digitales que combinan funcionalidad, estética y tecnología de vanguardia.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="md:text-xl text-white dark:text-gray-300 max-w-2xl mx-auto text-about mt-4"
              style={{
                textShadow: '0 1px 8px #02515988',
                fontWeight: 400,
                lineHeight: '1.6',
              }}
            >
              En Folkode, creemos que cada proyecto es una oportunidad para transformar ideas en experiencias memorables. Nuestro enfoque se basa en:
            </motion.p>
            <ul className="list-disc pl-5 text-base md:text-lg mb-4" style={{ lineHeight: '1.7' }}>
              <li>Innovación constante: Utilizamos las últimas tecnologías para garantizar soluciones robustas y escalables.</li>
              <li>Colaboración activa: Trabajamos mano a mano con nuestros clientes para entender sus necesidades y superar sus expectativas.</li>
              <li>Compromiso con la calidad: Cada línea de código refleja nuestra dedicación a la excelencia.</li>
            </ul>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="md:text-xl text-white dark:text-gray-300 max-w-2xl mx-auto text-about mt-4"
              style={{
                textShadow: '0 1px 8px #02515988',
                fontWeight: 400,
                lineHeight: '1.6',
              }}
            >
              Nuestro objetivo es construir productos que no solo funcionen, sino que también inspiren y conecten con las personas. En Folkode, tu visión es nuestra misión.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}