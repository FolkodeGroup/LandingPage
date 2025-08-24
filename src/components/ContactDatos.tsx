import React from 'react';
import { FaEnvelope, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from 'react-icons/fa6';

export default function ContactDatos() {
  return (

    <section>
      <div className="w-full max-w-md dark rounded-xl p-8 flex flex-col h-full contactos aling-items-c">
        <h3 style={{fontWeight: '400', fontFamily: 'Roboto, sans-serif', fontStyle: 'italic' }} className="text-4xl md:text-sm lg:text-base">
          Contactate<br />con nuestros<br />profesionales
        </h3>
        <div className="flex flex-col gap-4 mt-2 contactate mt-8">
          <div className="flex items-center gap-3 text-xs md:text-sm lg:text-base">
            <FaEnvelope className="text-lg md:text-xl lg:text-2xl text-primary" />
            <a
              href="mailto:contactofolkode@gmail.com"
              className="truncate font-medium hover:underline"
            >
              contactofolkode@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm lg:text-base">
            <FaWhatsapp className="text-lg md:text-xl lg:text-2xl text-green-600" />
            <a
              href="https://wa.me/541131078008"
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-medium hover:underline"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm lg:text-base">
            <FaFacebook className="text-lg md:text-xl lg:text-2xl text-blue-600" />
            <a
              href="https://www.facebook.com/folkode"
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-medium hover:underline"
            >
              Facebook
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm lg:text-base">
            <FaInstagram className="text-lg md:text-xl lg:text-2xl text-pink-500" />
            <a
              href="https://www.instagram.com/fol.kode"
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-medium hover:underline"
            >
              Instagram
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm lg:text-base">
            <FaLinkedin className="text-lg md:text-xl lg:text-2xl text-blue-600" />
            <a
              href="https://www.linkedin.com/in/folkode"
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-medium hover:underline"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
