export type Language = 'en' | 'es' | 'pt';
export type Theme = 'light' | 'dark';

export type ContactMethod = 'email' | 'whatsapp' | 'linkedin' | 'instagram' | 'facebook' | 'telegram' | 'phone';

export type ComponentType = 'MeetingScheduler';

export interface User {
  name: string;
  contactMethod: ContactMethod;
  contactInfo: string;
}

export interface ProjectScope {
  projectType: string;
  audience: string;
  features: string[];
  extraDetails: string;
}

export interface SummaryReport {
  summary: string;
  tags: string[];
  temperature: 'Hot' | 'Warm' | 'Cold';
  leadScore?: number;
  painPoint?: string;
  budgetMention?: string;
  timelineMention?: string;
}

export interface MeetingDetails {
    contactMethod: ContactMethod;
    contactInfo: string;
    timeSlot: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  file?: {
    name: string;
    dataUrl: string; // base64 encoded data URL for images, empty for documents
    mimeType: string;
  };
  feedback?: 'like' | 'dislike' | null;
  summaryReport?: SummaryReport;
  component?: ComponentType;
}

export interface AnalyticsData {
    totalChats: number;
    feedback: {
        likes: number;
        dislikes: number;
    };
    suggestions: {
        [suggestion: string]: number;
    };
    chatDurations: number[]; // in milliseconds
    totalConversions: number;
    topicTags: {
        [tag: string]: number;
    };
}


// --- Web Speech API Types for TypeScript ---
// This extends the global Window interface and adds necessary types for SpeechRecognition API
// which are not yet part of the standard TypeScript library for all browsers.

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

export interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

export interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: { new (): SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition };
    pdfjsLib: any;
  }
}
