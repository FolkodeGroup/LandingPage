

import { Language, Theme, User } from '../types';
import { locales } from '../i18n/locales';
import { FiMail } from 'react-icons/fi';

type AppHeaderProps = {
    language: Language | null;
    user: User | null;
    theme: Theme;
    isAdmin: boolean;
    isChatEnded: boolean;
    isLoading: boolean;
    isSummarizing: boolean;
    isConversationMode: boolean;
    locales: typeof locales;
    onToggleTheme: () => void;
    onToggleConversationMode: () => void;
    onExportChat: () => void;
    onEndChat: () => void;
    onOpenAnalytics: () => void;
    onSpeakAllConversation?: () => void;
};

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
    onOpenAnalytics,
    onSpeakAllConversation,
}) => {
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-transparent backdrop-blur-md/40">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 mr-2 flex items-center justify-center bg-white/10 dark:bg-black/20 rounded-lg shadow-inner" aria-label="FolKode Logo">
                    <img src="/folkode-oscuro-no-bg.webp" alt="Folkode logo" />
                </div>
                <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight drop-shadow-sm">
                                    {language && locales.headerTitle[language] ? locales.headerTitle[language] : 'FolKode'}
                                </h1>
                                <p className="text-xs sm:text-sm text-brand font-medium opacity-80">
                                    {language && locales.headerSubtitle[language] ? locales.headerSubtitle[language] : 'Powered by Gemini'}
                                </p>
                </div>
            </div>
            {user && language && (
                <nav className="flex items-center gap-1 sm:gap-2">
                                {isAdmin && language && locales.analyticsTooltip[language] && (
                                    <button onClick={onOpenAnalytics} title={locales.analyticsTooltip[language]} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-brand/10 dark:hover:bg-brand/20 transition">
                                        <i className="bi bi-bar-chart-line-fill"></i>
                                    </button>
                                )}
                                                                <button
                                                                    onClick={onSpeakAllConversation}
                                                                    title={language && locales.conversationModeTooltip[language] ? locales.conversationModeTooltip[language] : ''}
                                                                    className={`p-2 rounded-full transition ${isConversationMode ? 'text-brand bg-brand/20' : 'text-gray-500 dark:text-gray-400 hover:bg-brand/10 dark:hover:bg-brand/20'}`}
                                                                >
                                                                        <i className="bi bi-person-arms-up"></i>
                                                                </button>
                                <button onClick={onToggleTheme} title={language && locales.themeToggleTooltip[language] ? locales.themeToggleTooltip[language] : ''} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-brand/10 dark:hover:bg-brand/20 transition">
                                    <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
                                </button>
                                <button onClick={onExportChat} title={language && locales.exportChatTooltip[language] ? locales.exportChatTooltip[language] : ''} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-brand/10 dark:hover:bg-brand/20 transition">
                                    <i className="bi bi-download"></i>
                                </button>
                                {!isChatEnded && (
                                    <button
                                        onClick={onEndChat}
                                        disabled={isLoading || isSummarizing}
                                        className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] focus:ring-red-500 transition-all transform hover:scale-110 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
                                        title={language && locales.chatEndButton[language] ? locales.chatEndButton[language] : ''}
                                        aria-label={language && locales.chatEndButton[language] ? locales.chatEndButton[language] : 'Enviar resumen por mail'}
                                    >
                                        <FiMail size={22} />
                                    </button>
                                )}
                </nav>
            )}
        </header>
    );
};

export default AppHeader;