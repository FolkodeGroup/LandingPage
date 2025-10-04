'use client'
import React from "react"
import ContactDatos from "@/components/ContactDatos";
import ContactFormSection from "@/components/ContactFormSection";

export default function ContactateSection() {
  return (
    <section
      id="contacto"
      className="w-full flex flex-col justify-center items-center relative overflow-hidden rounded-xl"
      style={{
        background: "linear-gradient(135deg, #01454F 60%, #0a2327 100%)",
        minHeight: "650px",
      }}
    >
      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Puedes reemplazar esto por una librería de partículas si lo deseas */}
        <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left:0, top:0}}>
          <circle cx="200" cy="100" r="3" fill="#00FFD0" opacity="0.3" />
          <circle cx="400" cy="300" r="2" fill="#FFF200" opacity="0.2" />
          <circle cx="1200" cy="500" r="4" fill="#00FFD0" opacity="0.2" />
          <circle cx="900" cy="200" r="2.5" fill="#FFF200" opacity="0.2" />
          {/* ...más círculos decorativos... */}
        </svg>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center text-white z-10 drop-shadow-lg tracking-tight">
        Contáctanos
      </h2>
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start justify-center gap-8 px-6 md:px-12 z-10">
        <div className="flex-1 flex justify-center">
          <ContactDatos />
        </div>
        <div className="flex-1 flex justify-center">
          <ContactFormSection />
        </div>
      </div>
    </section>
  )
}