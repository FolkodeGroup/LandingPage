import React from 'react';

interface ClientCommentProps {
  comment: string;
  author: string;
  role: string;
  avatarUrl: string; // Ruta de la imagen
  className?: string;
}

const ClientComment: React.FC<ClientCommentProps> = ({
  comment,
  author,
  role,
  avatarUrl,
  className = '',
}) => {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 ${className}`}>
      {/* Título simple como texto - Ahora en blanco */}
      <div className="text-right mb-4">
        <span className="text-h3 text-white">Comments del Cliente</span> {/* Cambiado a text-white */}
      </div>

      {/* Contenedor principal con tarjeta - fondo blanco y bordes verdes */}
      <div className="border-2 border-[#86A869] bg-white pl-10 md:pl-14 lg:pl-16 pr-6 py-6 relative min-h-[180px]">
        {/* Imagen */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <img 
            src={avatarUrl} 
            alt={`${author} avatar`}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
          />
        </div>

        {/* Contenido de texto - todo en negro */}
        <div className="h-full flex flex-col justify-center items-center text-center ml-1">
          <p className="text-body-lg text-black mb-6 px-4">
            Aquí, en mi primer mes, ya estaba haciendo Pull Requests en un proyecto para un cliente real.
          </p>
          
          <div className="text-center">
            <h4 className="text-h3 !text-xl !font-bold !mb-1 text-black">Anette Black</h4>
            <p className="text-body-md text-black">Director, Producer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientComment;