'use client';

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";



const CoverParticles = () => {
    const [init, setInit] = useState(false);
    const [showParticles, setShowParticles] = useState(false);

    useEffect(() => {
        // Inicialmente y en cada resize
        const update = () => {
            if (typeof window !== 'undefined') {
                setShowParticles(window.innerWidth >= 768);
            }
        };
        // Defer para evitar forced layout
        requestAnimationFrame(() => {
            update();
        });
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        if (!showParticles) return;
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, [showParticles]);

    if (!showParticles) return null;

    return (
        init && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: '50%',
                width: '100vw',
                height: '100%',
                transform: 'translateX(-50%)',
                zIndex: -1,
                pointerEvents: 'none'
            }}>
                <Particles
                    id="tsparticles"
                    options={{
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#86A869",
                            },
                            links: {
                                color: "#025159",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 2,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                },
                                value: 80,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div>
        )
    );
};

export default CoverParticles;