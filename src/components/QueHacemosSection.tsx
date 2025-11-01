'use client'
import React, { useEffect, useRef, useState } from 'react';
import ActividadCard from './ActividadCard'

interface Actividad {
  id: string
  mode: 'dark' | 'light'
  iconClass: string
  title: string
  items: string[]
}

const actividades: Actividad[] = [
  {
    id: 'web-dev',
    mode: 'dark',
    iconClass: 'bi bi-code-slash',
    title: 'Desarrollo Web Profesional',
    items: [
      'Aplicaciones web a medida con tecnologías modernas (React, Vue.js, Django)',
      'Landing pages optimizadas para SEO y conversión.',
      'E-commerce integrado con pasarelas de pago y gestión de inventario.',
    ],
  },
  {
    id: 'auto-product',
    mode: 'light',
    iconClass: 'bi bi-gear-fill',
    title: 'Automatización y Productividad',
    items: [
      'Sistemas CRM/ERP adaptados a tus procesos.',
      'Integración de APIs y flujos de trabajo automatizados.',
      'Herramientas internas para optimizar operaciones.',
    ],
  },
  {
    id: 'mobile-apps',
    mode: 'dark',
    iconClass: 'bi bi-phone',
    title: 'Mobile Apps Híbridas',
    items: [
      'Aplicaciones multiplataforma (iOS/Android) con Flutter o React Native.',
      'Prototipado rápido y diseño centrado en usuario.',
    ],
  },
  {
    id: 'consu-it',
    mode: 'light',
    iconClass: 'bi bi-cloud-arrow-up',
    title: 'Consultoría IT',
    items: [
      'Auditoría técnica y modernización de sistemas legacy.',
      'Migración a la nube (AWS, Google Cloud, Azure).',
    ],
  },
  {
    id: 'soft-social',
    mode: 'dark',
    iconClass: 'bi bi-people-fill',
    title: 'Software para Impacto Social',
    items: [
      'Soluciones con propósito para ONGs y emprendimientos sostenibles.',
      'Plataformas educativas y de gestión comunitaria.',
    ],
  },
]

export default function QueHacemosSection() {
  // Duplicamos la lista para el efecto infinito
  const listaInfinita = [...actividades, ...actividades];
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (!marqueeRef.current) return;
    let observer: IntersectionObserver | null = null;
    const node = marqueeRef.current;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
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

  return (
    <section id="servicios" className="my-4 w-full overflow-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-10 text-center">
        ¿Qué hacemos?
      </h2>

      <div ref={marqueeRef} className="relative w-full overflow-hidden qh-marquee">
        <div
          className="qh-track hover:[animation-play-state:paused]"
          style={{
            animationPlayState: isInView ? 'running' : 'paused',
          }}
        >
          {listaInfinita.map((actividad, idx) => (
            <div key={actividad.id + '-' + idx} className="qh-item flex-shrink-0">
              <ActividadCard {...actividad} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}