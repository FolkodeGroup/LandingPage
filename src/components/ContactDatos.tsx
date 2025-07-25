import React from 'react';
import Card from '@/ui/Card';

interface ContactCardProps {
  email?: string;
  socialMedia?: string;
  phone?: string;
  website?: string;
}

export default function ContactCard({
  email = "contactofolkode@gmail.com",
  socialMedia = "folkode",
  phone = "+54 9 11 2345-6789",
  website = "fol.kode",
}: ContactCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="bg-black text-inverse p-4 sm:p-6 pb-4 flex flex-col h-full w-full">
        <div className="flex flex-col flex-1">
          {/* Sección de títulos */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-[36px] font-light font-roboto text-left">
              CONTÁCTANOS
            </h2>
            <p className="text-3xl sm:text-[48px] leading-[1.1] font-medium text-left mt-2 mb-4">
              Contactate con nuestros profesionales
            </p>
          </div>

          {/* Items de contacto con Roboto Medium */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-4">
            {/* Email */}
            <div className="flex items-center gap-3 sm:gap-4">
              <i className="bi bi-envelope-fill text-primary text-2xl" />
              <div className="flex-1 flex items-center min-w-0">
                <span className="truncate text-base sm:text-lg font-roboto-medium text-white brightness-125 hover:brightness-150 transition-all">
                  {email}
                </span>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="flex items-center gap-3 sm:gap-4">
              <i className="bi bi-instagram text-primary text-2xl" />
              <div className="flex-1 flex items-center min-w-0">
                <span className="truncate text-base sm:text-lg font-roboto-medium text-white brightness-125 hover:brightness-150 transition-all">
                  {socialMedia}
                </span>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-3 sm:gap-4">
              <i className="bi bi-whatsapp text-primary text-2xl" />
              <div className="flex-1 flex items-center min-w-0">
                <span className="truncate text-base sm:text-lg font-roboto-medium text-white brightness-125 hover:brightness-150 transition-all">
                  {phone}
                </span>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center gap-3 sm:gap-4">
              <i className="bi bi-globe2 text-primary text-2xl" />
              <div className="flex-1 flex items-center min-w-0">
                <span className="truncate text-base sm:text-lg font-roboto-medium text-white brightness-125 hover:brightness-150 transition-all">
                  {website}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}