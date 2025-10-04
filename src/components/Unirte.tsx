
"use client"
import { motion } from 'framer-motion';

interface Motivo {
  id: string;
  mode: 'dark' | 'light';
  iconClass: string;
  title: string;
  items: string[];
}

const motivos: Motivo[] = [
  {
    id: "aprender-haciendo",
    mode: "dark",
    iconClass: "bi bi-code-slash",
    title: "Aprender Haciendo",
    items:[
      "Nos sumergimos de lleno en proyectos reales que nos desafían a aplicar lo que estudiamos, convirtiendo la teoría en código funcional y experiencia sólida.",
    ]
  },
  {
    id: "colaboracion",
    mode: "dark",
    iconClass: "bi bi-people",
    title: "Colaboración Activa",
    items:[
      "Nadie trabaja solo. Dividimos cada proyecto en tareas concretas y fomentamos la participación constante. Nos apoyamos, resolvemos problemas juntos y crecemos como equipo.",
    ]
  },
  {
    id: "organizacion",
    mode: "dark",
    iconClass: "bi bi-check-square",
    title: "Organización Clara y Flexible",
    items: [
      "Usamos herramientas como ClickUp para planificar y dar seguimiento a nuestro progreso. Esto garantiza una dinámica transparente y ágil, donde todos conocen el objetivo y su rol para alcanzarlo.",
    ],
  },
];

export default function Unirte() {
  // Variantes de animación para cada tarjeta
  const variants = [
    {
      initial: { opacity: 0, x: -60 },
      whileInView: { opacity: 1, x: 0, transition: { duration: 1.1 } },
    },
    {
      initial: { opacity: 0, y: 60 },
      whileInView: { opacity: 1, y: 0, transition: { duration: 1.1 } },
    },
    {
      initial: { opacity: 0, x: 60 },
      whileInView: { opacity: 1, x: 0, transition: { duration: 1.1 } },
    },
  ];

  return (
    <section id="unirte" className="unirte-section mb-8 w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center px-4 py-4 mt-6">¿Por qué unirte al equipo?</h2>
      <div
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
        style={{ alignItems: 'stretch' }}
      >
        {motivos.map((motivo, idx) => (
          <motion.div
            className="card-equipo"
            key={motivo.id}
            initial={variants[idx].initial}
            whileInView={variants[idx].whileInView}
            viewport={{ once: true, amount: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, rgba(1,69,79,0.70) 0%, rgba(2,81,89,0.70) 60%, rgba(134,168,105,0.30) 100%)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px 0 rgba(2,81,89,0.14)',
              border: '2px solid rgba(134,168,105,0.22)',
              backdropFilter: 'blur(8px)',
              padding: '2rem 1.5rem',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'box-shadow 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(2,81,89,0.22)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(2,81,89,0.14)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <i className={`${motivo.iconClass} text-5xl mb-4`} />
            <h3 className="title-equipo text-white text-xl font-bold mb-2 text-center">{motivo.title}</h3>
            <ul className="text-equipo text-white text-base list-disc list-inside">
              {motivo.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}