'use client'
import { motion } from 'framer-motion'
import React, { useState, useRef } from "react";
import { Link as ScrollLink } from 'react-scroll';

export default function Desplegable() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Funciones para manejar hover
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const menuRef = useRef<HTMLDivElement>(null);

    // Configuración de offset para react-scroll según viewport
    const getScrollOffset = () => {
        if (typeof window === 'undefined') return 196; 
        
        const width = window.innerWidth;
        if (width >= 768) return 196; // Desktop
        if (width >= 421) return 136; // Tablet
        return 110; // Móvil
    };

    return (
        <div 
            ref={menuRef} 
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                type="button"
                className="btn-desplegable"
            >
                Sobre Folkode
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.05 }}
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 10,
                        width: "11rem",
                        background: "#025159",
                        borderRadius: "0 0 8px 8px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                        padding: "1vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ul className="btn-desplegable-abierto" style={{ width: "100%", textAlign: "center", margin: 0, padding: 0 }}>
                        <li className="mb-2 text-body-desplegable" style={{ width: "100%" }}>
                            <ScrollLink
                                to="sobre-folkode"
                                spy={true}
                                smooth={true}
                                offset={-getScrollOffset()}
                                duration={800}
                                activeClass="active"
                                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff', textDecoration: 'none'}}
                            >
                                Nosotros
                            </ScrollLink>
                        </li>
                        <li className="mb-2 text-body-desplegable" style={{ width: "100%" }}>
                            <ScrollLink
                                to="nuestro-equipo"
                                spy={true}
                                smooth={true}
                                offset={-getScrollOffset()}
                                duration={800}
                                activeClass="active"
                                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff', textDecoration: 'none'}}
                            >
                                Nuestro Equipo
                            </ScrollLink>
                        </li>
                        <li className="mb-2 text-body-desplegable" style={{ width: "100%" }}>
                            <ScrollLink
                                to="que-ofrecemos"
                                spy={true}
                                smooth={true}
                                offset={-getScrollOffset()}
                                duration={800}
                                activeClass="active"
                                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff', textDecoration: 'none'}}
                            >
                                Que Ofrecemos
                            </ScrollLink>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
}