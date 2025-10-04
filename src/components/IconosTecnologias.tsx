
"use client";
import {
  SiReact, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiGraphql, SiKotlin,
  SiHtml5, SiDjango, SiFlask, SiOpenai, SiPostgresql, SiJavascript,
  SiVuetify, SiSqlite, SiFastapi, SiNestjs, SiMysql, SiAstro, SiAngular,
  SiGnubash, SiC, SiCplusplus, SiPython, SiCss3, SiTypescript, SiMongodb
} from "react-icons/si";
import { VscTerminalPowershell } from "react-icons/vsc";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

// ✅ Convertir array de JSX a array de objetos con IDs únicos
const techData = [
    { id: 'react', icon: SiReact, color: '#61DAFB', name: 'React.js', desc: 'Biblioteca para interfaces interactivas.' },
    { id: 'nodejs', icon: SiNodedotjs, color: '#339933', name: 'Node.js', desc: 'Entorno para aplicaciones backend rápidas.' },
    { id: 'nextjs', icon: SiNextdotjs, color: '#000000', name: 'Next.js', desc: 'Framework para React con SSR y SSG.' },
    { id: 'tailwind', icon: SiTailwindcss, color: '#38BDF8', name: 'Tailwind CSS', desc: 'Framework de utilidades para estilos rápidos.' },
    { id: 'graphql', icon: SiGraphql, color: '#E10098', name: 'GraphQL', desc: 'API flexible y eficiente para datos.' },
    { id: 'kotlin', icon: SiKotlin, color: '#E10098', name: 'Kotlin', desc: 'Lenguaje moderno para apps móviles.' },
    { id: 'html5', icon: SiHtml5, color: '#c3690aff', name: 'HTML', desc: 'Lenguaje base para la web.' },
    { id: 'django', icon: SiDjango, color: '#44B78B', name: 'Django', desc: 'Framework robusto para backend en Python.' },
    { id: 'flask', icon: SiFlask, color: '#FFFFFF', name: 'Flask', desc: 'Microframework para backend en Python.' },
    { id: 'openai', icon: SiOpenai, color: '#FFFFFF', name: 'OpenAi', desc: 'IA generativa y procesamiento de lenguaje.' },
    { id: 'postgresql', icon: SiPostgresql, color: '#FFFFFF', name: 'PostgreQL', desc: 'Base de datos relacional avanzada.' },
    { id: 'javascript', icon: SiJavascript, color: '#F0DB4F', name: 'JavaScript', desc: 'Lenguaje universal para la web.' },
    { id: 'vuetify', icon: SiVuetify, color: '#44B78B', name: 'Vuetify', desc: 'UI framework para Vue.js.' },
    { id: 'sqlite', icon: SiSqlite, color: '#0F80CC', name: 'SQLite', desc: 'Base de datos ligera y embebida.' },
    { id: 'fastapi', icon: SiFastapi, color: '#009688', name: 'FastAPI', desc: 'Framework rápido para APIs en Python.' },
    { id: 'nestjs', icon: SiNestjs, color: '#E0234E', name: 'Nest.js', desc: 'Framework progresivo para Node.js.' },
    { id: 'mysql', icon: SiMysql, color: '#FFFFFF', name: 'MySQL', desc: 'Base de datos relacional popular.' },
    { id: 'astro', icon: SiAstro, color: '#FF5D01', name: 'Astro', desc: 'Framework moderno para sitios rápidos.' },
    { id: 'angular', icon: SiAngular, color: '#DC087D', name: 'Angular', desc: 'Framework robusto para aplicaciones web.' },
    { id: 'bash', icon: SiGnubash, color: '#FFFFFF', name: 'Bash', desc: 'Automatización y scripting en sistemas Unix.' },
    { id: 'c', icon: SiC, color: '#00599C', name: 'C', desc: 'Lenguaje de programación de bajo nivel.' },
    { id: 'cplusplus', icon: SiCplusplus, color: '#659AD2', name: 'C++', desc: 'Lenguaje orientado a objetos y alto rendimiento.' },
    { id: 'python', icon: SiPython, color: '#387EB8', name: 'Python', desc: 'Lenguaje versátil para IA, web y más.' },
    { id: 'css3', icon: SiCss3, color: '#264DE4', name: 'CSS', desc: 'Estilos para la web moderna.' },
    { id: 'typescript', icon: SiTypescript, color: '#3178C6', name: 'TypeScript', desc: 'JavaScript tipado para proyectos robustos.' },
    { id: 'mongodb', icon: SiMongodb, color: '#01EC64', name: 'MongoDB', desc: 'Base de datos NoSQL flexible.' },
    { id: 'powershell', icon: VscTerminalPowershell, color: '#FFFFFF', name: 'PowerShell', desc: 'Automatización en sistemas Windows.' }
  ];

  // ✅ Generar elementos JSX con keys únicas
  const items = techData.map((tech) => {
    const IconComponent = tech.icon;
    return (
      <li key={tech.id} className="icon-img group relative" data-tooltip-id={`tooltip-${tech.id}`} data-tooltip-content={tech.desc}>
        <IconComponent
          size={50}
          color={tech.color}
          style={{ verticalAlign: "middle", transition: "transform 0.3s, filter 0.3s" }}
          className="group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#00c6ff]"
        />
        <p className="pt-2 text-white text-xs font-medium group-hover:text-[#00c6ff] transition-colors">{tech.name}</p>
        <Tooltip id={`tooltip-${tech.id}`} place="top" />
      </li>
    );
  });

export default function IconosTecnologias() {
    return(
        <section className="text-inverse px-4 py-8 mt-4">
          <div className="pt-6">
            <div className="overflow-hidden cards-tecnologias icon-container mx-auto rounded-xl shadow-lg bg-gradient-to-br from-[#073042] via-[#0f2027] to-[#00c6ff]">
              <ul className="animate-scroll flex gap-4 sm:gap-6">
                {/* Primera repetición */}
                {items.map((icon, i) => (
                  <div
                    key={`first-${techData[i].id}`}
                    className="carousel-item flex flex-col items-center w-12 sm:w-14 md:w-16 group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">{icon}</div>
                  </div>
                ))}

                {/* Segunda repetición */}
                {items.map((icon, i) => (
                  <div
                    key={`second-${techData[i].id}`}
                    className="carousel-item flex flex-col items-center w-12 sm:w-14 md:w-16 group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">{icon}</div>
                  </div>
                ))}

                {/* Tercera repetición */}
                {items.map((icon, i) => (
                  <div
                    key={`third-${techData[i].id}`}
                    className="carousel-item flex flex-col items-center w-12 sm:w-14 md:w-16 group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">{icon}</div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </section>
    )
}