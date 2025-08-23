"use client";
import { useState, useEffect, useCallback } from 'react';
import { Language, User, Theme, AnalyticsData } from '../types';

export const useAppLogic = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({ 
    totalChats: 0, 
    feedback: { likes: 0, dislikes: 0 }, 
    suggestions: {},
    chatDurations: [],
    totalConversions: 0,
    topicTags: {},
  });
  const [isAnalyticsPanelOpen, setIsAnalyticsPanelOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isConversationMode, setIsConversationMode] = useState<boolean>(false);

  // --- Initialization and Persistence Effects ---

  useEffect(() => {
    // Check for admin mode
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
    
    // Load theme
    const savedTheme = localStorage.getItem('chat-theme') as Theme | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Load analytics data
    const savedAnalytics = localStorage.getItem('chat-analytics');
    if (savedAnalytics) {
      try {
        const parsedData = JSON.parse(savedAnalytics);
        // Ensure all new fields exist to prevent errors from old data structures
        setAnalyticsData({
            totalChats: 0, 
            feedback: { likes: 0, dislikes: 0 }, 
            suggestions: {},
            chatDurations: [],
            totalConversions: 0,
            topicTags: {},
            ...parsedData
        });
      } catch (e) {
        console.error("Failed to parse analytics data", e);
      }
    }
  }, []);

  useEffect(() => {
    // Load main chat session state (language, user)
    // This runs only once on mount to establish the initial session
    try {
      const savedState = localStorage.getItem('chatSession');
      if (savedState) {
        const { language, user } = JSON.parse(savedState);
        if (language && user) {
          setLanguage(language);
          setUser(user);
        }
      }
    } catch (error) {
      console.error("Failed to load session state from localStorage", error);
      localStorage.removeItem('chatSession');
    }
  }, []);

  useEffect(() => {
    // Save language and user info, but not the whole session.
    // useChatManager is responsible for its own state.
    if (language && user) {
        const stateToSave = { language, user };
        // We retrieve the full session to avoid overwriting chat manager state
        const fullSession = JSON.parse(localStorage.getItem('chatSession') || '{}');
        localStorage.setItem('chatSession', JSON.stringify({ ...fullSession, ...stateToSave }));
    }
  }, [language, user]);

  useEffect(() => {
    // Save analytics data whenever it changes
    localStorage.setItem('chat-analytics', JSON.stringify(analyticsData));
  }, [analyticsData]);

  // --- Handlers ---

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };
  
  const handleSetUser = useCallback((userDetails: User) => {
    setUser(prevUser => {
        // Only increment total chats if there was no previous user (i.e., a new session is starting)
        if (!prevUser) {
            setAnalyticsData(prevAnalytics => ({ ...prevAnalytics, totalChats: prevAnalytics.totalChats + 1 }));
        }
        return userDetails;
    });
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('chat-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  const handleToggleConversationMode = () => {
    setIsConversationMode(prev => !prev);
  }
  
  const updateAnalytics = useCallback((updater: (prev: AnalyticsData) => AnalyticsData) => {
    setAnalyticsData(updater);
  }, []);
  
  const handleRestartSession = () => {
      setUser(null);
  };

  return {
    language,
    user,
    theme,
    isAdmin,
    analyticsData,
    isAnalyticsPanelOpen,
    isConversationMode,
    handleSelectLanguage,
    handleSetUser,
    handleToggleTheme,
    handleToggleConversationMode,
    setIsAnalyticsPanelOpen,
    updateAnalytics,
    handleRestartSession,
  };
};