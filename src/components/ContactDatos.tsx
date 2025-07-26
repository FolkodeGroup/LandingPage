import React from 'react';
import { FaEnvelope, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ContactDatos() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center h-full">
      <h3 className="text-lg font-light text-gray-700 mb-2 tracking-wide">CONTÁCTANOS</h3>
      <h2 className="text-3xl font-bold text-black mb-6 leading-tight" style={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'italic' }}>
        Contactate<br />con nuestros<br />profesionales
      </h2>
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center gap-3 text-black text-base">
          <FaEnvelope className="text-2xl" />
          <span className="truncate font-medium">devcorecontacto@gmail.com</span>
        </div>
        <div className="flex items-center gap-3 text-black text-base">
          <FaFacebook className="text-2xl text-[#1877f3]" />
          <span className="truncate font-medium">devcoregroup</span>
        </div>
        <div className="flex items-center gap-3 text-black text-base">
          <FaWhatsapp className="text-2xl text-[#25d366]" />
          <span className="truncate font-medium">+54 9 11 3107-8008</span>
        </div>
        <div className="flex items-center gap-3 text-black text-base">
          <FaInstagram className="text-2xl text-[#e1306c]" />
          <span className="truncate font-medium">devcoregroup</span>
        </div>
      </div>
    </div>
  );
}