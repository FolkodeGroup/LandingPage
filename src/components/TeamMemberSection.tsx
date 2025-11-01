'use client';
import TeamMemberCard from './TeamMemberCard';
import { useEffect, useRef, useState } from 'react';
import './TeamSlider.css';

// Utilidad throttle
function throttle<T extends (...args: unknown[]) => void>(fn: T, wait: number): T {
  let last = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T>;
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    lastArgs = args;
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        last = Date.now();
        timeout = null;
        fn.apply(this, lastArgs);
      }, wait - (now - last));
    }
  } as T;
}

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
    portfolio?: string;
  };
  mode: 'dark' | 'light';
}

const teamMembers: TeamMember[] = [
  {
    id: "member-1",
  avatar: "/laura-gimenez.webp",
    name: "Laura Giménez",
    role: "FrontEnd Developer",
    description: "Apasionada por crear experiencias digitales memorables que conectan personas y tecnología.",
    links: {
      github: 'https://github.com/Laura-gim',
      /* linkedin: 'https://www.linkedin.com/in/celina-pereyra', */
      portfolio: '#',
    },
    mode: "dark",
  },
  {
    id: "member-1",
  avatar: "/celi.webp",
    name: "Celina Pereyra",
    role: "FrontEnd Developer",
    description: "Construyendo soluciones con pasión por la tecnología.",
    links: {
      github: 'https://github.com/CelinaJP',
      linkedin: 'https://www.linkedin.com/in/celina-pereyra',
      portfolio: '#',
    },
    mode: "dark",
  },
  {

    id: "member-2",
  avatar: "/Daro.webp",
    name: "Daro Giménez",
    role: "Full Stack Developer",
    description: "Creando experiencias de usuario memorables y funcionales.",
    links: {
      github: 'https://github.com/dgimenezdeveloper',
      linkedin: 'https://www.linkedin.com/in/daseg/',
      portfolio: '#',
    },
    mode: "dark",
  },
  {

    id: "member-3",
  avatar: "/gabrielsosa.webp",
    name: "Gabriel Sosa",
    role: "Full Stack Developer",
    description: "Programar es construir puentes entre ideas y realidad usando lógica y creatividad.",
    links: {
      github: 'https://github.com/OGabrielSosa',
      linkedin: 'https://linkedin.com/in/carlos',
      portfolio: '#'
    },
    mode: "dark",
  },

  {

    id: "member-4",
  avatar: "/matias.webp",
    name: "Matias Daniel Alessandrello",
    role: "Full Stack Developer",
    description: "Los detalles importan. Cada línea de código cuenta para lograr un producto excepcional.",
    links: {
      github: 'https://github.com/malessan4',
      linkedin: '#',
      portfolio: '#',
    },
    mode: "dark",
  },

  {

    id: "member-5",
  avatar: "/Ovejero.webp",
    name: "Agustin Ovejero",
    role: "BackEnd Developer",
    description: "Desarrollando soluciones innovadoras con un enfoque en la usabilidad.",
    links: {
      github: 'https://github.com/agustin-ovejero',
      linkedin: 'https://www.linkedin.com/in/agustin-ovejero-2a0439344/',
      portfolio: '#',
    },
    mode: "dark",
  },


  {

    id: "member-6",
  avatar: "/cuqui.webp",
    name: "Lucas Echavarria",
    role: "Backend Developer",
    description: "El mejor código no es el que funciona, sino el que otros pueden entender y mantener.",
    links: {
      github: 'https://github.com/Lucasechavarria',
      linkedin: 'https://linkedin.com/in/lucas-echavarria',
      portfolio: '#',
    },
    mode: "dark",
  },

  {

    id: "member-7",
  avatar: "/fede.webp",
    name: "Fede Paal",
    role: "FrontEnd Developer",
    description: "Cada decisión en el frontend es una decisión sobre la experiencia del usuario",
    links: {
      github: 'https://github.com/FedericoPaal',
      linkedin: 'https://linkedin.com/in/federico-paal ',
      portfolio: '#',
    },
    mode: "dark",
  }/* ,
  {

    id: "member-8",
  avatar: "/pau.webp",
    name: "Paula Bigorra",
    role: "BackEnd Developer",
    description: "La seguridad no es un extra en backend, es el cimiento.",
    links: {
      github: 'https://github.com/PaulaBigorra',
      linkedin: 'https://www.linkedin.com/in/paula-bigorra-722079260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      portfolio: '#',
    },
    mode: "dark",
  } */,
  {

    id: "member-9",
  avatar: "/mauri.webp",
    name: "Mauricio Barreras",
    role: "FrontEnd Developer",
    description: "Un diseño consistente es la base de la confianza del usuario",
    links: {
      github: 'https://github.com/MauricioBarreras',
      linkedin: 'https://www.linkedin.com/in/mauricio-barreras-235b8128a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      portfolio: '#',
    },
    mode: "dark",
  },
  {

    id: "member-10",
  avatar: "/sasha.webp",
    name: "Sasha Porchia",
    role: "FrontEnd Developer",
    description: "Cada decisión en el frontend es una decisión sobre la experiencia del usuario",
    links: {
      github: 'https://github.com/SashaPorchia',
      linkedin: '#',
      portfolio: '#',
    },
    mode: "dark",
  },
    /* {

    id: "member-11",
  avatar: "/agusgonzalez.webp",
    name: "Agustin Gonzalez",
    role: "Full Stack Developer",
    description: "Los bugs son mis aliados, te obligan a mejorar",
    links: {
      github: 'https://github.com/Agusting22',
      linkedin: 'https://www.linkedin.com/in/agustin-gonzalez2211',
      portfolio: '#',
    },
    mode: "dark",
  }, */
    {
    id: "member-13",
  avatar: "/nahue.webp",
    name: "Nahue Dalesio",
    role: "Full Stack Developer",
    description: "El software funcionando es la principal medida de progreso.",
    links: {
      github: 'https://github.com/Nahuel-Dalesio',
      linkedin: 'https://ar.linkedin.com/in/nahuel-dalesio-183498213?trk=people-guest_people_search-card',
      portfolio: '#',
    },
    mode: "dark",
  },
    {
    id: "member-14",
  avatar: "/Mai.webp",
    name: "Maia Avalos",
    role: "Full Stack Developer",
    description: "Nunca me conformo; el progreso constante es la clave del éxito.",
    links: {
      github: 'https://github.com/maiavalos',
      linkedin: 'https://www.linkedin.com/in/maia-avalos-a37098345',
      portfolio: 'no tengo',
    },
    mode: "dark",
  },
    {
    id: "member-15",
  avatar: "/Facu.webp",
    name: "Facu Carrizo",
    role: "Full Stack Developer",
    description: "El buen código resuelve problemas, el excelente los previene.",
    links: {
      github: 'https://github.com/',
      linkedin: '#',
      portfolio: '#',
    },
    mode: "dark",
  },
  // Puedes agregar más miembros según necesites
];

export default function TeamMemberSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isHovering, setIsHovering] = useState(false);
  const [isInstant, setIsInstant] = useState(false); // para saltos sin animación
  const isResettingRef = useRef(false); // pausar autoplay durante reset
  const [dragOffsetPercent, setDragOffsetPercent] = useState(0); // offset en % durante drag
  const dragRef = useRef<{ startX: number; deltaX: number; dragging: boolean; startIndex: number; startTime: number }>({
    startX: 0,
    deltaX: 0,
    dragging: false,
    startIndex: 0,
    startTime: 0,
  });
  const [isInView, setIsInView] = useState(true);

  const totalSlides = teamMembers.length;

  // Responsivo: 3/2/1
  useEffect(() => {
    if (!isInView) return;
    // Throttle resize
    const calcSlidesToShow = () => {
      const w = window.innerWidth;
      if (w < 768) return 1;
      if (w < 1024) return 2;
      return 3;
    };
    const apply = () => {
      setSlidesToShow(() => {
        const next = calcSlidesToShow();
        return next;
      });
    };
    const throttledApply = throttle(apply, 200);
    apply();
    window.addEventListener('resize', throttledApply);
    return () => {
      window.removeEventListener('resize', throttledApply);
    };
  }, [isInView]);

  // Preparar índice inicial (segmento del medio)
  useEffect(() => {
    if (!isInView) return;
    const base = totalSlides; // comienzo del segmento medio
    setIsInstant(true);
    setCurrentIndex(base);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsInstant(false));
    });
  }, [slidesToShow, totalSlides, isInView]);

  // Autoplay
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      if (isHovering || isResettingRef.current) return;
      setCurrentIndex((i) => i + 1);
    }, 4000);
    return () => clearInterval(id);
  }, [slidesToShow, totalSlides, isHovering, isInView]);

  // IntersectionObserver para pausar autoplay y listeners fuera de viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    let observer: IntersectionObserver | null = null;
    const node = sectionRef.current;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setIsInView(entries[0].isIntersecting);
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

  const handlePrev = () => {
    setCurrentIndex((i) => i - 1);
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  // Swipe táctil (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    const x = e.touches[0]?.clientX ?? 0;
    dragRef.current = {
      startX: x,
      deltaX: 0,
      dragging: true,
      startIndex: currentIndex,
      startTime: Date.now(),
    };
    isResettingRef.current = true; // pausar autoplay
    setIsInstant(true); // drag sin transición
    setDragOffsetPercent(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.dragging || !viewportRef.current) return;
    const x = e.touches[0]?.clientX ?? 0;
    const deltaX = x - dragRef.current.startX;
    dragRef.current.deltaX = deltaX;
    const width = viewportRef.current.clientWidth || 1;
    const percent = (deltaX / width) * (100 / Math.max(1, slidesToShow));
    setDragOffsetPercent(percent);
  };

  const onTouchEnd = () => {
    if (!dragRef.current.dragging || !viewportRef.current) return;
    const { deltaX, startTime } = dragRef.current;
    const width = viewportRef.current.clientWidth || 1;
    const elapsed = Date.now() - startTime;
    const thresholdPx = Math.max(40, width * 0.15);
    const isFlick = elapsed < 250 && Math.abs(deltaX) > 20;
    const shouldSlide = Math.abs(deltaX) > thresholdPx || isFlick;

    setIsInstant(false); // animar al destino
    setDragOffsetPercent(0);
    dragRef.current.dragging = false;
    isResettingRef.current = false;

    if (shouldSlide) {
      if (deltaX < 0) {
        // swipe izquierda -> siguiente
        setCurrentIndex((i) => i + 1);
      } else if (deltaX > 0) {
        // swipe derecha -> anterior
        setCurrentIndex((i) => i - 1);
      }
    } // si no, vuelve al índice actual con transición
  };

  // Altura adaptativa: medir visibles reales
  useEffect(() => {
    const updateHeight = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const children = Array.from(track.children) as HTMLElement[];
      const clones = Math.min(slidesToShow, totalSlides);
      const start = currentIndex;
      const end = Math.min(currentIndex + slidesToShow, clones + totalSlides + clones);
      let maxH = 0;
      for (let i = start; i < end; i++) {
        const el = children[i];
        if (!el) continue;
        // reset para medir
        el.style.height = 'auto';
        const h = el.offsetHeight;
        if (h > maxH) maxH = h;
      }
      // set altura del viewport
      viewport.style.height = maxH ? `${maxH}px` : 'auto';
    };
    const id = window.setTimeout(updateHeight, 50);
    return () => window.clearTimeout(id);
  }, [currentIndex, slidesToShow, totalSlides]);

  // Construir triple lista para loop fluido: [...items, ...items, ...items]
  const extendedSlides = [...teamMembers, ...teamMembers, ...teamMembers];

  // Lógica de normalización al cruzar bordes del segmento medio
  const maxIndex = Math.max(0, totalSlides - slidesToShow);
  const base = totalSlides; // inicio del segmento medio
  const rightBoundary = 2 * totalSlides; // final del segmento medio (exclusivo)

  const handleTransitionEnd = () => {
    if (totalSlides <= slidesToShow) return;
    if (currentIndex >= rightBoundary) {
      // cruzó al segmento derecho: mover igual hacia atrás totalSlides
      isResettingRef.current = true;
      setIsInstant(true);
      setCurrentIndex((i) => i - totalSlides);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsInstant(false);
          isResettingRef.current = false;
        });
      });
    } else if (currentIndex < base) {
      // cruzó al segmento izquierdo: mover hacia adelante totalSlides
      isResettingRef.current = true;
      setIsInstant(true);
      setCurrentIndex((i) => i + totalSlides);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsInstant(false);
          isResettingRef.current = false;
        });
      });
    }
  };

  return (
    <section ref={sectionRef} id="nuestro-equipo" className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center text-white">
          Nuestro Equipo de desarrolladores
        </h2>
        <div
          className="custom-slider"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="slider-viewport" ref={viewportRef}>
            <div
              className="slider-track"
              ref={trackRef}
              style={{
                transform: `translate3d(-${(currentIndex * 100) / slidesToShow - dragOffsetPercent}%, 0, 0)`,
                transition: isInstant ? 'none' : 'transform 500ms ease',
              }}
              onTransitionEnd={handleTransitionEnd}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {extendedSlides.map((member, idx) => (
                <div
                  key={`${member.id}-${idx}`}
                  className="slide px-2"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="team-card-wrapper h-full">
                    <TeamMemberCard {...member} className="h-full mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Arrows (ocultas en mobile vía CSS) */}
          {totalSlides > slidesToShow && (
            <>
              <button className="arrow prev" onClick={handlePrev} aria-label="Anterior">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-5 h-5 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                  >
                  <path d="M34.524 239.03l194.344-194.343c9.373-9.373 24.569-9.373 33.941 0l22.667 22.667c9.357 9.357 9.375 24.522.04 33.901L131.495 256l154.021 154.745c9.335 9.379 9.317 24.544-.04 33.901l-22.667 22.667c-9.373 9.373-24.569 9.373-33.941 0L34.525 272.971c-9.373-9.372-9.373-24.568-.001-33.941z"/>
              </svg>
              </button>
              
              <button className="arrow next relative" onClick={handleNext} aria-label="Siguiente">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                </svg>
              </button>
            </>
          )}
          {/* Dots */}
          <ul className="dots">
            {Array.from({ length: Math.max(1, maxIndex + 1) }).map((_, page) => {
              // Índice real dentro de [0..totalSlides-1]
              const realIndex = ((currentIndex - base) % totalSlides + totalSlides) % totalSlides;
              const activePage = Math.min(maxIndex, realIndex);
              return (
                <li key={page}>
                  <button
                    aria-label={`Ir a página ${page + 1}`}
                    className={page === activePage ? 'active' : ''}
                    onClick={() => setCurrentIndex(base + page)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}