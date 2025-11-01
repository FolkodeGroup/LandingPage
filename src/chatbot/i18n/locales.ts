import { Language } from '../types';

export type WizardProjectType = {
  id: string;
  label: string;
  icon: string;
};
export type Locales = typeof locales & {
  wizardProjectTypes: Record<Language, WizardProjectType[]>;
  wizardFeatures: Record<Language, Record<string, string[]>>;
  wizardStep1Title: Record<Language, string>;
  wizardStep2Title: Record<Language, string>;
  wizardStep2Placeholder: Record<Language, string>;
  wizardStep3Title: Record<Language, string>;
  wizardStep4Title: Record<Language, string>;
  wizardStep4Placeholder: Record<Language, string>;
  wizardTitle: Record<Language, string>;
  wizardBack: Record<Language, string>;
  wizardNext: Record<Language, string>;
  wizardFinish: Record<Language, string>;
};
// ...existing code...
export const locales = {
  // App Header
  headerTitle: {
    en: 'Folkode',
    es: 'Folkode',
    pt: 'Folkode',
  },
  headerSubtitle: {
    en: 'Powered by Gemini',
    es: 'Potenciado por Gemini',
    pt: 'Desenvolvido com Gemini',
  },
  botName: {
    en: 'Petrolito',
    es: 'Petrolito',
    pt: 'Petrolito',
  },
  conversationModeTooltip: {
    en: 'Toggle Conversation Mode',
    es: 'Activar Modo Conversación',
    pt: 'Alternar Modo de Conversa',
  },

  // Lead Capture Form
  formTitle: {
    en: "Let's get started",
    es: 'Comencemos',
    pt: 'Vamos começar',
  },
  formSubtitle: {
    en: 'First, please tell us your name and the best way to contact you.',
    es: 'Primero, por favor dinos tu nombre y la mejor forma de contactarte.',
    pt: 'Primeiro, diga-nos o seu nome e a melhor forma de o contatar.',
  },
  formNamePlaceholder: {
    en: 'Your name',
    es: 'Tu nombre',
    pt: 'Seu nome',
  },
  formContactPrompt: {
    en: 'Choose your preferred contact method:',
    es: 'Elige tu método de contacto preferido:',
    pt: 'Escolha seu método de contato preferido:',
  },
  formChangeButtonText: {
    en: 'Change',
    es: 'Cambiar',
    pt: 'Mudar',
  },
  formButtonText: {
    en: 'Start Chat',
    es: 'Iniciar chat',
    pt: 'Iniciar Bate-papo',
  },
  formConnectingText: {
    en: 'Connecting...',
    es: 'Conectando...',
    pt: 'Conectando...',
  },
  formPlaceholderEmail: {
    en: 'your.email@example.com',
    es: 'tu.email@ejemplo.com',
    pt: 'seu.email@exemplo.com',
  },
  formPlaceholderWhatsapp: {
    en: 'Your WhatsApp number',
    es: 'Tu número de WhatsApp',
    pt: 'Seu número de WhatsApp',
  },
  formPlaceholderLinkedin: {
    en: 'Your LinkedIn profile URL',
    es: 'URL de tu perfil de LinkedIn',
    pt: 'URL do seu perfil do LinkedIn',
  },
  formPlaceholderInstagram: {
    en: 'Your Instagram @username',
    es: 'Tu @usuario de Instagram',
    pt: 'Seu @usuario do Instagram',
  },
  formPlaceholderFacebook: {
    en: 'Your Facebook profile name',
    es: 'Tu nombre de perfil de Facebook',
    pt: 'Seu nome de perfil do Facebook',
  },
  formPlaceholderTelegram: {
    en: 'Your Telegram @username',
    es: 'Tu @usuario de Telegram',
    pt: 'Seu @usuario do Telegram',
  },
  formPlaceholderPhone: {
    en: 'Your phone number',
    es: 'Tu número de teléfono',
    pt: 'Seu número de telefone',
  },

  // Chat Interface
  chatInputPlaceholder: {
    en: 'Ask about our services...',
    es: 'Consulta sobre nuestros servicios...',
    pt: 'Pergunte sobre nossos services...',
  },
  fileUploadTooltip: {
    en: 'Attach an image or document (PDF, TXT, MD)',
    es: 'Adjuntar una imagen o documento (PDF, TXT, MD)',
    pt: 'Anexar uma imagem ou documento (PDF, TXT, MD)',
  },
  micTooltipIdle: {
    en: 'Use microphone',
    es: 'Usar micrófono',
    pt: 'Usar microfone',
  },
  micTooltipListening: {
    en: 'Stop listening',
    es: 'Detener escucha',
    pt: 'Parar de escutar',
  },
  copyTooltip: {
    en: 'Copy message',
    es: 'Copiar mensaje',
    pt: 'Copiar mensagem',
  },
  themeToggleTooltip: {
    en: 'Toggle theme',
    es: 'Cambiar tema',
    pt: 'Alternar tema',
  },
  exportChatTooltip: {
    en: 'Export chat',
    es: 'Exportar chat',
    pt: 'Exportar bate-papo',
  },
  analyticsTooltip: {
    en: 'Show analytics',
    es: 'Mostrar analíticas',
    pt: 'Mostrar análises',
  },
  feedbackTooltipLike: {
    en: 'Like response',
    es: 'Me gusta la respuesta',
    pt: 'Gostei da resposta',
  },
  feedbackTooltipDislike: {
    en: 'Dislike response',
    es: 'No me gusta la respuesta',
    pt: 'Não gostei da resposta',
  },
  chatEndButton: {
    en: 'End Chat',
    es: 'Finalizar chat',
    pt: 'Encerrar Chat',
  },
  chatEndConfirmation: {
    en: 'Are you sure you want to end the chat? A summary will be generated and sent to our team.',
    es: '¿Deseas finalizar el chat? Se generará un resumen para nuestro equipo.',
    pt: 'Tem certeza que deseja encerrar o chat? Um resumo será gerado e enviado para nossa equipe.',
  },
  chatSummaryGenerating: {
    en: 'Generating summary...',
    es: 'Generando resumen...',
    pt: 'Gerando resumo...',
  },
  chatSummaryTitle: {
    en: 'Conversation Summary',
    es: 'Resumen de la conversación',
    pt: 'Resumo da Conversa',
  },
  leadTemperatureLabel: {
    en: 'Lead Temperature',
    es: 'Nivel de interés',
    pt: 'Temperatura do Lead',
  },
  leadScoreLabel: {
    en: 'Lead Score',
    es: 'Puntuación',
    pt: 'Pontuação',
  },
  painPointLabel: {
    en: 'Pain Point',
    es: 'Punto de Dolor',
    pt: 'Ponto de Dor',
  },
  tagsLabel: {
    en: 'Tags',
    es: 'Etiquetas',
    pt: 'Tags',
  },
  chatEndedMessage: {
    en: 'This chat has ended. Thank you for your time!',
    es: 'El chat ha finalizado. ¡Gracias por tu tiempo!',
    pt: 'Este bate-papo foi encerrado. Obrigado pelo seu tempo!',
  },
  
  // Goodbye Screen
  goodbyeTitle: {
    en: 'Thank You!',
    es: '¡Gracias!',
    pt: 'Obrigado!',
  },
  goodbyeMessage: {
    en: 'Your conversation has ended. Our team has received a summary and will be in touch shortly.',
    es: 'Tu conversación ha finalizado. Nuestro equipo recibió un resumen y se pondrá en contacto pronto.',
    pt: 'Sua conversa foi encerrada. Nossa equipe recebeu um resumo e entrará em contato em breve.',
  },
  goodbyeBackToConversation: {
    en: 'Back to Conversation',
    es: 'Volver a la Conversación',
    pt: 'Voltar à Conversa',
  },
  goodbyeRestartChat: {
    en: 'Restart Chat',
    es: 'Reiniciar Chat',
    pt: 'Reiniciar Bate-papo',
  },


  // Initial prompts & Proactive
  defineProjectSuggestion: {
    en: 'Help me define my project',
    es: 'Ayúdame a definir mi proyecto',
    pt: 'Ajude-me a definir meu projeto'
  },
  chatWelcomeMessage: {
    en: "Hello {name}! I am Petrolito, your AI assistant from FolKode. How can I help you plan your digital project today?\n\n👉 [What services do you offer?]\n👉 [Help me define my project]\n👉 [Tell me about your process]",
    es: "¡Hola {name}! Soy Petrolito, tu asistente de IA de FolKode. ¿Cómo puedo ayudarte a planificar tu proyecto digital hoy?\n\n👉 [¿Qué servicios ofrecen?]\n👉 [Ayúdame a definir mi proyecto]\n👉 [Cuéntame sobre su proceso]",
    pt: "Olá {name}! Eu sou o Petrolito, seu assistente de IA da FolKode. Como posso ajudá-lo a planejar seu projeto digital hoje?\n\n👉 [Quais serviços vocês oferecem?]\n👉 [Ajude-me a definir meu projeto]\n👉 [Fale-me sobre o seu processo]",
  },
  proactivePrompt: {
    en: "Is there anything else I can help you with?",
    es: "¿Hay algo más en lo que pueda ayudarte?",
    pt: "Posso ajudar em mais alguma coisa?",
  },
  
  // Meeting Scheduler Component
  schedulerTitle: {
    en: 'Schedule a call',
    es: 'Coordinar una llamada',
    pt: 'Agendar uma chamada',
  },
  schedulerSubtitle: {
    en: 'Perfect! To move forward, please confirm the best way and time to contact you.',
    es: '¡Perfecto! Para avanzar, confirma la mejor forma y horario para contactarte.',
    pt: 'Perfeito! Para prosseguir, confirme a melhor forma e horário para entrarmos em contato.',
  },
  schedulerTimePrompt: {
    en: 'When is a good time?',
    es: '¿Cuándo te viene bien?',
    pt: 'Quando é um bom momento?',
  },
  schedulerTimeSlotMorning: {
    en: 'Tomorrow Morning',
    es: 'Mañana por la mañana',
    pt: 'Amanhã de Manhã',
  },
  schedulerTimeSlotAfternoon: {
    en: 'Tomorrow Afternoon',
    es: 'Mañana por la tarde',
    pt: 'Amanhã à Tarde',
  },
  schedulerButtonConfirm: {
    en: 'Confirm and End Chat',
    es: 'Confirmar y Finalizar Chat',
    pt: 'Confirmar e Encerrar Bate-papo',
  },
  schedulerBotConfirmation: {
    en: "Great! I've noted that down. Our team will contact you {timeSlot} via {contactMethod}. Talk soon!",
    es: "¡Genial! Lo he anotado. Nuestro equipo se pondrá en contacto contigo {timeSlot} a través de {contactMethod}. ¡Hablamos pronto!",
    pt: "Ótimo! Anotei aqui. Nossa equipe entrará em contato com você {timeSlot} via {contactMethod}. Até breve!",
  },

  // Analytics Panel
  analyticsPanelTitle: {
    en: 'Conversation Analytics',
    es: 'Análisis de la conversación',
    pt: 'Análises de Conversa',
  },
  analyticsTotalChats: {
    en: 'Total Chats',
    es: 'Total de chats',
    pt: 'Total de Bate-papos',
  },
  analyticsFeedbackScore: {
    en: 'Feedback Score',
    es: 'Valoraciones',
    pt: 'Pontuação de Feedback',
  },
  analyticsTopSuggestions: {
    en: 'Most Popular Suggestions',
    es: 'Sugerencias populares',
    pt: 'Sugestões mais Populares',
  },
  analyticsAvgChatTime: {
    en: 'Avg. Chat Time',
    es: 'Tiempo Med. de Chat',
    pt: 'Tempo Médio de Chat',
  },
  analyticsConversionRate: {
    en: 'Conversion Rate',
    es: 'Tasa de Conversión',
    pt: 'Taxa de Conversão',
  },
  analyticsTopTopics: {
    en: 'Top Topics',
    es: 'Temas Populares',
    pt: 'Tópicos Populares',
  },
  analyticsMetricMinutes: {
    en: 'min',
    es: 'min',
    pt: 'min',
  },
  analyticsMetricSeconds: {
    en: 'sec',
    es: 'seg',
    pt: 'seg',
  },
  analyticsClose: {
    en: 'Close',
    es: 'Cerrar',
    pt: 'Fechar',
  },

  // Error Messages
  chatStartError: {
    en: "Sorry, we couldn't start the chat session. Please refresh and try again.",
    es: 'Lo sentimos, no pudimos iniciar la sesión de chat. Por favor, actualiza la página e inténtalo de nuevo.',
    pt: 'Desculpe, não conseguimos iniciar a sessão de chat. Por favor, atualize a página e tente novamente.',
  },
  geminiConnectionError: {
    en: "I'm sorry, but I'm having trouble connecting to my brain right now. Please try again in a moment.",
    es: 'Lo siento, estoy teniendo problemas de conexión. Por favor, inténtalo de nuevo en un momento.',
    pt: 'Desculpe, mas estou com problemas para me conectar ao meu cérebro agora. Por favor, tente novamente em um momento.',
  },
  voiceNotSupported: {
    en: "Your browser doesn't support voice recognition.",
    es: "Tu navegador no es compatible con el reconocimiento de voz.",
    pt: "Seu navegador não suporta reconhecimento de voz.",
  },
  formErrorNameMissing: {
    en: 'Please enter your name.',
    es: 'Por favor, ingresa tu nombre.',
    pt: 'Por favor, insira seu nome.',
  },
  formErrorContactMethodMissing: {
    en: 'Please select a contact method.',
    es: 'Por favor, selecciona un método de contacto.',
    pt: 'Por favor, selecione um método de contato.',
  },
  formErrorContactInfoMissing: {
    en: 'Please enter your contact information.',
    es: 'Por favor, ingresa tu información de contacto.',
    pt: 'Por favor, insira suas informações de contato.',
  },
  formErrorInvalidEmail: {
    en: 'Please enter a valid email address.',
    es: 'Por favor, ingresa un correo electrónico válido.',
    pt: 'Por favor, insira um e-mail válido.',
  },
  formErrorTimeSlotMissing: {
    en: "Please select a time slot.",
    es: "Por favor, selecciona un horario.",
    pt: "Por favor, selecione um horário."
  },
  // Wizard placeholders (required by the Locales type)
  wizardProjectTypes: {
    en: [{ id: 'web', label: 'Web App', icon: 'bi-window' }],
    es: [{ id: 'web', label: 'Aplicación Web', icon: 'bi-window' }],
    pt: [{ id: 'web', label: 'Aplicativo Web', icon: 'bi-window' }],
  },
  wizardFeatures: {
    en: { web: ['Responsive design', 'SEO', 'Deployment'] },
    es: { web: ['Diseño responsivo', 'SEO', 'Despliegue'] },
    pt: { web: ['Design responsivo', 'SEO', 'Deploy'] },
  },
  wizardStep1Title: { en: 'Project basics', es: 'Datos del proyecto', pt: 'Dados do projeto' },
  wizardStep2Title: { en: 'Select features', es: 'Selecciona características', pt: 'Selecione recursos' },
  wizardStep2Placeholder: { en: 'Choose features', es: 'Elige características', pt: 'Escolha recursos' },
  wizardStep3Title: { en: 'Timeline & Budget', es: 'Tiempo y presupuesto', pt: 'Prazo e orçamento' },
  wizardStep4Title: { en: 'Review & Submit', es: 'Revisar y enviar', pt: 'Revisar e enviar' },
  wizardStep4Placeholder: { en: 'Any additional notes', es: 'Notas adicionales', pt: 'Notas adicionais' },
  wizardTitle: { en: 'Project Scoping', es: 'Definición del proyecto', pt: 'Escopo do projeto' },
  wizardBack: { en: 'Back', es: 'Volver', pt: 'Voltar' },
  wizardNext: { en: 'Next', es: 'Siguiente', pt: 'Próximo' },
  wizardFinish: { en: 'Finish', es: 'Finalizar', pt: 'Concluir' },
};