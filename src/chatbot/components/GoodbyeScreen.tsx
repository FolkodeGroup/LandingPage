
import React from 'react';
import Image from 'next/image';
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
    <div className="flex flex-col items-center justify-center h-full min-h-0 p-4 text-center bg-transparent animate-fade-in" style={{background: 'transparent', width: '100%', height: '100%', minHeight: 0, minWidth: 0}}>
        <div className="w-32 h-32 mb-6 flex items-center justify-center" aria-label="Folkode Logo" style={{maxWidth: '100%', minWidth: 0}}>
            <Image
                src="/Folkode_Logo_Bold_Black.png"
                alt="Logo Folkode"
                width={128}
                height={128}
                className="w-full h-full object-contain rounded-md shadow-lg"
                priority
            />
        </div>
    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100" style={{wordBreak: 'break-word'}}>{locales.goodbyeTitle[language]}</h2>
    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8" style={{maxWidth: '90vw', wordBreak: 'break-word'}}>{locales.goodbyeMessage[language]}</p>
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs" style={{maxWidth: '100vw', minWidth: 0}}>
            <button 
                onClick={onBackToConversation} 
                className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all border-2 border-gray-400 dark:border-gray-500">
                {locales.goodbyeBackToConversation[language]}
            </button>
            <button 
                onClick={onRestartChat} 
                className="w-full px-4 py-3 bg-green-600 text-white font-extrabold rounded-lg shadow-lg hover:bg-green-700 transition-all border-4 border-green-400 animate-pulse focus:outline-none focus:ring-4 focus:ring-green-300">
                <span className="text-lg">🔄 {locales.goodbyeRestartChat[language] || 'Iniciar nuevo chat'}</span>
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
