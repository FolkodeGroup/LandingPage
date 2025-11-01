"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}


export default function Reveal({ children, delay = 0.15, y = 40 }: RevealProps) {
  const controls = useAnimation();
  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  // triggerOnce solo en desktop
  const [ref, inView] = useInView({ triggerOnce: !isMobile, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      });
    } else if (isMobile) {
      // Si sale del viewport en mobile, reiniciar animación
      controls.start({ opacity: 0, y });
    }
  }, [controls, inView, delay, y, isMobile]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
