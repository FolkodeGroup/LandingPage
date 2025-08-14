"use client";

import React, { useState } from 'react';
import { User, MeetingDetails, Language, ContactMethod } from '../types';
import { contactOptions } from '../constants/contactOptions';
import { locales } from '../i18n/locales';


interface MeetingSchedulerProps {
    user: User;
    onConfirm: (details: MeetingDetails) => void;
    locales: typeof locales;
    language: Language;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ user, onConfirm, locales, language }) => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>(user.contactMethod);
  const [contactInfo, setContactInfo] = useState<string>(user.contactInfo);
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [error, setError] = useState('');

  const timeSlots = [
    { id: 'morning', label: locales.schedulerTimeSlotMorning[language] },
    { id: 'afternoon', label: locales.schedulerTimeSlotAfternoon[language] },
  ];

  const handleConfirm = () => {
    if (!contactInfo.trim()) {
        setError(locales.formErrorContactInfoMissing[language]);
        return;
    }
    if (contactMethod === 'email' && !/\S+@\S+\.\S+/.test(contactInfo)) {
        setError(locales.formErrorInvalidEmail[language]);
  // Removed unused variable selectedOption
    }
    if (!timeSlot) {
        setError(locales.formErrorTimeSlotMissing[language]);
        return;
    }
    setError('');
    onConfirm({
      contactMethod,
      contactInfo,
      timeSlot,
    });
  };
  
  return (
    <div className="px-4 py-3 rounded-2xl max-w-md md:max-w-lg lg:max-w-xl break-words shadow-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
        <div className="p-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{locales.schedulerTitle[language]}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{locales.schedulerSubtitle[language]}</p>

            <div className="space-y-4">
                {/* Contact Method Selection */}
                <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">{locales.formContactPrompt[language]}</label>
                    <div className="flex flex-wrap gap-2">
                        {contactOptions.map(option => (
                        <button
                            key={option.id}
                            type="button"
                            style={{ '--brand-color': option.hexColor } as React.CSSProperties}
                            onClick={() => { setContactMethod(option.id); setContactInfo(option.id === user.contactMethod ? user.contactInfo : ''); setError(''); }}
                            aria-label={`Select ${option.name}`}
                            className={`group flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 focus:outline-none w-14 h-14
                                ${contactMethod === option.id ? 'grayscale-0 border-[var(--brand-color)] scale-105' : 'grayscale bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 hover:grayscale-0 hover:border-[var(--brand-color)]'}`}
                        >
                            <div className={`transition-colors duration-300 ${contactMethod === option.id ? 'text-[var(--brand-color)]' : 'text-gray-400 group-hover:text-[var(--brand-color)]'}`}>
                                <i className={`${option.icon} text-2xl`}></i>
                            </div>
                        </button>
                        ))}
                    </div>
                </div>

                {/* Contact Info Input */}
                <div>
                     <input
                        type={contactMethod === 'email' ? 'email' : (contactMethod === 'phone' || contactMethod === 'whatsapp' ? 'tel' : 'text')}
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder={locales[`formPlaceholder${contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)}`]?.[language]}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Time Slot Selection */}
                <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">{locales.schedulerTimePrompt[language]}</label>
                    <div className="flex gap-2">
                        {timeSlots.map(slot => (
                            <button 
                                key={slot.id}
                                onClick={() => setTimeSlot(slot.label)}
                                className={`flex-1 px-3 py-2 rounded-lg border-2 transition-colors ${timeSlot === slot.label ? 'bg-brand text-white border-brand-dark' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-brand'}`}
                            >
                                {slot.label}
                            </button>
                        ))}
                    </div>
                </div>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Confirmation Button */}
                <button
                    onClick={handleConfirm}
                    disabled={!contactInfo || !timeSlot}
                    className="w-full px-4 py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 dark:focus:ring-offset-gray-700 focus:ring-brand transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {locales.schedulerButtonConfirm[language]}
                </button>
            </div>
        </div>
    </div>
  );
};

export default MeetingScheduler;