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
    const onScroll = () => {
      if (!footerRef.current) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      // Si el usuario está cerca del fondo, muestra el footer
      if (scrollY + windowHeight >= bodyHeight - 10) {
        footerRef.current.classList.add("footer-visible");
      } else {
        footerRef.current.classList.remove("footer-visible");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Ejecutar una vez al montar para el caso de scroll inicial
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
        {/* Logo y lema */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center h-full py-10 px-6 footer-anim-item" style={{ transitionDelay: '0.1s', minHeight: '100%' }}>
          <div className="flex flex-col md:flex-row items-center justify-center mb-4 gap-4 w-full">
            <Image
              src="/folkode-oscuro-no-bg.png"
              alt="Folkode Logo"
              width={200}
              height={200}
            />
            <span className="text-primary font-semibold text-h1 w-full truncate md:max-w-none text-center md:text-left">
              Folkode
            </span>
          </div>
          <p className="italic text-gray-solid text-body-lg text-center mt-2">
            Transformamos ideas<br />en soluciones reales e innovadoras
          </p>
        </div>
        {/* Fondo verde para Links y Contacto con acordeón en mobile */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row bg-secondary pt-4 pb-4 md:pt-12 md:pb-12">
          {/* Links */}
          <div className="w-full md:w-1/2 flex flex-col flex-grow items-center md:items-start justify-start px-4 md:px-6 footer-anim-item" style={{ transitionDelay: '0.25s', height: '100%' }}>
            {/* Encabezado acordeón */}
            <button
              className="w-full flex items-center justify-between md:cursor-default py-2 md:py-0 focus:outline-none"
              onClick={() => isMobile ? setOpenSection(openSection === 'links' ? null : 'links') : null}
              type="button"
            >
              <h3 className="text-h3 mb-0 text-inverse font-bold">Links</h3>
              <span className={`md:hidden transition-transform duration-200 ${openSection === 'links' ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {/* Contenido acordeón */}
            <ul className={`text-body-md overflow-hidden transition-all duration-300 ${isMobile ? (openSection === 'links' ? 'max-h-96 mt-2 mb-2' : 'max-h-0') : 'max-h-full mt-6 mb-6 space-y-4'}`}
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
                <a href="#nosotros" className="text-nav-link hover:underline">Sobre nosotros</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl text-inverse font-bold">{'›'}</span>
                <a href="#contacto" className="text-nav-link hover:underline">Contáctanos</a>
              </li>
            </ul>
          </div>
          {/* Contacto */}
          <div className="w-full md:w-1/2 flex flex-col flex-grow items-center md:items-start justify-start px-4 md:px-6 footer-anim-item" style={{ transitionDelay: '0.4s', height: '100%' }}>
            {/* Encabezado acordeón */}
            <button
              className="w-full flex items-center justify-between md:cursor-default py-2 md:py-0 focus:outline-none"
              onClick={() => isMobile ? setOpenSection(openSection === 'contacto' ? null : 'contacto') : null}
              type="button"
            >
              <h3 className="text-h3 mb-0 text-inverse font-bold">Contacto</h3>
              <span className={`md:hidden transition-transform duration-200 ${openSection === 'contacto' ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {/* Contenido acordeón */}
            <ul className={`text-body-md overflow-hidden transition-all duration-300 ${isMobile ? (openSection === 'contacto' ? 'max-h-96 mt-2 mb-2' : 'max-h-0') : 'max-h-full mt-6 mb-6 space-y-5'}`}
                style={isMobile ? {padding: openSection === 'contacto' ? '0.5rem 0' : '0', margin: 0} : {}}>
              <li className="flex items-center gap-3">
                <FaGithub className="text-2xl text-black" />
                <a href="https://github.com/FolkodeGroup" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">GitHub</a>
              </li>
              <li className="flex items-center gap-3">
                <FaDiscord className="text-2xl text-blue-600" />
                <a href="https://discord.gg/6Q2WrVtfHj" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Discord</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-2xl text-primary" />
                <a href="mailto:contactofolkode@gmail.com" className="text-nav-link hover:underline">contactofolkode@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-2xl text-green-600" />
                <a href="https://wa.me/541131078008" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">WhatsApp</a>
              </li>
              <li className="flex items-center gap-3">
                <FaFacebook className="text-2xl text-blue-600" />
                <a href="https://www.facebook.com/folkode" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Facebook</a>
              </li>
              <li className="flex items-center gap-3">
                <FaInstagram className="text-2xl text-pink-500" />
                <a href="https://www.instagram.com/fol.kode" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Instagram</a>
              </li>
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-2xl text-blue-600" />
                <a href="https://www.linkedin.com/in/folkode" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="terminos-footer w-full flex flex-row items-center px-12 md:px-32 py-4 gap-8 md:gap-32 footer-anim-item border-t border-white/20" style={{ transitionDelay: '0.55s' }}>
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