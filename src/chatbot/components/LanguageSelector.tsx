import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
  onClose?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage, onClose }) => {
  const buttonStyle = `w-full px-4 py-2 border-2 border-transparent font-bold text-base rounded-lg bg-gradient-to-br from-brand to-teal-600 text-white shadow-md hover:from-teal-600 hover:to-brand hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand/60 transition-all duration-200 tracking-wide`;

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-3 p-4 w-full max-w-[320px] min-w-[180px] mx-auto bg-[#181f2a] rounded-2xl shadow-2xl border border-gray-700 animate-fade-in"
      style={{ minHeight: 180 }}
    >
      {onClose && (
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
      )}
      <div className="space-y-2 w-full">
        <button onClick={() => onSelectLanguage('en')} className={`${buttonStyle} cursor-pointer`}>English</button>
        <button onClick={() => onSelectLanguage('es')} className={`${buttonStyle} cursor-pointer`}>Español</button>
        <button onClick={() => onSelectLanguage('pt')} className={`${buttonStyle} cursor-pointer`}>Português</button>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 480px) {
          .language-selector-root {
            max-width: 98vw !important;
            min-width: 0 !important;
            padding: 1rem !important;
          }
          .language-selector-root button {
            font-size: 1rem !important;
            padding: 0.5rem 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;