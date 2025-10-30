"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import App from './App';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const floatButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        floatButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // when opened, move focus to close button for accessibility
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        ref={floatButtonRef}
        className=" z-[1000] flex items-center justify-center rounded-full w-16 h-16 bg-gradient-to-br from-brand to-teal-700 text-white shadow-xl hover:scale-110 transition-transform duration-200 border-4 border-white/80 focus:outline-none focus:ring-4 focus:ring-brand/40 cursor-pointer"
        aria-label={open ? 'Cerrar chatbot' : 'Abrir chatbot'}
        style={{ boxShadow: '0 6px 32px 0 rgba(13,148,136,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
      >
        <span className="text-3xl">💬</span>
      </button>

      {/* Widget flotante */}
      {open && (
        <div
          className="z-[1000] w-[380px] max-w-[98vw] rounded-3xl flex flex-col overflow-hidden animate-fade-in-up chatbot-gradient-bg chatbot-shadow chatbot-border absolute"
          style={{
            // keep the widget from overflowing the viewport: use the smaller of 600px or the available viewport height minus header/footer space
            height: 'min(600px, calc(100vh - 96px))',
            maxHeight: 'calc(100vh - 96px)',
            // ensure it sits above the floating button and device safe areas
            bottom: '100px',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          {/* Close button moderno */}
          <button
            ref={closeButtonRef}
            onClick={() => {
              setOpen(false);
              // return focus to floating button after close
              setTimeout(() => floatButtonRef.current?.focus(), 0);
            }}
            aria-label="Cerrar chat"
            title="Cerrar"
            className="z-[1100] w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/8 dark:bg-black/40 backdrop-blur-sm border border-white/10 dark:border-white/6 text-white hover:scale-105 transform transition shadow-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 cursor-pointer"
          >
            <FiX size={18} />
          </button>

          {/* allow the inner app area to scroll if its content exceeds available space */}
          <div className="flex-1 overflow-auto">
            <App />
          </div>
        </div>
      )}

      {/* Animación fade-in-up */}
      <style>{`
        .animate-fade-in-up { animation: fadeInUp 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .chatbot-gradient-bg {
          background: linear-gradient(135deg, #18243a 0%, #22314d 60%, #0d9488 100%) !important;
        }
        @media (prefers-color-scheme: light) {
          .chatbot-gradient-bg {
            background: linear-gradient(135deg, #f8fafc 0%, #e0f2f1 60%, #0d9488 100%) !important;
          }
        }
        .chatbot-shadow {
          box-shadow: 0 12px 48px 0 rgba(13, 148, 136, 0.18), 0 2px 16px 0 rgba(0,0,0,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08) !important;
        }
        .chatbot-border {
          border: 1.5px solid rgba(255,255,255,0.22) !important;
          box-shadow: 0 0 0 2.5px rgba(13,148,136,0.10) inset !important;
        }
        @media (prefers-color-scheme: dark) {
          .chatbot-border {
            border: 1.5px solid rgba(255,255,255,0.10) !important;
            box-shadow: 0 0 0 2.5px rgba(13,148,136,0.13) inset !important;
          }
        }
        /* Forzar prioridad sobre Tailwind y dark: */
        .chatbot-gradient-bg, .chatbot-gradient-bg * {
          background-blend-mode: normal !important;
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;
