
import { CREATIVE_DIRECTOR_PROMPT, TECH_LEAD_PROMPT } from '../constants';

const DESIGN_KEYWORDS = ['design', 'ui', 'ux', 'look', 'feel', 'aesthetic', 'visual', 'diseño', 'interfaz', 'apariencia', 'visual'];
const TECH_KEYWORDS = ['backend', 'database', 'api', 'server', 'cloud', 'architecture', 'scalability', 'infraestructura', 'base de datos', 'escalabilidad'];

export const personalityService = {
  /**
   * Analyzes the user's message and returns a personality prefix for the prompt.
   * @param messageText The text of the user's message.
   * @returns A string to be prepended to the AI prompt.
   */
  getPersonalityPrefix: (messageText: string): string => {
    const lowerCaseText = messageText.toLowerCase();

    if (DESIGN_KEYWORDS.some(keyword => lowerCaseText.includes(keyword))) {
      return CREATIVE_DIRECTOR_PROMPT;
    }

    if (TECH_KEYWORDS.some(keyword => lowerCaseText.includes(keyword))) {
      return TECH_LEAD_PROMPT;
    }

    return ''; // No personality shift needed
  }
};
