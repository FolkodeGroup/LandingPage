"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Desplegable from "@/components/Desplegable";

const Navbar: React.FC = () => {
  // Función para manejar scroll al inicio usando react-scroll
  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  // Configuración de offset para react-scroll según viewport
  const getScrollOffset = () => {
    // Verificar si estamos en el cliente antes de acceder a window
    if (typeof window === 'undefined') return 196; // Valor por defecto para SSR

    const width = window.innerWidth;
    if (width >= 768) return 196; // Desktop
    if (width >= 421) return 136; // Tablet
    return 110; // Móvil
  };

  // Definir elementos de navegación de manera más estructurada
  const navItems = [
    { id: 'inicio', label: 'Inicio', type: 'link', href: '#inicio', target: 'inicio' },
    { id: 'servicios', label: 'Servicios', type: 'link', href: '#servicios', target: 'servicios' },
    { id: 'desplegable', label: '', type: 'component' }, // Para el componente Desplegable
    { id: 'proyectos', label: 'Proyectos', type: 'link', href: '#proyectos', target: 'proyectos' },
    { id: 'contáctanos', label: 'Contáctanos', type: 'link', href: '#contacto', target: 'contacto' },
  ] as const;

  // Estado para el menú hamburguesa (solo móvil)
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 fade-in"
      style={{
        background: 'linear-gradient(90deg, rgba(1,69,79,0.92) 0%, rgba(2,81,89,0.92) 100%)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
        borderRadius: '0 0 24px 24px',
        borderBottom: '1.5px solid rgba(134,168,105,0.18)'
      }}>
      {/* Contenedor principal */}
      <div className="navbar-main">
        {/* Sección superior (negra + verde) */}
        <div className="navbar-top">
          {/* Sección izquierda negra con forma diagonal */}
          <div className="navbar-left">
            <div className="navbar-left-diagonal">
              <Image
                className="navbar-logo-img fade-in"
                src="/folkode-oscuro-no-bg.png"
                alt="Folkode Logo"
                width={180}
                height={180}
                style={{ filter: 'drop-shadow(0 2px 12px #86A86988)' }}
              />
            </div>
          </div>

          {/* Parte derecha SIEMPRE verde, menú normal u hamburguesa */}
          <div className="navbar-right bg-secondary-hover flex-1 flex items-center justify-end md:justify-around">
            {/* Menú de navegación normal, oculto en móvil */}
            <div className="hidden md:flex w-full justify-around items-center">
              {navItems.map((item) => {
                if (item.type === 'component') {
                  return <span key={item.id}><Desplegable /></span>;
                } else if (item.target === 'inicio') {
                  return (
                    <button
                      key={item.id}
                      onClick={handleScrollToTop}
                      className="text-nav-link cursor-pointer bg-transparent border-none"
                      style={{
                        color: 'var(--color-text-inverse)',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {item.label}
                    </button>
                  );
                } else {
                  return (
                    <ScrollLink
                      key={item.id}
                      to={item.target || ''}
                      spy={true}
                      smooth={true}
                      offset={-getScrollOffset()}
                      duration={800}
                      activeClass="active"
                      className="text-nav-link cursor-pointer"
                      style={{
                        color: 'var(--color-text-inverse)',
                        transition: 'color 0.2s ease',
                        textDecoration: 'none'
                      }}
                    >
                      {item.label}
                    </ScrollLink>
                  );
                }
              })}
            </div>
            {/* Botón hamburguesa solo visible en móvil, alineado a la derecha */}
            <div className="flex md:hidden items-center h-full pr-4">
              <button
                className="flex flex-col justify-center items-center w-10 h-10 ml-30 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Abrir menú"
                style={{ background: 'rgba(1,69,79,0.92)', border: 'none', padding: 0, borderRadius: '12px', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
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
          <div className="md:hidden absolute top-full left-0 w-full fade-in"
            style={{
              background: 'linear-gradient(90deg, rgba(1,69,79,0.97) 0%, rgba(2,81,89,0.97) 100%)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
              borderRadius: '0 0 24px 24px',
              borderBottom: '1.5px solid rgba(134,168,105,0.18)',
              padding: '1rem 0',
            }}>
            {navItems.map((item) => {
              if (item.type === 'component') {
                return <span key={item.id}><Desplegable /></span>;
              } else if (item.target === 'inicio') {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleScrollToTop();
                      setMenuOpen(false);
                    }}
                    className="text-nav-link text-lg cursor-pointer bg-transparent border-none"
                    style={{ color: 'var(--color-text-inverse)' }}
                  >
                    {item.label}
                  </button>
                );
              } else {
                return (
                  <ScrollLink
                    key={item.id}
                    to={item.target || ''}
                    spy={true}
                    smooth={true}
                    offset={-getScrollOffset()}
                    duration={800}
                    activeClass="active"
                    className="text-nav-link text-lg cursor-pointer"
                    style={{
                      color: 'var(--color-text-inverse)',
                      textDecoration: 'none'
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </ScrollLink>
                );
              }
            })}
          </div>
        )}

        {/* Sección inferior verde SIN borde */}
        {/* <div className="navbar-bottom" /> */}
      </div>
    </nav>
  );
};

export default Navbar;