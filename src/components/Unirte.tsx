'use client'
import ActividadCard from "./ActividadCard";

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
  return (
    <section id="unirte" className="unirte-section mb-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center px-4 py-4 mt-6">¿Por qué unirte al equipo?</h2>
        <div className="flex flex-nowrap justify-center gap-8 max-w-6xl mx-auto overflow-x-auto div-tamaño">
        {motivos.map((motivo) => (
          <div className="min-w-0 card-equipo" key={motivo.id}>
            <ActividadCard
              mode={motivo.mode}
              iconClass={motivo.iconClass}
              title={motivo.title}
              items={motivo.items}
            />
          </div>
        ))}
      </div>
    </section>
  );
}