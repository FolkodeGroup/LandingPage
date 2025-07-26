'use client';
import { FaGithub, FaDiscord, FaEnvelope, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Footer() {
  // Fallback a HTMLElement si HTMLFooterElement no está disponible
  const footerRef = useRef<HTMLElement>(null);

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

  return (
    <footer ref={footerRef} className="footer-folkode-dark bg-secondary text-inverse pt-0">
      <div className="flex flex-col md:flex-row">
        {/* Logo y lema */}
        <div className="bg-gray w-full md:w-1/3 flex flex-col items-center justify-center py-10 px-6 footer-anim-item" style={{ transitionDelay: '0.1s' }}>
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

        {/* Links */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-10 px-6 footer-anim-item" style={{ transitionDelay: '0.25s' }}>
          <ul className="space-y-4 text-body-md">
          <h3 className="text-h3 mb-6 text-inverse font-bold">Links</h3>
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
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-10 px-6 footer-anim-item" style={{ transitionDelay: '0.4s' }}>
          <ul className="space-y-5 text-body-md">
          <h3 className="text-h3 mb-6 text-inverse font-bold">Contacto</h3>
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
              <a href="https://www.facebook.com/profile.php?id=61578733043220" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Facebook</a>
            </li>
            <li className="flex items-center gap-3">
              <FaInstagram className="text-2xl text-pink-500" />
              <a href="https://www.instagram.com/fol.kode" target="_blank" rel="noopener noreferrer" className="text-nav-link hover:underline">Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="terminos-footer text-center flex flex-col md:flex-row justify-between items-center px-6 footer-anim-item" style={{ transitionDelay: '0.55s' }}>
        <span className="footer-left</svg>">©All Copyright 2025 by Folkode</span>
        <a href="#" className="footer-center hover:underline">Políticas de privacidad</a>
        <span className="footer-right">Diseñado por Folkode</span>
      </div>
    </footer>
  );
}