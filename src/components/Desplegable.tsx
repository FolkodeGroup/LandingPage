'use client'
import { motion } from 'framer-motion'
import React, { useState, useRef, useEffect } from "react";

export default function Desplegable() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const menuRef = useRef<HTMLDivElement>(null);

    // Función para manejar el scroll suave con offset (igual que en Navbar)
    const handleScrollTo = (targetId: string) => {
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

        setIsOpen(false); // Cerrar el dropdown después del click
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div ref={menuRef} style={{ position: "relative", display: "inline-block" }}>
            <button
                type="button"
                className="btn-desplegable"
                onClick={toggleDropdown}
            >
                Sobre Folkode
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.85 }}
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 10,
                        width: "11rem",
                        background: "#86A869",
                        borderRadius: "0 0 8px 8px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                        padding: 0
                    }}
                >
                    <ul className="btn-desplegable-abierto">
                        <li className="mb-2 text-body-desplegable">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollTo('sobre-folkode');
                                }}
                                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit'}}
                            >
                                Nosotros
                            </button>
                        </li>
                        <li className="mb-2 text-body-desplegable">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollTo('nuestro-equipo');
                                }}
                                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit'}}
                            >
                                Nuestro Equipo
                            </button>
                        </li>
                        <li className="mb-2 text-body-desplegable">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollTo('que-ofrecemos');
                                }}
                                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit'}}
                            >
                                Que Ofrecemos
                            </button>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    )
}