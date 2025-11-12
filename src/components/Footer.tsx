'use client';
import { FaGithub, FaDiscord, FaEnvelope, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa6";


export default function Footer() {
  // Fallback a HTMLElement si HTMLFooterElement no está disponible
  const footerRef = useRef<HTMLElement>(null);

  // Estado para acordeón en mobile
  const [openSection, setOpenSection] = useState<'links' | 'contacto' | null>(null);

  // Detecta si es mobile (tailwind md breakpoint)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Debounce para evitar ejecuciones excesivas
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (!footerRef.current) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      // En móviles, el footer siempre visible
      if (window.innerWidth < 768) {
        footerRef.current.classList.add("footer-visible");
        return;
      }
      // En desktop, lógica original
      if (scrollY + windowHeight >= bodyHeight - 400) {
        footerRef.current.classList.add("footer-visible");
      } else {
        footerRef.current.classList.remove("footer-visible");
      }
    };
    const debouncedOnScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(onScroll, 120);
    };
    window.addEventListener("scroll", debouncedOnScroll, { passive: true });
    window.addEventListener("resize", debouncedOnScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", debouncedOnScroll);
      window.removeEventListener("resize", debouncedOnScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer ref={footerRef} className="footer-folkode-dark text-inverse pt-0">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Logo, Folkode, lema: centrados */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center h-full py-10 md:py-20 px-6 md:px-16 footer-anim-item footer-anim-delay-1" style={{ minHeight: '100%' }}>
          <div className="flex flex-col items-center justify-center w-full mb-4 md:mb-8">
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <div className="flex items-center justify-center w-full md:w-auto">
                <Image
                  src="/Folkode_Logo_Bold_Black.png"
                  alt="Folkode Logo"
                  width={120}
                  height={120}
                  className="object-contain max-w-[120px] max-h-[120px] w-full h-auto md:max-w-[220px] md:max-h-[220px] md:w-full"
                  priority
                />
              </div>
              <span className="text-primary font-extrabold text-2xl md:text-4xl lg:text-5xl w-full text-center">
                Folkode
              </span>
            </div>
            <p className="italic text-gray-solid text-sm md:text-lg lg:text-xl text-center">
              Transformamos ideas<br />en soluciones reales e innovadoras
            </p>
          </div>
        </div>
        {/* Fondo verde para Links y Contacto con acordeón en mobile */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row bg-secondary pt-4 pb-4 md:pt-12 md:pb-12 relative overflow-hidden footer-anim-item footer-anim-delay-2" style={{background: 'conic-gradient(at top left, #00343a 0%, #00666b 40%, #00bfa6 100%)'}}>
          {/* Links */}
          <div className="w-full md:w-1/2 flex flex-col flex-grow items-center md:items-start justify-start px-4 md:px-6 footer-anim-item relative overflow-hidden" style={{ transitionDelay: '0.25s', height: '100%' }}>
            {/* SVG geométrico sutil fondo */}
            <svg aria-hidden="true" className="absolute inset-0 max-w-full w-full h-full z-0" style={{opacity:0.13}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="none">
              <g stroke="#fff" strokeWidth="0.7">
                <polyline points="0,100 100,0 200,100 300,0 400,100" fill="none" />
                <polyline points="0,200 100,100 200,200 300,100 400,200" fill="none" />
                <polyline points="0,300 100,200 200,300 300,200 400,300" fill="none" />
                <polyline points="0,400 100,300 200,400 300,300 400,400" fill="none" />
                <circle cx="50" cy="50" r="18" fill="none" />
                <circle cx="350" cy="350" r="22" fill="none" />
                <rect x="120" y="320" width="60" height="30" rx="12" fill="none" />
              </g>
            </svg>
            {/* Encabezado acordeón y contenido dentro de un div para cerrar correctamente */}
            <div className="relative z-10 w-full">
              <button
                className="w-full flex items-center justify-between md:cursor-default py-2 md:py-0 focus:outline-none"
                onClick={() => isMobile ? setOpenSection(openSection === 'links' ? null : 'links') : null}
                type="button"
              >
                <h3 className="text-base md:text-2xl lg:text-3xl mb-0 text-inverse font-extrabold text-white">Links</h3>
                <span className={`md:hidden transition-transform duration-200 ${openSection === 'links' ? 'rotate-90' : ''}`}>▶</span>
              </button>
              {/* Contenido acordeón */}
              <ul className={`text-sm md:text-body-md overflow-hidden transition-all duration-300 ${isMobile ? (openSection === 'links' ? 'max-h-96 mt-2 mb-2' : 'max-h-0') : 'max-h-full mt-6 mb-6 space-y-4'}`}
                  style={isMobile ? {padding: openSection === 'links' ? '0.5rem 0' : '0', margin: 0} : {}}>
                <li className="flex items-center gap-2">
                  <span className="text-xl text-inverse font-bold">{'›'}</span>
                  <a href="#" className="text-nav-link hover:underline">Inicio</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl text-inverse font-bold">{'›'}</span>
                  <a href="#servicios" className="text-nav-link hover:underline">Servicios</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl text-inverse font-bold">{'›'}</span>
                  <a href="#sobre-folkode" className="text-nav-link hover:underline">Sobre nosotros</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl text-inverse font-bold">{'›'}</span>
                  <a href="#contacto" className="text-nav-link hover:underline">Contáctanos</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Contacto */}
          <div className="w-full md:w-1/2 flex flex-col flex-grow items-start justify-start px-4 md:px-6 footer-anim-item" style={{ transitionDelay: '0.4s', height: '100%' }}>
            {/* Encabezado acordeón */}
            <button
              className="w-full flex items-center justify-between md:cursor-default py-2 md:py-0 focus:outline-none"
              onClick={() => isMobile ? setOpenSection(openSection === 'contacto' ? null : 'contacto') : null}
              type="button"
            >
              <h3 className="text-base md:text-2xl lg:text-3xl mb-0 text-inverse font-extrabold text-white">Contacto</h3>
              <span className={`md:hidden transition-transform duration-200 ${openSection === 'contacto' ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {/* Contenido acordeón */}
            <ul className={`text-sm md:text-body-md overflow-hidden transition-all duration-300 ${isMobile ? (openSection === 'contacto' ? 'max-h-96 mt-2 mb-2' : 'max-h-0') : 'max-h-full mt-6 mb-6 space-y-5'}`}
                style={isMobile ? {padding: openSection === 'contacto' ? '0.5rem 0' : '0', margin: 0} : {}}>
              <li className="flex items-center gap-3">
                <FaGithub className="text-2xl text-black" />
                <a href="https://github.com/FolkodeGroup" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">GitHub</a>
              </li>
              <li className="flex items-center gap-3">
                <FaDiscord className="text-2xl text-black" />
                <a href="https://discord.gg/6Q2WrVtfHj" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Discord</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-2xl text-black" />
                <a href="mailto:contactofolkode@gmail.com" className="text-nav-link hover:underline">contactofolkode@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-2xl text-black" />
                <a href="https://wa.me/541131078008" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">WhatsApp</a>
              </li>
              <li className="flex items-center gap-3">
                <FaFacebook className="text-2xl text-black" />
                <a href="https://www.facebook.com/folkode" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Facebook</a>
              </li>
              <li className="flex items-center gap-3">
                <FaInstagram className="text-2xl text-black" />
                <a href="https://www.instagram.com/fol.kode" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Instagram</a>
              </li>
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-2xl text-black" />
                <a href="https://www.linkedin.com/in/folkode" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="terminos-footer w-full flex flex-row items-center px-4 md:px-32 py-4 gap-4 md:gap-32 footer-anim-item footer-anim-delay-3 border-t border-white/20 text-[10px] md:text-xs">
        <div className="w-1/3 flex justify-start">
          <span className="footer-left">©All Copyright 2025 by Folkode</span>
        </div>
        <div className="w-1/3 flex justify-center">
          <a href="#" className="footer-center hover:underline">Políticas de privacidad</a>
        </div>
        <div className="w-1/3 flex justify-end">
          <span className="footer-right">Diseñado por Folkode</span>
        </div>
      </div>
    </footer>
  );
}