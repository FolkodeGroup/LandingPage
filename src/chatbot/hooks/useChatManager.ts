"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { Message, Language, User, AnalyticsData, MeetingDetails } from '../types';
import { geminiService } from '../services/geminiService';
import { backendService } from '../services/backendService';
import { personalityService } from '../services/personalityService';
import { locales } from '../i18n/locales';
import { useSpeech } from './useSpeech';

interface UseChatManagerProps {
  language: Language | null;
  user: User | null;
  isConversationMode: boolean;
  onAnalyticsUpdate: (updater: (prev: AnalyticsData) => AnalyticsData) => void;
  onSessionRestart: () => void;
}

export const useChatManager = ({ language, user, isConversationMode, onAnalyticsUpdate, onSessionRestart }: UseChatManagerProps) => {
  // Limpiar estado si no hay usuario al montar (evita quedarse en pantalla de despedida tras recargar)
  useEffect(() => {
    if (!user) {
      setMessages([]);
      setChatSession(null);
      setIsLoading(false);
      setIsSummarizing(false);
      setIsChatEnded(false);
      setShowGoodbyeScreen(false);
      setChatStartDate(null);
      localStorage.removeItem('chatSession');
    }
  }, [user]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [isChatEnded, setIsChatEnded] = useState<boolean>(false);
  const [showGoodbyeScreen, setShowGoodbyeScreen] = useState<boolean>(false);
  const [chatStartDate, setChatStartDate] = useState<number | null>(null);
  
  // Refs to hold the latest state for use in callbacks, preventing stale closures.
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;
  const isSummarizingRef = useRef(isSummarizing);
  isSummarizingRef.current = isSummarizing;
  const isChatEndedRef = useRef(isChatEnded);
  isChatEndedRef.current = isChatEnded;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  
  const inactivityTimerRef = useRef<number | null>(null);

  const handleEndChat = useCallback(async (meetingDetails?: MeetingDetails, finalUser?: User) => {
    const userForReport = finalUser || user;
    if (!userForReport || !language || isSummarizingRef.current || isChatEndedRef.current) return;

    setIsSummarizing(true);
    try {
      const finalMessages = messagesRef.current;
      const summaryReport = await geminiService.generateSummary(finalMessages, language);
      
      // Update analytics with duration and tags
      if (chatStartDate) {
        const duration = Date.now() - chatStartDate;
        onAnalyticsUpdate(prev => {
           const newTopicTags = { ...prev.topicTags };
           summaryReport.tags.forEach(tag => {
               newTopicTags[tag] = (newTopicTags[tag] || 0) + 1;
           });
           return {
               ...prev,
               chatDurations: [...(prev.chatDurations || []), duration],
               topicTags: newTopicTags,
           }
        });
      }

      const summaryMessage: Message = {
        id: `bot-summary-${Date.now()}`,
        sender: 'bot',
        text: '',
        summaryReport,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, summaryMessage]);
      await backendService.sendFullChatReport(userForReport, [...finalMessages, summaryMessage], summaryReport, meetingDetails);

    } catch (error) {
      console.error("Failed to generate summary or send report:", error);
      await backendService.sendFullChatReport(userForReport, messagesRef.current, {
        summary: `Error generating summary: ${error instanceof Error ? error.message : 'Unknown Error'}`,
        tags: ["Error"],
        temperature: "Cold"
      }, meetingDetails);
    } finally {
      setIsSummarizing(false);
      setIsChatEnded(true);
      setShowGoodbyeScreen(true);
    }
  }, [user, language, chatStartDate, onAnalyticsUpdate]);



  // Referencia para speak, para romper la dependencia circular
  const speakRef = useRef<((text: string) => void) | null>(null);

  const handleSendMessage = useCallback(async (text: string, file?: {name: string, dataUrl: string, mimeType: string}) => {
    if (!chatSession || !language || !user || isLoadingRef.current || isChatEndedRef.current) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now(),
      file,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const botMessageId = `bot-${Date.now()}`;
    let firstChunkReceived = false;

    const personalityPrefix = personalityService.getPersonalityPrefix(text);

    const handleMessageCompletion = (fullText: string) => {
      const schedulerRegex = /\{"component":\s*"MeetingScheduler"\}/;
      if (schedulerRegex.test(fullText)) {
        const componentMessage: Message = {
          id: `bot-component-${Date.now()}`,
          sender: 'bot',
          text: '',
          component: 'MeetingScheduler',
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, componentMessage]);
      } else {
        if (speakRef.current) speakRef.current(fullText.replace(/👉\s*\[[^\]]+\]/g, ''));
      }
    };

    await geminiService.sendMessageStream(
      chatSession,
      userMessage,
      personalityPrefix,
      (chunk: string) => {
        if (!firstChunkReceived) {
          const newBotMessage: Message = {
            id: botMessageId,
            sender: 'bot',
            text: chunk,
            timestamp: Date.now(),
          };
          setMessages(prev => [...prev, newBotMessage]);
          firstChunkReceived = true;
        } else {
          setMessages(prev => prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: (msg.text || '') + chunk } : msg
          ));
        }
      },
      (fullText: string) => {
        setIsLoading(false);
        setMessages(prev => prev.filter(msg => msg.id !== botMessageId));
        const finalBotMessage: Message = {
          id: botMessageId,
          sender: 'bot',
          text: fullText,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, finalBotMessage]);
        handleMessageCompletion(fullText);
      }
    );

  }, [chatSession, language, user]);

  // Ahora sí, inicializamos useSpeech y guardamos speak en la ref
  const { isListening, startListening, speak } = useSpeech(language, handleSendMessage, isConversationMode);
  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);
  
  // ...eliminado, ya está arriba...

  const handleMeetingScheduled = useCallback((details: MeetingDetails) => {
    if (!user || !language) return;

    onAnalyticsUpdate(prev => ({ ...prev, totalConversions: prev.totalConversions + 1 }));

    const updatedUser: User = { ...user, contactMethod: details.contactMethod, contactInfo: details.contactInfo };

    const botResponseText = locales.schedulerBotConfirmation[language]
      .replace('{timeSlot}', details.timeSlot)
      .replace('{contactMethod}', details.contactMethod);

    const botResponse: Message = {
      id: `bot-confirm-${Date.now()}`,
      sender: 'bot',
      text: botResponseText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev.filter(m => !m.component), botResponse]);
    speak(botResponseText);

    setTimeout(() => {
      handleEndChat(details, updatedUser);
    }, 1500);

  }, [user, language, speak, handleEndChat, onAnalyticsUpdate]);

  // --- Effects for Initialization and Session Management ---

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('chatSession');
      if (savedState) {
        const { messages, isChatEnded, showGoodbyeScreen, chatStartDate } = JSON.parse(savedState);
        if (messages) setMessages(messages);
        if (isChatEnded) setIsChatEnded(isChatEnded);
        if (showGoodbyeScreen) setShowGoodbyeScreen(showGoodbyeScreen);
        if (chatStartDate) setChatStartDate(chatStartDate);
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
    }
  }, []);

  useEffect(() => {
    const stateToSave = JSON.stringify({ language, user, messages, isChatEnded, showGoodbyeScreen, chatStartDate });
    localStorage.setItem('chatSession', stateToSave);
  }, [messages, isChatEnded, showGoodbyeScreen, language, user, chatStartDate]);

  useEffect(() => {
    if (user && language && !chatSession && !isChatEndedRef.current) {
      const history = messagesRef.current.filter(m => m.sender === 'user' || (m.sender === 'bot' && !m.text?.includes(locales.chatStartError[language]))).map(m => geminiService.messageToContent(m));
      const newChat = geminiService.startChat(history, language, user.name);
      setChatSession(newChat);

      if (messagesRef.current.length === 0) {
        setChatStartDate(Date.now());
        const initialMessageText = locales.initialBotGreeting[language].replace('{name}', user.name);
        const initialMessage: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: initialMessageText,
          timestamp: Date.now(),
        };
        setMessages([initialMessage]);
        speak(initialMessageText.replace(/👉\s*\[[^\]]+\]/g, ''));
      }
    }
  }, [user, language, chatSession, speak]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    if (isLoadingRef.current || isChatEndedRef.current || isListening) return;

    inactivityTimerRef.current = window.setTimeout(() => {
      const currentMessages = messagesRef.current;
      if (!isLoadingRef.current && currentMessages.length > 0 && currentMessages[currentMessages.length - 1].sender === 'user' && language) {
        const proactiveMessage: Message = {
          id: `bot-proactive-${Date.now()}`,
          sender: 'bot',
          text: locales.proactivePrompt[language],
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, proactiveMessage]);
        if (isConversationMode) {
          speak(locales.proactivePrompt[language]);
        }
      }
    }, 60000);
  }, [isListening, language, speak, isConversationMode]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) window.clearTimeout(inactivityTimerRef.current);
    };
  }, [messages, isLoading, resetInactivityTimer]);

  const handleFeedback = useCallback((messageId: string, feedback: 'like' | 'dislike') => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === messageId && msg.feedback === undefined) {
          onAnalyticsUpdate(prevAnalytics => ({
            ...prevAnalytics,
            feedback: {
              ...prevAnalytics.feedback,
              likes: prevAnalytics.feedback.likes + (feedback === 'like' ? 1 : 0),
              dislikes: prevAnalytics.feedback.dislikes + (feedback === 'dislike' ? 1 : 0),
            }
          }));
          return { ...msg, feedback };
        }
        return msg;
      })
    );
  }, [onAnalyticsUpdate]);

  const handleViewConversation = () => {
    setShowGoodbyeScreen(false);
  };
  
  const restartChat = () => {
    setMessages([]);
    setChatSession(null);
    setIsLoading(false);
    setIsSummarizing(false);
    setIsChatEnded(false);
    setShowGoodbyeScreen(false);
    setChatStartDate(null);
    localStorage.removeItem('chatSession');
    onSessionRestart();
  };
  
  return {
    messages,
    isLoading,
    isSummarizing,
    isChatEnded,
    isListening,
    showGoodbyeScreen,
    handleSendMessage,
    handleEndChat,
    handleFeedback,
    handleMeetingScheduled,
    startListening,
    handleViewConversation,
    restartChat,
  };
};