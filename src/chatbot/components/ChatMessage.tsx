"use client";
import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { Message, Language, MeetingDetails, User } from '../types';
import { locales } from '../i18n/locales';
import SummaryReportView from './SummaryReportView';

import MeetingScheduler from './MeetingScheduler';

interface ChatMessageProps {
  message: Message;
  user: User;
  onSuggestionClick: (text: string) => void;
  onMeetingScheduled: (details: MeetingDetails) => void;
  onFeedback: (messageId: string, feedback: 'like' | 'dislike') => void;
  isLoading: boolean;
  isLastBotMessageWithOptions: boolean;
  locales: typeof locales;
  language: Language;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
    message, user, onSuggestionClick, onMeetingScheduled, onFeedback, isLoading, isLastBotMessageWithOptions, locales, language 
}) => {
  const isBot = message.sender === 'bot';
  const [isCopied, setIsCopied] = useState(false);

  const { mainText, suggestions } = useMemo(() => {
    if (!message.text) return { mainText: '', suggestions: [] };
    const buttonRegex = /👉\s*\[([^\]]+)\]/g;
    const suggestions = [...message.text.matchAll(buttonRegex)].map(match => match[1]);
    const mainText = message.text.replace(buttonRegex, '').trim();
    return { mainText, suggestions };
  }, [message.text]);

  const handleSuggestionClick = (text: string) => {
    if (!isLoading && isLastBotMessageWithOptions) {
      onSuggestionClick(text);
    }
  };
  
  const handleCopy = () => {
    if(!mainText && !message.summaryReport) return;
    const textToCopy = mainText || message.summaryReport?.summary || '';
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderComponent = () => {
    switch (message.component) {
        case 'MeetingScheduler':
            return <MeetingScheduler user={user} onConfirm={onMeetingScheduled} locales={locales} language={language} />;
        default:
            return null;
    }
  }

  if (message.component) {
    return (
        <div className="group relative flex items-start gap-2 animate-fade-in-up justify-start">
            {renderComponent()}
        </div>
    );
  }

  return (
    <div className={`group relative flex items-start gap-2 animate-fade-in-up ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className="flex flex-col">
        <div
          className={`px-4 py-3 rounded-2xl max-w-md md:max-w-lg lg:max-w-xl break-words shadow-md ${
            isBot
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              : 'bg-brand text-white rounded-br-none'
          }`}
        >
          {message.file && (
            <div className="mb-2">
             
              {message.file.dataUrl ? (
                <Image src={message.file.dataUrl} alt={message.file.name} width={320} height={192} className="max-w-xs max-h-48 rounded-lg" />
              ) : (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-500/10 dark:bg-gray-800/20 border border-gray-500/20">
                  <i className="bi bi-file-earmark-text-fill text-2xl text-gray-500 dark:text-gray-400"></i>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate max-w-xs">{message.file.name}</span>
                </div>
              )}
            </div>
          )}
          
          {message.summaryReport && (
            <SummaryReportView summaryReport={message.summaryReport} locales={locales} language={language} />
          )}

          {mainText && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                ol: (props) => <ol className="list-decimal list-inside" {...props} />,
                ul: (props) => <ul className="list-disc list-inside" {...props} />,
                li: (props) => <li className="mb-1" {...props} />,
                strong: (props) => <strong className="font-bold" {...props} />,
                em: (props) => <em className="italic" {...props} />,
                a: (props) => <a className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
              }}
            >
              {mainText}
            </ReactMarkdown>
          )}

          {isBot && suggestions.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={!isLastBotMessageWithOptions || isLoading}
                  className="px-3 py-2 text-sm text-left rounded-lg transition-all duration-200 text-brand-dark bg-brand/10 hover:bg-brand/20 dark:text-brand dark:bg-brand/20 dark:hover:bg-brand/30 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-gray-700 focus:ring-brand disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
         <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={isBot ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isBot && (mainText || message.summaryReport) && (
        <div className="relative flex items-center self-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {message.feedback === undefined && (
            <>
              <button onClick={() => onFeedback(message.id, 'like')} title={locales.feedbackTooltipLike[language]} className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <i className="bi bi-hand-thumbs-up"></i>
              </button>
              <button onClick={() => onFeedback(message.id, 'dislike')} title={locales.feedbackTooltipDislike[language]} className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <i className="bi bi-hand-thumbs-down"></i>
              </button>
            </>
          )}
          {message.feedback === 'like' && (
            <button title={locales.feedbackTooltipLike[language]} className="p-1.5 rounded-full text-green-500 bg-green-500/20" disabled>
              <i className="bi bi-hand-thumbs-up-fill"></i>
            </button>
          )}
           {message.feedback === 'dislike' && (
            <button title={locales.feedbackTooltipDislike[language]} className="p-1.5 rounded-full text-red-500 bg-red-500/20" disabled>
              <i className="bi bi-hand-thumbs-down-fill"></i>
            </button>
          )}

          <button onClick={handleCopy} title={locales.copyTooltip[language]} className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600">
              <i className={`bi ${isCopied ? 'bi-check-lg text-green-400' : 'bi-clipboard'}`}></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;