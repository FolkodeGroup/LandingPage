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
    <nav className="navbar sticky top-0 left-0 w-full z-50 fade-in"
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
                src="/Folkode_Logo_Bold_Black.png"
                alt="Folkode Logo"
                width={180}
                height={180}
                sizes="(max-width: 768px) 160px, 180px"
                style={{
                  filter: 'drop-shadow(0 2px 16px #86A869cc)',
                  width: '95px',
                  height: '95px',
                  maxWidth: '160px',
                  maxHeight: '160px',
                  marginTop: 8,
                  marginBottom: 8,
                  transition: 'width 0.3s, height 0.3s',
                }}
                priority
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
                className="flex flex-col justify-center items-center w-12 h-12 ml-30 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Abrir menú"
                style={{ background: 'rgba(1,69,79,0.92)', border: 'none', padding: 0, borderRadius: '16px', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)', position: 'relative' }}
              >
                <span style={{
                  display: 'block',
                  width: '32px',
                  height: '4px',
                  background: '#fff',
                  borderRadius: '3px',
                  margin: '4px 0',
                  transition: 'all 0.3s',
                  transform: menuOpen ? 'rotate(45deg) translateY(12px)' : 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
                }}></span>
                <span style={{
                  display: 'block',
                  width: '32px',
                  height: '4px',
                  background: '#fff',
                  borderRadius: '3px',
                  margin: '4px 0',
                  transition: 'all 0.3s',
                  opacity: menuOpen ? 0 : 1,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
                }}></span>
                <span style={{
                  display: 'block',
                  width: '32px',
                  height: '4px',
                  background: '#fff',
                  borderRadius: '3px',
                  margin: '4px 0',
                  transition: 'all 0.3s',
                  transform: menuOpen ? 'rotate(-45deg) translateY(-12px)' : 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
                }}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable, solo visible en móvil */}
        {menuOpen && (
          <div
            className="md:hidden fade-in"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              background: 'linear-gradient(90deg, rgba(1,69,79,0.97) 0%, rgba(2,81,89,0.97) 100%)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
              borderRadius: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: '90px', // espacio para logo y botón
            }}
          >
            {/* Botón de cierre arriba a la derecha */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                zIndex: 10001,
                background: 'rgba(30, 111, 163, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: '#fff',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 0.4)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(30, 111, 163, 0.2)'}
            >
              <span style={{fontSize: 32, lineHeight: 1, fontWeight: 700}}>&times;</span>
            </button>
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '2rem',
            }}>
              {navItems.map((item) => {
                if (item.type === 'component') {
                  // Renderizar el desplegable como un link estilizado igual que los demás
                  return (
                    <span key={item.id} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <span
                        className="text-nav-link text-lg cursor-pointer"
                        style={{
                          color: 'var(--color-text-inverse)',
                          fontSize: '1.3rem',
                          margin: '0.5rem 0',
                          fontWeight: 500,
                          textAlign: 'center',
                          width: '100%'
                        }}
                      >
                        Sobre Folkode
                      </span>
                    </span>
                  );
                } else if (item.target === 'inicio') {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleScrollToTop();
                        setMenuOpen(false);
                      }}
                      className="text-nav-link text-lg cursor-pointer bg-transparent border-none"
                      style={{ color: 'var(--color-text-inverse)', fontSize: '1.3rem', margin: '0.5rem 0' }}
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
                        textDecoration: 'none',
                        fontSize: '1.3rem',
                        margin: '0.5rem 0',
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </ScrollLink>
                  );
                }
              })}
            </div>
          </div>
        )}

        {/* Sección inferior verde SIN borde */}
        {/* <div className="navbar-bottom" /> */}
      </div>
    </nav>
  );
};

export default Navbar;