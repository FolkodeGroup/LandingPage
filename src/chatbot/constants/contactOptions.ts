
import { ContactMethod } from '../types';

export const contactOptions: { id: ContactMethod; name: string; icon: string; hexColor: string }[] = [
    { id: 'email', name: 'Email', icon: 'bi bi-envelope-fill', hexColor: '#EA4335' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'bi bi-whatsapp', hexColor: '#25D366' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'bi bi-linkedin', hexColor: '#0A66C2' },
    { id: 'instagram', name: 'Instagram', icon: 'bi bi-instagram', hexColor: '#E1306C' },
    { id: 'facebook', name: 'Facebook', icon: 'bi bi-facebook', hexColor: '#1877F2' },
    { id: 'telegram', name: 'Telegram', icon: 'bi bi-telegram', hexColor: '#0088CC' },
    { id: 'phone', name: 'Phone', icon: 'bi bi-telephone-fill', hexColor: '#3B82F6' },
];