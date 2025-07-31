import React from 'react';
import { FaEnvelope, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ContactDatos() {
  return (
    <div className="w-full max-w-md dark rounded-xl p-8 flex flex-col h-full contactos aling-items-c">
      <h2 className="font-light tracking-wide">CONTÁCTANOS</h2>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'italic' }}>
        Contactate<br />con nuestros<br />profesionales
      </h3>
      <div className="flex flex-col gap-4 mt-2 contactate">
        <div className="flex items-center gap-3 text-base">
          <FaEnvelope className="text-2xl text-primary" />
          <a
            href="mailto:contactofolkode@gmail.com"
            className="truncate font-medium hover:underline"
          >
            contactofolkode@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-3 text-base">
          <FaWhatsapp className="text-2xl text-green-600" />
          <a
            href="https://wa.me/541131078008"
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-medium hover:underline"
          >
            WhatsApp Cuqui
          </a>
        </div>
        <div className="flex items-center gap-3 text-base">
          <FaFacebook className="text-2xl text-blue-600" />
          <a
            href="https://www.facebook.com/profile.php?id=61578733043220"
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-medium hover:underline"
          >
            Facebook
          </a>
        </div>
        <div className="flex items-center gap-3 text-base">
          <FaInstagram className="text-2xl text-pink-500" />
          <a
            href="https://www.instagram.com/fol.kode"
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-medium hover:underline"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}