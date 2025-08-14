
import React from 'react';
import { Language, Theme, User } from '../types';

interface AppHeaderProps {
    language: Language | null;
    user: User | null;
    theme: Theme;
    isAdmin: boolean;
    isChatEnded: boolean;
    isLoading: boolean;
    isSummarizing: boolean;
    isConversationMode: boolean;
    locales: any;
    onToggleTheme: () => void;
    onToggleConversationMode: () => void;
    onExportChat: () => void;
    onEndChat: () => void;
    onOpenAnalytics: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
    language,
    user,
    theme,
    isAdmin,
    isChatEnded,
    isLoading,
    isSummarizing,
    isConversationMode,
    locales,
    onToggleTheme,
    onToggleConversationMode,
    onExportChat,
    onEndChat,
    onOpenAnalytics
}) => {
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center">
                <div className="w-10 h-10 mr-4" aria-label="FolKode Logo">
                    <svg viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-md" shape-rendering="crispEdges">
                        <rect width="19" height="19" fill="black"/>
                        <path fill="#0D9488" d="M9,0 h1v1h-1z M8,1 h1v1h-1z M10,1 h1v1h-1z M7,2 h1v1h-1z M11,2 h1v1h-1z M6,3 h1v1h-1z M12,3 h1v1h-1z M9,18 h1v1h-1z M8,17 h1v1h-1z M10,17 h1v1h-1z M7,16 h1v1h-1z M11,16 h1v1h-1z M6,15 h1v1h-1z M12,15 h1v1h-1z" />
                        <path fill="#5A6E58" d="M0,9 h1v1h-1z M1,8 h1v1h-1z M1,10 h1v1h-1z M2,7 h1v1h-1z M2,11 h1v1h-1z M3,6 h1v1h-1z M3,12 h1v1h-1z M18,9 h1v1h-1z M17,8 h1v1h-1z M17,10 h1v1h-1z M16,7 h1v1h-1z M16,11 h1v1h-1z M15,6 h1v1h-1z M15,12 h1v1h-1z" />
                        <path fill="#f1f5f9" d="M5,4 h1v1h-1z M4,5 h1v1h-1z M13,4 h1v1h-1z M14,5 h1v1h-1z M5,14 h1v1h-1z M4,13 h1v1h-1z M13,14 h1v1h-1z M14,13 h1v1h-1z M8,5 h3v1h-3z M7,6 h5v1h-5z M6,7 h7v1h-7z M6,8 h2v1h-2z M10,8 h2v1h-2z M6,9 h2v1h-2z M10,9 h2v1h-2z M6,10 h7v1h-7z M7,11 h5v1h-5z M8,12 h3v1h-3z" />
                    </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{language ? locales.headerTitle[language] : 'FolKode'}</h1>
                  <p className="text-sm text-brand font-medium">{language ? locales.headerSubtitle[language] : 'Powered by Gemini'}</p>
                </div>
            </div>
            {user && language && (
                <div className="flex items-center gap-1 sm:gap-2">
                {isAdmin && (
                    <button onClick={onOpenAnalytics} title={locales.analyticsTooltip[language]} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <i className="bi bi-bar-chart-line-fill"></i>
                    </button>
                )}
                 <button onClick={onToggleConversationMode} title={locales.conversationModeTooltip[language]} className={`p-2 rounded-full transition ${isConversationMode ? 'text-brand bg-brand/20' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                    <i className="bi bi-person-arms-up"></i>
                </button>
                <button onClick={onToggleTheme} title={locales.themeToggleTooltip[language]} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                    <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
                </button>
                <button onClick={onExportChat} title={locales.exportChatTooltip[language]} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                    <i className="bi bi-download"></i>
                </button>
                {!isChatEnded && (
                    <button
                        onClick={onEndChat}
                        disabled={isLoading || isSummarizing}
                        className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] focus:ring-red-500 transition-all transform hover:scale-110 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
                        title={locales.chatEndButton[language]}
                    >
                    <i className="bi bi-power text-xl"></i>
                    </button>
                )}
                </div>
            )}
        </header>
    );
};

export default AppHeader;