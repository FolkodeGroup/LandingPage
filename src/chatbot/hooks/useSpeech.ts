"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { Language, SpeechRecognition } from '../types';
import { locales } from '../i18n/locales';

export const useSpeech = (
    language: Language | null,
    onSpeechResult: (transcript: string) => void,
    isConversationMode: boolean,
) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    // Effect to select the best available voice for Text-to-Speech
    useEffect(() => {
        const getAndSetVoice = () => {
            if (!language || typeof window === 'undefined' || !window.speechSynthesis) return;
            const voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) return; // Voices not loaded yet

            const langCode = language; // e.g., 'en', 'es', 'pt'
            
            // Voice selection priority
            const voicesForLang = voices.filter(v => v.lang.startsWith(langCode));
            
            // 1. Prefer "Google" voices for consistency and quality
            const googleVoice = voicesForLang.find(v => v.name.toLowerCase().includes('google'));
            
            // 2. Prefer local, high-quality voices
            const nativeVoice = voicesForLang.find(v => v.localService);
            
            // 3. Fallback to the first available voice for the language
            const firstAvailableVoice = voicesForLang[0];

            const bestVoice = googleVoice || nativeVoice || firstAvailableVoice || null;
            
            setSelectedVoice(bestVoice);
        };

        // Voices may load asynchronously. Check if they are already available.
        if (speechSynthesis.getVoices().length > 0) {
            getAndSetVoice();
        } else {
            // Otherwise, wait for the 'voiceschanged' event.
            speechSynthesis.onvoiceschanged = getAndSetVoice;
        }

        return () => {
            // Clean up the event listener
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                 window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, [language]);


    const startListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            return;
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionAPI) {
            alert(locales.voiceNotSupported?.[language || 'en']);
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language || 'en-US';
        recognitionRef.current = recognition;

        let finalTranscript = '';
        recognition.onresult = (event) => {
            finalTranscript = event.results[0][0].transcript;
        };

        recognition.onend = () => {
            setIsListening(false);
            if (finalTranscript.trim()) {
                onSpeechResult(finalTranscript.trim());
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
    }, [isListening, language, onSpeechResult]);

    const speak = useCallback((textToSpeak: string) => {
        if ('speechSynthesis' in window && textToSpeak) {
            speechSynthesis.cancel(); // Cancel any previous speech
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            
            // --- Voice Quality Improvements ---
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            if (language) {
                utterance.lang = language;
            }
            utterance.pitch = 1; // Range 0-2, default is 1.
            utterance.rate = 1;  // Range 0.1-10, default is 1.
            // --- End of Improvements ---

            if (isConversationMode) {
                utterance.onend = () => {
                    // Slight delay before listening to avoid capturing the end of the TTS
                    setTimeout(() => startListening(), 100);
                };
            }
            speechSynthesis.speak(utterance);
        }
    }, [language, isConversationMode, startListening, selectedVoice]);
    
    // Cleanup speechSynthesis on component unmount or mode change
    useEffect(() => {
        return () => {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        }
    }, [isConversationMode]);

    return {
        isListening,
        startListening,
        speak,
    };
};
