import React from 'react';
import Card from '@/ui/Card';

interface ActividadCardProps {
  mode?: 'dark' | 'light';
  iconClass?: string;
  title?: string;
  items?: string[];
}

export default function ActividadCard({
  mode = 'dark',
  iconClass = 'bi bi-code-slash',
  title = 'Desarrollo Web Profesional',
  items = [],
}: ActividadCardProps) {
  const isDark = mode === 'dark';

  const bgColor = isDark ? '!bg-[#01454F]' : '!bg-[#86A869]';
  const iconColor = isDark ? 'text-[#86A869]' : 'text-[#496332]';
  const textColor = '!text-white';

  return (
    <div className="max-w-sm w-full font-['Roboto'] ">
      <Card className={`${bgColor} ${textColor} div-equipo div-tamaño`}>
        <div className="flex flex-col items-center text-center gap-4">
          {/* Ícono principal superior */}
          <i className={`${iconClass} ${iconColor}`} style={{ fontSize: 60 }} />

          {/* Título */}
          <h3 className="title-equipo">{title}</h3>

          {/* Lista de ítems con chevron */}
          <div className="font-extralight font-['Roboto'] text-equipo">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <i className="bi bi-chevron-right mt-1 text-lg" />
                <p className="leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}