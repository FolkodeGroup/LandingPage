'use client'
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
    iconClass: 'bi bi-phone',
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
    iconClass: 'bi bi-phone',
    title: 'Consultoría IT',
    items: [
      'Auditoría técnica y modernización de sistemas legacy.',
      'Migración a la nube (AWS, Google Cloud, Azure).',
    ],
  },
  {
    id: 'soft-social',
    mode: 'dark',
    iconClass: 'bi bi-phone',
    title: 'Software para Impacto Social',
    items: [
      'Soluciones con propósito para ONGs y emprendimientos sostenibles.',
      'Plataformas educativas y de gestión comunitaria.',
    ],
  },
]

export default function QueHacemosSection() {
  // Duplicamos la lista para el efecto infinito
  const listaInfinita = [...actividades, ...actividades]

  return (
    <section className="py-16 px-4 w-full overflow-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center">
        ¿Qué hacemos?
      </h2>

      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
        <div
          className="flex animate-marquee hover:[animation-play-state:paused]"
        >
          {listaInfinita.map((actividad, idx) => (
            <div
              key={actividad.id + '-' + idx}
              className="flex-shrink-0 w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%] mx-4"
            >
              <ActividadCard {...actividad} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}