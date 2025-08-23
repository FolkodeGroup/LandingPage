
import React from 'react';
import { Language } from '../types';

type Locales = {
  goodbyeTitle: Record<Language, string>;
  goodbyeMessage: Record<Language, string>;
  goodbyeBackToConversation: Record<Language, string>;
  goodbyeRestartChat: Record<Language, string>;
};

interface GoodbyeScreenProps {
  locales: Locales;
  language: Language | null;
  onBackToConversation: () => void;
  onRestartChat: () => void;
}

const GoodbyeScreen: React.FC<GoodbyeScreenProps> = ({ locales, language, onBackToConversation, onRestartChat }) => {
  if (!language) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-transparent animate-fade-in" style={{background: 'transparent'}}>
        <div className="w-32 h-32 mb-6 flex items-center justify-center" aria-label="Folkode Logo">
            <img
                src="/folkode-oscuro.png"
                alt="Logo Folkode"
                className="w-full h-full object-contain rounded-md shadow-lg"
                draggable="false"
            />
        </div>
        <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">{locales.goodbyeTitle[language]}</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">{locales.goodbyeMessage[language]}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <button 
                onClick={onBackToConversation} 
                className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                {locales.goodbyeBackToConversation[language]}
            </button>
            <button 
                onClick={onRestartChat} 
                className="w-full px-4 py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark transition-all">
                {locales.goodbyeRestartChat[language]}
            </button>
        </div>
        
        <style>{`
            .animate-fade-in {
                animation: fadeIn 0.8s ease-in-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `}</style>
    </div>
  );
};

export default GoodbyeScreen;
