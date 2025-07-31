'use client';
import TeamMemberCard from './TeamMemberCard';

interface TeamMember {

  id: string;
  avatar: string;
  name: string;
  role: string;
  description: string;
  links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
    mode: 'dark' | 'light';
}

const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    avatar: "/celi.png",
    name: "Celina Pereyra",
    role: "FrontEnd Developer",
    description: "Construyendo soluciones con pasión por la tecnología.",
    links: {
      github: 'https://github.com/leo',
      linkedin: 'https://linkedin.com/in/leo',
      instagram: 'https://instagram.com/leo',
    },
     mode: "dark",
  },
  {

    id: "member-2",
    avatar: "/Daro.png",
    name: "Darío Giménez",
    role: "Full Stack Developer",
    description: "Creando experiencias de usuario memorables y funcionales.",
    links: {
      github: 'https://github.com/dario',
      linkedin: 'https://linkedin.com/in/dario',
      instagram: 'https://instagram.com/dario',
    },
    mode: "dark",
  },
  {
    
    id: "member-3", 
    avatar: "gabrielsosa.png",
    name: "Gabriel Sosa",
    role: "Full Stack Developer",
    description: "Lo que diga Daro.",
    links: {
      github: 'https://github.com/carlos',
      linkedin: 'https://linkedin.com/in/carlos',
    },
    mode: "dark",
  },

  {
    
    id: "member-4", 
    avatar: "/matias.png",
    name: "Matias Daniel Alessandrello",
    role: "Full Stack Developer",
    description: "Los detalles importan. Cada línea de código cuenta para lograr un producto excepcional.",
    links: {
      github: 'https://github.com/carlos',
      linkedin: 'https://linkedin.com/in/carlos',
    },
    mode: "dark",
  },

  {
    
    id: "member-5", 
    avatar: "/Ovejero.png",
    name: "Agustin Ovejero",
    role: "Aca va el Rol",
    description: "Desarrollando soluciones innovadoras con un enfoque en la usabilidad.",
    links: {
      github: 'https://github.com/carlos',
      linkedin: 'https://linkedin.com/in/carlos',
    },
    mode: "dark",
  },


    {
    
    id: "member-6", 
    avatar: "/cuqui.png",
    name: "Lucas Echavarria",
    role: "Backend Developer",
    description: "Desarrollando soluciones innovadoras con un enfoque en la usabilidad.",
    links: {
      github: 'https://github.com/carlos',
      linkedin: 'https://linkedin.com/in/carlos',
    },
    mode: "dark",
  },

      {
    
    id: "member-7", 
    avatar: "/fede.png",
    name: "Fede Paal",
    role: "Aca va el Rol",
    description: "Desarrollando soluciones innovadoras con un enfoque en la usabilidad.",
    links: {
      github: 'https://github.com/carlos',
      linkedin: 'https://linkedin.com/in/carlos',
    },
    mode: "dark",
  },

  // Puedes agregar más miembros según necesites
];

export default function TeamMemberSection() {
  return (
   <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center text-white">
          Nuestro Equipo de desarrolladores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {teamMembers.map((member) => (
           <div key={member.id} className="flex justify-center"> 
            <TeamMemberCard 
            {...member} 

            />
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}