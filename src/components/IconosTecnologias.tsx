"use client";
import {
  SiReact, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiGraphql, SiKotlin,
  SiHtml5, SiDjango, SiFlask, SiOpenai, SiPostgresql, SiJavascript,
  SiVuetify, SiSqlite, SiFastapi, SiNestjs, SiMysql, SiAstro, SiAngular,
  SiGnubash, SiC, SiCplusplus, SiPython, SiCss3, SiTypescript, SiMongodb
} from "react-icons/si";
import { VscTerminalPowershell } from "react-icons/vsc";

// ✅ Convertir array de JSX a array de objetos con IDs únicos
const techData = [
    { id: 'react', icon: SiReact, color: '#61DAFB', name: 'React.js' },
    { id: 'nodejs', icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
    { id: 'nextjs', icon: SiNextdotjs, color: '#000000', name: 'Next.js' },
    { id: 'tailwind', icon: SiTailwindcss, color: '#38BDF8', name: 'Tailwind CSS' },
    { id: 'graphql', icon: SiGraphql, color: '#E10098', name: 'GraphQL' },
    { id: 'kotlin', icon: SiKotlin, color: '#E10098', name: 'Kotlin' },
    { id: 'html5', icon: SiHtml5, color: '#c3690aff', name: 'HTML' },
    { id: 'django', icon: SiDjango, color: '#44B78B', name: 'Django' },
    { id: 'flask', icon: SiFlask, color: '#FFFFFF', name: 'Flask' },
    { id: 'openai', icon: SiOpenai, color: '#FFFFFF', name: 'OpenAi' },
    { id: 'postgresql', icon: SiPostgresql, color: '#FFFFFF', name: 'PostgreQL' },
    { id: 'javascript', icon: SiJavascript, color: '#F0DB4F', name: 'JavaScript' },
    { id: 'vuetify', icon: SiVuetify, color: '#44B78B', name: 'Vuetify' },
    { id: 'sqlite', icon: SiSqlite, color: '#0F80CC', name: 'SQLite' },
    { id: 'fastapi', icon: SiFastapi, color: '#009688', name: 'FastAPI' },
    { id: 'nestjs', icon: SiNestjs, color: '#E0234E', name: 'Nest.js' },
    { id: 'mysql', icon: SiMysql, color: '#FFFFFF', name: 'MySQL' },
    { id: 'astro', icon: SiAstro, color: '#FF5D01', name: 'Astro' },
    { id: 'angular', icon: SiAngular, color: '#DC087D', name: 'Angular' },
    { id: 'bash', icon: SiGnubash, color: '#FFFFFF', name: 'Bash' },
    { id: 'c', icon: SiC, color: '#00599C', name: 'C' },
    { id: 'cplusplus', icon: SiCplusplus, color: '#659AD2', name: 'C++' },
    { id: 'python', icon: SiPython, color: '#387EB8', name: 'Python' },
    { id: 'css3', icon: SiCss3, color: '#264DE4', name: 'CSS' },
    { id: 'typescript', icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
    { id: 'mongodb', icon: SiMongodb, color: '#01EC64', name: 'MongoDB' },
    { id: 'powershell', icon: VscTerminalPowershell, color: '#FFFFFF', name: 'PowerShell' }
  ];

  // ✅ Generar elementos JSX con keys únicas
  const items = techData.map((tech) => {
    const IconComponent = tech.icon;
    return (
      <li key={tech.id} className="icon-img">
        <IconComponent size={50} color={tech.color} style={{ verticalAlign: "middle" }} />
        <p className="pt-2">{tech.name}</p>
      </li>
    );
  });

export default function IconosTecnologias() {
    return(
        <section className="text-inverse px-4 py-8 mt-4">
          <div className="pt-6">
            <div className="overflow-hidden cards-tecnologias icon-container mx-auto">
              <ul className="animate-scroll flex gap-4 sm:gap-6">
                {/* Primera repetición */}
                {items.map((icon, i) => (
                  <div
                    key={`first-${techData[i].id}`}
                    className="carousel-item flex flex-col items-center w-12 sm:w-14 md:w-16"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">{icon}</div>
                  </div>
                ))}

                {/* Segunda repetición */}
                {items.map((icon, i) => (
                  <div
                    key={`second-${techData[i].id}`}
                    className="carousel-item flex flex-col items-center w-12 sm:w-14 md:w-16"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">{icon}</div>
                  </div>
                ))}

                {/* Tercera repetición */}
                {items.map((icon, i) => (
                  <div
                    key={`third-${techData[i].id}`}
                    className="carousel-item flex flex-col items-center w-12 sm:w-14 md:w-16"
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