'use client'
import React from "react"
import ContactDatos from "@/components/ContactDatos";
import ContactFormSection from "@/components/ContactFormSection";

export default function ContactateSection() {
  return (
    <section className="w-full flex justify-center">
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