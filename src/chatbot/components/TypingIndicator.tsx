import React from 'react';

export const TypingIndicator: React.FC<{text?: string}> = ({ text = "" }) => (
    <div className="flex items-end gap-2 justify-start animate-fade-in-up">
        <div className="px-4 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-md flex items-center space-x-2">
            <div className="flex items-center justify-center space-x-1.5">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            {text && <span className="text-sm text-gray-500 dark:text-gray-400">{text}</span>}
        </div>
    </div>
);

export default TypingIndicator;
