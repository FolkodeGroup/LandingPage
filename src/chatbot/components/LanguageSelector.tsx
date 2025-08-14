import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const buttonStyle = "w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-brand hover:text-white hover:border-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-brand transition-all duration-200 text-lg transform hover:scale-105";
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
        <div className="space-y-4 w-full max-w-xs">
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