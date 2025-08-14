
import { User, Message, SummaryReport, MeetingDetails } from '../types';

// ====================================================================================
// BACKEND CONNECTION
// ====================================================================================
// This app uses FormSubmit.co to send lead and chat reports directly to your email.
// It's a simple, free service that requires no backend setup.
//
// HOW IT WORKS:
// 1. The URL below is set to your desired email address.
// 2. The first time a report is sent, FormSubmit will send a confirmation link
//    to that email. You must click it to activate the connection.
// 3. After activation, all future reports will arrive in your inbox.
//
// For advanced integrations (like sending to Discord, Slack, or a CRM),
// please see the advanced guide in `INTEGRATION_GUIDE.md`.
// ====================================================================================
const WEBHOOK_URL = 'https://formsubmit.co/contactofolkode@gmail.com';

/**
 * A backend service that sends data to an email webhook.
 */
export const backendService = {
  /**
   * Saves a new lead (user) by sending it to the email webhook.
   * FormSubmit requires simple key-value pairs, so we'll format the data.
   */
  saveLead: async (user: User): Promise<void> => {
    console.log('SENDING LEAD TO WEBHOOK:', user);
    
    const formData = {
        _subject: `Nuevo Lead Capturado: ${user.name}`,
        type: 'LEAD_CAPTURE',
        name: user.name,
        contactMethod: user.contactMethod,
        contactInfo: user.contactInfo,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Failed to save lead via webhook:', error);
    }
  },

  /**
   * Sends a complete report with user data, chat summary, and full transcript
   * to the email webhook at the end of the conversation.
   */
  sendFullChatReport: async (user: User, messages: Message[], summaryReport: SummaryReport, meetingDetails?: MeetingDetails): Promise<void> => {
    const contactIdentifier = `${user.contactMethod}: ${user.contactInfo}`;
    console.log('SENDING FULL CHAT REPORT TO WEBHOOK for:', contactIdentifier);

    const cleanTranscript = messages.map(msg => {
      const timestamp = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let content = msg.text || (msg.component ? `[${msg.component}]` : '');
      return `[${timestamp}] ${msg.sender === 'bot' ? 'FolKode' : user.name}: ${content}`;
    }).join('\n');

    const formData = {
        _subject: `Reporte de Chat con ${user.name} - Temperatura: ${summaryReport.temperature}`,
        _template: "box", // A nice template from FormSubmit
        user: `${user.name} (${user.contactMethod}: ${user.contactInfo})`,
        summary: summaryReport.summary,
        tags: summaryReport.tags.join(', '),
        temperature: summaryReport.temperature,
        leadScore: summaryReport.leadScore,
        painPoint: summaryReport.painPoint,
        budgetMention: summaryReport.budgetMention || 'N/A',
        timelineMention: summaryReport.timelineMention || 'N/A',
        meeting_request: meetingDetails ? `${meetingDetails.timeSlot} via ${meetingDetails.contactInfo}` : 'No agendada',
        transcript: cleanTranscript,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Failed to send chat report via webhook:', error);
    }
  },
};
