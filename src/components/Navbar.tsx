"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Desplegable from "@/components/Desplegable";

const Navbar: React.FC = () => {
  // Definir elementos de navegación de manera más estructurada
  const navItems = [
    { id: 'inicio', label: 'Inicio', type: 'link' },
    { id: 'contactanos', label: 'Contáctanos', type: 'link' },
    { id: 'desplegable', label: '', type: 'component' }, // Para el componente Desplegable
    { id: 'servicios', label: 'Servicios', type: 'link' }
  ];

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
                <span
                  key={item.id}
                  className="text-nav-link"
                  style={{ 
                    color: 'var(--color-text-inverse)', 
                    transition: 'color 0.2s ease' 
                  }}
                >
                  {item.type === 'component' ? <Desplegable /> : item.label}
                </span>
              ))}
            </div>
            {/* Botón hamburguesa solo visible en móvil, alineado a la derecha */}
            <div className="flex md:hidden items-center h-full pr-4">
              <button
                className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Abrir menú"
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >
                <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-7 h-1 bg-white rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable, solo visible en móvil */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-secondary shadow-lg z-50 flex flex-col items-center py-4 gap-4">
            {navItems.map((item) => (
              <span
                key={item.id}
                className="text-nav-link text-lg"
                style={{ color: 'var(--color-text-inverse)' }}
                onClick={() => setMenuOpen(false)}
              >
                {item.type === 'component' ? <Desplegable /> : item.label}
              </span>
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