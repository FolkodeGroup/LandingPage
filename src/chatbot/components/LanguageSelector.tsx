import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const buttonStyle = `w-full px-6 py-4 border-2 border-transparent font-extrabold text-lg rounded-xl bg-gradient-to-br from-brand to-teal-600 text-white shadow-md hover:from-teal-600 hover:to-brand hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand/60 transition-all duration-200 tracking-wide`;
  
  return (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in bg-transparent" style={{background: 'transparent'}}>
    <div className="space-y-5 w-full max-w-xs bg-transparent" style={{background: 'transparent'}}>
      <button onClick={() => onSelectLanguage('en')} className={buttonStyle}>English</button>
      <button onClick={() => onSelectLanguage('es')} className={buttonStyle}>Español</button>
      <button onClick={() => onSelectLanguage('pt')} className={buttonStyle}>Português</button>
    </div>
    <style>{`
      .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
  );
};

export default LanguageSelector;