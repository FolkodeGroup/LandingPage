
import React from 'react';
import { Language } from '../types';

interface GoodbyeScreenProps {
  locales: any;
  language: Language | null;
  onBackToConversation: () => void;
  onRestartChat: () => void;
}

const GoodbyeScreen: React.FC<GoodbyeScreenProps> = ({ locales, language, onBackToConversation, onRestartChat }) => {
  if (!language) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white dark:bg-[#111827] animate-fade-in">
        <div className="w-32 h-32 mb-6" aria-label="Folk Logo">
            <svg viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-md" shape-rendering="crispEdges">
                <rect width="19" height="19" fill="black"/>
                <path fill="#0D9488" d="M9,0 h1v1h-1z M8,1 h1v1h-1z M10,1 h1v1h-1z M7,2 h1v1h-1z M11,2 h1v1h-1z M6,3 h1v1h-1z M12,3 h1v1h-1z M9,18 h1v1h-1z M8,17 h1v1h-1z M10,17 h1v1h-1z M7,16 h1v1h-1z M11,16 h1v1h-1z M6,15 h1v1h-1z M12,15 h1v1h-1z" />
                <path fill="#5A6E58" d="M0,9 h1v1h-1z M1,8 h1v1h-1z M1,10 h1v1h-1z M2,7 h1v1h-1z M2,11 h1v1h-1z M3,6 h1v1h-1z M3,12 h1v1h-1z M18,9 h1v1h-1z M17,8 h1v1h-1z M17,10 h1v1h-1z M16,7 h1v1h-1z M16,11 h1v1h-1z M15,6 h1v1h-1z M15,12 h1v1h-1z" />
                <path fill="#f1f5f9" d="M5,4 h1v1h-1z M4,5 h1v1h-1z M13,4 h1v1h-1z M14,5 h1v1h-1z M5,14 h1v1h-1z M4,13 h1v1h-1z M13,14 h1v1h-1z M14,13 h1v1h-1z M8,5 h3v1h-3z M7,6 h5v1h-5z M6,7 h7v1h-7z M6,8 h2v1h-2z M10,8 h2v1h-2z M6,9 h2v1h-2z M10,9 h2v1h-2z M6,10 h7v1h-7z M7,11 h5v1h-5z M8,12 h3v1h-3z" />
            </svg>
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
