import React from 'react';

const Card = ({ children, className = '', ...props }) => (
  <div
    className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-white/20 ${className}`}
    style={{
      boxShadow: '0 8px 32px 0 rgba(2,81,89,0.16)',
      border: '2px solid rgba(134,168,105,0.18)',
      background:
        'linear-gradient(135deg, rgba(1,69,79,0.60) 0%, rgba(2,81,89,0.60) 60%, rgba(134,168,105,0.25) 100%)',
    }}
    {...props}
  >
    {children}
  </div>
);

export default Card;