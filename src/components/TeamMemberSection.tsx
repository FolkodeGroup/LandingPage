'use client';
import TeamMemberCard from './TeamMemberCard';
import Slider from 'react-slick';
import { useEffect, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TeamSlider.css';

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
    description: "Programar es construir puentes entre ideas y realidad usando lógica y creatividad.",
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
    role: "BackEnd Developer",
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
    description: "El mejor código no es el que funciona, sino el que otros pueden entender y mantener.",
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
    role: "FrontEnd Developer",
    description: "Cada decisión en el frontend es una decisión sobre la experiencia del usuario",
    links: {
      github: 'https://github.com/carlos',
      linkedin: 'https://linkedin.com/in/carlos',
    },
    mode: "dark",
  },

  // Puedes agregar más miembros según necesites
];

export default function TeamMemberSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  useEffect(() => {
    const equalizeCardHeights = () => {
      if (sliderRef.current) {
        const cards = sliderRef.current.querySelectorAll('.team-card-wrapper');
        let maxHeight = 0;

        // Resetear alturas
        cards.forEach((card) => {
          (card as HTMLElement).style.height = 'auto';
        });

        // Encontrar la altura máxima
        cards.forEach((card) => {
          const height = (card as HTMLElement).offsetHeight;
          if (height > maxHeight) {
            maxHeight = height;
          }
        });

        // Aplicar la altura máxima a todas las tarjetas
        cards.forEach((card) => {
          (card as HTMLElement).style.height = `${maxHeight}px`;
        });
      }
    };

    // Ejecutar después de que el slider se haya renderizado
    const timer = setTimeout(equalizeCardHeights, 100);

    // También ejecutar cuando cambie el tamaño de ventana
    window.addEventListener('resize', equalizeCardHeights);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', equalizeCardHeights);
    };
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center text-white">
          Nuestro Equipo de desarrolladores
        </h2>
        <div className="team-slider" ref={sliderRef}>
          <Slider {...settings}>
            {teamMembers.map((member) => (
              <div key={member.id} className="px-2">
                <div className="team-card-wrapper">
                  <TeamMemberCard
                    {...member}
                    className="h-full mx-auto"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}