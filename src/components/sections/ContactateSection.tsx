'use client'
import React from "react"
import ContactDatos from "@/components/ContactDatos";
import ContactFormSection from "@/components/ContactFormSection";

export default function ContactateSection() {
  return (
    <section id="contacto" className="w-full flex flex-col justify-center items-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center text-white">
        Contáctanos
      </h2>
      
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start justify-center gap-8 px-6 md:px-12">
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