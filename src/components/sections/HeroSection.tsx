"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import heroImage from '@/assets/images/heroimage.webp';
import TrianglesImage from '@/assets/images/trianglesoscuro.webp';

export default function HeroSection() {
  const [navHeight, setNavHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

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
      ref={ref}
    >
      {/* Imagen del triángulo decorativo - ahora FUERA del contenedor */}
      <motion.div
        className="hero-triangles absolute bottom-0 right-0 z-[1]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src={TrianglesImage.src}
          alt="HeroTriangles"
          width={300}
          height={300}
          sizes="(max-width: 768px) 120px, 300px"
          style={{ width: '100%', height: 'auto' }}
          priority={false}
        />
      </motion.div>

      <div className="w-full h-full relative">
        {/* Imagen hero completa */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <Image
            src={heroImage.src}
            alt="Hero"
            className="hero-img"
            width={1920}
            height={1080}
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>

        {/* Textos alineados a la izquierda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-left px-4 sm:px-6 md:px-10 lg:px-16 w-full flex justify-start z-[2]"
        >
          <div
            className="backdrop-blur-xl bg-white/1 border border-white/10 rounded-2xl shadow-none p-6 md:p-10 lg:p-12 box-border"
            style={{
              boxShadow: 'none',
              border: '2px solid rgba(134,168,105,0.08)',
              maxWidth: '1000px',
              width: 'min(100%, 1000px)',
              background:
                'linear-gradient(135deg, rgba(1,69,79,0.03) 0%, rgba(2,81,89,0.03) 60%, rgba(134,168,105,0.01) 100%)',
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="text-white hero-title py-2 text-h1"
              style={{
                textShadow: '0 2px 12px #01454F88',
                letterSpacing: '-0.02em',
                whiteSpace: 'normal',
                width: '100%',
              }}
            >
              Bienvenidos a Folkode
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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

