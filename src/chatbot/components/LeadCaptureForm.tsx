"use client";

import React, { useState } from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaTelegram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { ContactMethod } from '../types';
import { contactOptions } from '../constants/contactOptions';


interface LeadCaptureFormProps {
  onStartChat: (details: { name: string; contactMethod: ContactMethod; contactInfo: string }) => void;
  isLoading: boolean;
  title: string;
  subtitle: string;
  namePlaceholder: string;
  contactPrompt: string;
  contactPlaceholders: { [key in ContactMethod]: string };
  buttonText: string;
  connectingText: string;
  changeButtonText: string;
  errorMessages: { [key: string]: string };
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  onStartChat, isLoading, title, subtitle, namePlaceholder, contactPrompt, contactPlaceholders, buttonText, connectingText, changeButtonText, errorMessages
}) => {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod | null>(null);
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(errorMessages.errorNameMissing);
      return;
    }
    if (!contactMethod) {
      setError(errorMessages.errorContactMethodMissing);
      return;
    }
    if (!contactInfo.trim()) {
      setError(errorMessages.errorContactInfoMissing);
      return;
    }
    if (contactMethod === 'email' && !/\S+@\S+\.\S+/.test(contactInfo)) {
      setError(errorMessages.errorInvalidEmail);
      return;
    }
    setError('');
    onStartChat({ name, contactMethod, contactInfo });
  };
  
  const selectedOption = contactMethod && contactOptions.find(o => o.id === contactMethod);

  return (
  <div className="flex flex-col items-center justify-center h-full min-h-0 p-2 sm:p-4 text-center bg-transparent" style={{background: 'transparent', width: '100%', height: '100%', minHeight: 0, minWidth: 0}}>
      <div className="w-full max-w-md" style={{maxWidth: '100vw', minWidth: 0}}>
        <h2
          className="font-bold mb-1 text-gray-900 dark:text-gray-100"
          style={{
            fontSize: 'clamp(0.95rem, 3.2vw, 1.15rem)',
            lineHeight: 1.05,
            wordBreak: 'break-word',
            maxWidth: '100%',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
            hyphens: 'auto',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4" style={{fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', maxWidth: '100%', wordBreak: 'break-word', textAlign: 'center'}}>{subtitle}</p>
  <form onSubmit={handleSubmit} className="w-full space-y-3" style={{maxWidth: '100%', minWidth: 0}}>
          <div>
            <label htmlFor="name" className="sr-only">{namePlaceholder}</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={namePlaceholder}
              aria-label={namePlaceholder}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition"
              style={{maxWidth: '100%', minWidth: 0, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'}} 
              disabled={isLoading}
            />
          </div>
          
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-left mb-3">{contactPrompt}</p>
            <div className="flex flex-wrap justify-center gap-2 min-h-[60px] items-center w-full" style={{maxWidth: '100%', minWidth: 0}}>
              {selectedOption ? (
                    <div className="flex items-center gap-4 animate-fade-in w-full justify-center">
                      <div
                        style={{ '--brand-color': selectedOption.hexColor, minWidth: 0, maxWidth: '100%' } as React.CSSProperties}
                        className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-[var(--brand-color)] bg-gray-100 dark:bg-gray-700 w-16 h-16 transform scale-105"
                      >
                        {/* Render selected option using react-icons instead of icon class */}
                        {(() => {
                          type IconType = React.ComponentType<{
                            size?: number | string;
                            style?: React.CSSProperties;
                            'aria-hidden'?: boolean;
                          }>;
                          let IconComponent: IconType = FaEnvelope;
                          switch (selectedOption.id) {
                            case 'whatsapp': IconComponent = FaWhatsapp; break;
                            case 'facebook': IconComponent = FaFacebook; break;
                            case 'instagram': IconComponent = FaInstagram; break;
                            case 'linkedin': IconComponent = FaLinkedin; break;
                            case 'telegram': IconComponent = FaTelegram; break;
                            case 'phone': IconComponent = FaPhone; break;
                            case 'email':
                            default:
                              IconComponent = FaEnvelope; break;
                          }
                          return <IconComponent size={32} style={{ color: 'var(--brand-color)' }} aria-hidden />;
                        })()}
                      </div>
                      <button
                        type="button"
                        onClick={() => { setContactMethod(null); setContactInfo(''); }}
                        className="text-brand hover:underline font-medium cursor-pointer"
                        aria-label="Change contact method"
                        disabled={isLoading}
                      >
                        {changeButtonText}
                      </button>
                    </div>
                  ) : (
                contactOptions.map(option => {
                  let IconComponent = null;
                  switch(option.id) {
                    case 'whatsapp': IconComponent = FaWhatsapp; break;
                    case 'facebook': IconComponent = FaFacebook; break;
                    case 'instagram': IconComponent = FaInstagram; break;
                    case 'linkedin': IconComponent = FaLinkedin; break;
                    case 'telegram': IconComponent = FaTelegram; break;
                    case 'email': IconComponent = FaEnvelope; break;
                    default: IconComponent = FaEnvelope;
                  }
                  return (
                    <button
                      key={option.id}
                      type="button"
                      style={{ '--brand-color': option.hexColor, minWidth: 0, maxWidth: '100%' } as React.CSSProperties}
                      onClick={() => { setContactMethod(option.id); setContactInfo(''); setError(''); }}
                      aria-label={`Select ${option.name} as contact method`}
                      disabled={isLoading}
                      className="group flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg border-2 border-[var(--brand-color)] bg-white dark:bg-gray-800 shadow-md transition-all duration-300 focus:outline-none w-14 h-14 sm:w-16 sm:h-16 grayscale hover:grayscale-0 hover:border-[var(--brand-color)] transform hover:scale-105 cursor-pointer"
                    >
                      <div className="transition-colors duration-300 flex flex-col items-center justify-center w-full h-full group-hover:text-[var(--brand-color)]" style={{color: 'var(--brand-color)'}}>
                        {IconComponent && <IconComponent size={28} />}
                        <span className="text-xs mt-1 font-semibold text-[var(--brand-color)]" style={{fontSize:'0.65rem'}}>{option.name}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {contactMethod && (
            <div className="animate-fade-in w-full flex flex-col items-center" style={{maxWidth: '100%', minWidth: 0}}>
              <label htmlFor="contactInfo" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 text-left w-full max-w-md">
                {contactPlaceholders[contactMethod]}
              </label>
              <input
                id="contactInfo"
                type={contactMethod === 'email' ? 'email' : (contactMethod === 'phone' || contactMethod === 'whatsapp' ? 'tel' : 'text')}
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={contactPlaceholders[contactMethod]}
                aria-label={contactPlaceholders[contactMethod]}
                className="w-full max-w-md px-3 py-2 bg-white dark:bg-gray-800 border border-[var(--brand-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 transition"
                style={{maxWidth: '100%', minWidth: 0, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'}} 
                disabled={isLoading}
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-3 py-2 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-brand transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center cursor-pointer"
            style={{maxWidth: '100%', minWidth: 0, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'}} 
            disabled={isLoading || !name || !contactMethod || !contactInfo}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {connectingText}
              </>
            ) : buttonText}
          </button>
        </form>
      </div>
       <style>{`
        .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
    </div>
  );
};

export default LeadCaptureForm;