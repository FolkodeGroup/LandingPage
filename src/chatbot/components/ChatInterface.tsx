"use client";
// Tipos mínimos para PDF.js
type PdfjsPage = {
  getTextContent: () => Promise<{ items: { str: string }[] }>
};
type PdfjsDocument = {
  numPages: number;
  getPage: (pageNum: number) => Promise<PdfjsPage>;
};
type PdfjsLib = {
  getDocument: (data: ArrayBuffer) => { promise: Promise<PdfjsDocument> };
};

// Extensión de la interfaz Window para pdfjsLib como unknown
declare global {
  interface Window {
    pdfjsLib: unknown;
  }
}
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message, Language, User, MeetingDetails } from '../types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

// Import or define the Locales type
import { locales } from '../i18n/locales';

interface ChatInterfaceProps {
  messages: Message[];
  user: User;
  onSendMessage: (text: string, file?: {name: string, dataUrl: string, mimeType: string}) => void;
  onSuggestionClick: (suggestion: string) => void;
  onMeetingScheduled: (details: MeetingDetails) => void;
  isLoading: boolean;
  isSummarizing: boolean;
  isChatEnded: boolean;
  onFeedback: (messageId: string, feedback: 'like' | 'dislike') => void;
  onListen: () => void;
  isListening: boolean;
  inputPlaceholder: string;
  summaryGeneratingText: string;
  chatEndedText: string;
  fileUploadTooltip: string;
  locales: typeof locales;
  language: Language;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
    messages, user, onSendMessage, onSuggestionClick, onMeetingScheduled, isLoading, isSummarizing, isChatEnded, 
    onFeedback, onListen, isListening, inputPlaceholder, summaryGeneratingText, 
    chatEndedText, fileUploadTooltip, locales, language 
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isUserScrolledUp = container.scrollTop + container.clientHeight < container.scrollHeight - 100;
      if (!isUserScrolledUp) {
        scrollToBottom();
      }
    } else {
      scrollToBottom();
    }
  }, [messages, isLoading, isSummarizing]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Show a toast or some indicator for processing
    
    try {
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onSendMessage(input, {
            name: selectedFile.name,
            dataUrl: reader.result as string,
            mimeType: selectedFile.type,
          });
          setInput('');
        };
        reader.readAsDataURL(selectedFile);
      } else if (
        selectedFile.type === 'application/pdf' ||
        selectedFile.type.startsWith('text/')
      ) {
        let extractedText = '';
        if (selectedFile.type === 'application/pdf') {
          const pdfjsLib = window.pdfjsLib as PdfjsLib;
          const pdf = await pdfjsLib.getDocument(await selectedFile.arrayBuffer()).promise;
          const textItems = await Promise.all(
            Array.from({ length: pdf.numPages }, (_, i) => i + 1).map(async (pageNum) => {
              const page = await pdf.getPage(pageNum);
              const content = await page.getTextContent();
              return content.items.map((item: { str: string }) => item.str).join(' ');
            })
          );
          extractedText = textItems.join('\n\n');
        } else {
          extractedText = await selectedFile.text();
        }

        const prompt = `A user has uploaded a document named "${selectedFile.name}". Please analyze its content below and ask them a single, insightful question to get the conversation started. Your question should show that you've understood the document's core topic.\n\nDocument Content:\n"""\n${extractedText}\n"""\n\nUser's accompanying message: "${input}"`;

        onSendMessage(prompt, {
          name: selectedFile.name,
          dataUrl: '', // No dataUrl needed for documents
          mimeType: selectedFile.type,
        });
        setInput('');
      } else {
        // Handle unsupported file types
        alert(`Unsupported file type: ${selectedFile.type}`);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('There was an error reading the file. Please ensure it is not corrupted.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !isChatEnded) {
      onSendMessage(input.trim());
      setInput('');
    }
  };
  
  const lastBotMessageWithOptionsIndex = useMemo(() => {
    if (isLoading || isChatEnded) return -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'bot' && messages[i].text) {
         if (/👉\s*\[([^\]]+)\]/g.test(messages[i].text)) {
            return i;
         }
         return -1;
      }
    }
    return -1;
  }, [messages, isLoading, isChatEnded]);

  const isInterfaceDisabled = isLoading || isSummarizing || isChatEnded || isListening;

  return (
    <div className="flex flex-col h-full min-h-0 bg-white dark:bg-[#111827]" style={{width: '100%', minWidth: 0, minHeight: 0}}>
      <div ref={scrollContainerRef} className="flex-1 min-h-0 overflow-y-auto p-2 md:p-4 space-y-4" style={{maxHeight: '100%', minHeight: 0, minWidth: 0}}>
        {messages.map((msg, index) => (
          <ChatMessage 
            key={msg.id}
            message={msg}
            user={user}
            onSuggestionClick={onSuggestionClick}
            onMeetingScheduled={onMeetingScheduled}
            onFeedback={onFeedback}
            isLoading={isLoading}
            isLastBotMessageWithOptions={index === lastBotMessageWithOptionsIndex}
            locales={locales}
            language={language}
          />
        ))}
        {isLoading && messages.length > 0 && messages[messages.length - 1].sender === 'user' && <TypingIndicator />}
        {isSummarizing && <TypingIndicator text={summaryGeneratingText} />}
        <div ref={messagesEndRef} />
      </div>

      {isChatEnded && (
        <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 font-medium">{chatEndedText}</p>
        </div>
      )}

      {!isChatEnded && <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827]" style={{maxWidth: '100vw', minWidth: 0}}>
        <form onSubmit={handleSend} className="flex items-center space-x-2" style={{maxWidth: '100%', minWidth: 0}}>
           <label htmlFor="file-upload" className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-brand p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition" title={fileUploadTooltip}>
            <i className="bi bi-paperclip text-xl"></i>
          </label>
          <input id="file-upload" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,application/pdf,.txt,.md" className="hidden" disabled={isInterfaceDisabled} />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            aria-label="Chat input"
            className="flex-1 w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 transition disabled:cursor-not-allowed disabled:bg-gray-200 dark:disabled:bg-gray-900"
            style={{maxWidth: '100%', minWidth: 0}}
            disabled={isInterfaceDisabled}
          />

          <button type="button" onClick={onListen} title={isListening ? locales.micTooltipListening[language] : locales.micTooltipIdle[language]} className={`p-3 rounded-full transition cursor-pointer ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`} disabled={isLoading || isSummarizing}>
            <i className="bi bi-mic-fill text-xl"></i>
          </button>

          <button
            type="submit"
            aria-label="Send message"
            className="bg-brand text-white rounded-full p-3 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] focus:ring-brand transition-transform transform hover:scale-110 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
            disabled={isInterfaceDisabled || !input.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>}
    </div>
  );
};

export default ChatInterface;