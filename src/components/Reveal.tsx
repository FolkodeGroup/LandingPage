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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
