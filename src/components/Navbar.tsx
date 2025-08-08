"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Desplegable from "@/components/Desplegable";

const Navbar: React.FC = () => {
  // Función para manejar el scroll suave con offset
  const handleScrollTo = (targetId: string) => {
    // Para "inicio", ir al top de la página
    if (targetId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.getElementById(targetId);
    if (!element) return;

    // Obtener la altura del navbar según el viewport
    const getNavbarHeight = () => {
      const width = window.innerWidth;
      if (width >= 768) return 196; // Desktop
      if (width >= 421) return 136; // Tablet
      return 110; // Móvil
    };

    const navbarHeight = getNavbarHeight();
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  };

  // Definir elementos de navegación de manera más estructurada
  const navItems = [
    { id: 'inicio', label: 'Inicio', type: 'link', href: '#inicio', target: 'inicio' },
    { id: 'servicios', label: 'Servicios', type: 'link', href: '#servicios', target: 'servicios' },
    { id: 'desplegable', label: '', type: 'component' }, // Para el componente Desplegable
    { id: 'proyectos', label: 'Proyectos', type: 'link', href: '#proyectos', target: 'proyectos' },
    { id: 'contactanos', label: 'Contáctanos', type: 'link', href: '#contacto', target: 'contacto' },
  ] as const;

  // Estado para el menú hamburguesa (solo móvil)
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 bg-secondary shadow-lg">
      {/* Contenedor principal */}
      <div className="navbar-main">
        {/* Sección superior (negra + verde) */}
        <div className="navbar-top">
          {/* Sección izquierda negra con forma diagonal */}
          <div className="navbar-left">
            <div className="navbar-left-diagonal">
              <Image
                className="navbar-logo-img"
                src="/folkode-oscuro-no-bg.png"
                alt="Folkode Logo"
                width={180}
                height={180}
              />
            </div>
          </div>

          {/* Parte derecha SIEMPRE verde, menú normal u hamburguesa */}
          <div className="navbar-right bg-secondary-hover flex-1 flex items-center justify-end md:justify-around">
            {/* Menú de navegación normal, oculto en móvil */}
            <div className="hidden md:flex w-full justify-around items-center">
              {navItems.map((item) => (
                item.type === 'component' ? (
                  <span key={item.id}><Desplegable /></span>
                ) : (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.type === 'link' && item.target) {
                        handleScrollTo(item.target);
                      }
                    }}
                    className="text-nav-link cursor-pointer bg-transparent border-none"
                    style={{
                      color: 'var(--color-text-inverse)',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
            {/* Botón hamburguesa solo visible en móvil, alineado a la derecha */}
            <div className="flex md:hidden items-center h-full pr-4">
              <button
                className="flex flex-col justify-center items-center w-10 h-10 ml-30 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Abrir menú"
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >
                <span className={`block w-7 h-0.75 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-7 h-0.75 bg-white rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-7 h-0.75 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable, solo visible en móvil */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-secondary shadow-lg z-50 flex flex-col items-center py-2 gap-4">
            {navItems.map((item) => (
              item.type === 'component' ? (
                <span key={item.id} ><Desplegable /></span>
              ) : (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.type === 'link' && item.target) {
                      handleScrollTo(item.target);
                    }
                    setMenuOpen(false);
                  }}
                  className="text-nav-link text-lg cursor-pointer bg-transparent border-none"
                  style={{ color: 'var(--color-text-inverse)' }}
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        )}

        {/* Sección inferior verde SIN borde */}
        <div className="navbar-bottom" />
      </div>
    </nav>
  );
};

export default Navbar;