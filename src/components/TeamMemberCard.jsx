'use client';
import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Card from '@/ui/Card';



function TeamMemberCard({
  id,
  avatar,
  name,
  role,
  description,
  links,
  mode = 'dark',
  className = '',
}) {
  const isDark = mode === 'dark';

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = 'text-white';
  const borderColor = isDark ? 'border-[#025159]' : 'border-[#86A869]';
  const highlightColor = '#fff';
  const techBg = isDark ? 'bg-[#B6D3DC] text-[#02414a]'  : 'bg-[#d8e2c3] text-[#4b5734]' ;
  const buttonBg = isDark ? 'bg-[#025159] hover:bg-[#013f49]' : 'bg-[#86A869] hover:bg-[#7a975c]' ;
  const iconColor = isDark ? 'text-white hover:text-[#86A869]' : 'text-black hover:text-[#86A869]' ;
  const subtitleOpacity = 'text-white opacity-90';
  const descriptionOpacity = 'text-gray-200 opacity-95';

  return (
    <div
      className={`w-full sm:max-w-sm font-['Roboto'] transition-all h-full flex flex-col ${className} px-2`}
    >
      <Card className={`${bgColor} border-[10px] ${borderColor} ${textColor} h-full flex flex-col`}>
        <div className="flex flex-col items-center text-center h-full justify-between">
          <div className="flex flex-col items-center text-center flex-grow">
            <div
              className={`w-28 h-28 rounded-full border-[4px] ${borderColor} ${bgColor} p-1 mb-4 sm:mb-6 overflow-hidden`}
            >
              <img
                src={avatar}
                alt={`${name} avatar`}
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
            <h3
              className="text-lg sm:text-xl font-bold text-white break-words max-w-[90vw] sm:max-w-xs drop-shadow-lg mb-1"
              style={{ wordBreak: 'break-word', letterSpacing: '-0.01em' }}
            >
              {name}
            </h3>
            <h4
              className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight break-words max-w-[90vw] sm:max-w-xs drop-shadow-lg uppercase tracking-wide"
              style={{
                color: '#86A869',
                wordBreak: 'break-word',
                letterSpacing: '0.02em',
                textShadow: '0 2px 12px #01454F88',
                borderBottom: '2px solid #3383b7',
                paddingBottom: '4px',
              }}
            >
              {role}
            </h4>
            <p
              className={`text-sm sm:text-base text-gray-200 opacity-95 mb-4 sm:mb-6 max-w-[90vw] sm:max-w-xs flex-1 flex items-center justify-center break-words`}
              style={{ wordBreak: 'break-word', fontWeight: 400, lineHeight: '1.5' }}
            >
              {description}
            </p>
          </div>

          <div className="flex flex-col items-center mt-auto">
            <div className="flex gap-4 mb-4 sm:mb-6 text-lg sm:text-xl">
              {links?.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub className={iconColor} />
                </a>
              )}
              {links?.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin className={iconColor} />
                </a>
              )}
              {links?.instagram && (
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram className={iconColor} />
                </a>
              )}
            </div>

            {/* {links?.portfolio ? (
              <a
                  href={links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-cyan-900 hover:bg-cyan-950 text-white font-bold py-2 px-4 sm:px-6 rounded-full text-xs sm:text-sm transition cursor-pointer flex items-center justify-center`}
                  aria-label="Portfolio"
                  style={{ background: '#025159', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', textDecoration: 'none', boxSizing: 'border-box' }}
                >
                  VIEW PROFILE
                </a>
              ) : (
                <button
                  type="button"
                  className="hidden"
                  tabIndex={-1}
                  aria-disabled="true"
                  style={{ display: 'none' }}
                >
                  VIEW PROFILE
                </button>
              )} */}
            </div>
          </div>
        </Card>
    </div>
  );
}
export default TeamMemberCard;