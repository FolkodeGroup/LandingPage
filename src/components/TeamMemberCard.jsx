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
  const textColor = isDark ? 'text-black' : 'text-black';
  const borderColor = isDark ? 'border-[#025159]' : 'border-[#86A869]';
  const highlightColor = isDark ? '#025159' : '#86A869';
  const techBg = isDark ? 'bg-[#B6D3DC] text-[#02414a]'  : 'bg-[#d8e2c3] text-[#4b5734]' ;
  const buttonBg = isDark ? 'bg-[#025159] hover:bg-[#013f49]' : 'bg-[#86A869] hover:bg-[#7a975c]' ;
  const iconColor = isDark ? 'text-black hover:text-[#025159]' : 'text-black hover:text-[#86A869]' ;
  const subtitleOpacity = isDark ? 'text-black opacity-70'  : 'text-black opacity-80' ;
  const descriptionOpacity = isDark ? 'text-black opacity-80' : 'text-black opacity-90' ;

  return (
    <div
      className={`max-w-sm w-full font-['Roboto'] transition-all h-full flex flex-col ${className} px-2`}
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
              className={`text-lg sm:text-2xl font-bold ${textColor} break-words max-w-[90vw] sm:max-w-xs`}
              style={{ wordBreak: 'break-word' }}
            >
              {name}
            </h3>

            <h4
              className="text-xl sm:text-4xl font-extrabold mb-1 sm:mb-2 leading-tight sm:leading-tight break-words max-w-[90vw] sm:max-w-xs"
              style={{ color: highlightColor, wordBreak: 'break-word' }}
            >
              {role}
            </h4>

            <p
              className={`text-xs sm:text-sm ${descriptionOpacity} mb-4 sm:mb-6 max-w-[90vw] sm:max-w-xs flex-1 flex items-center justify-center break-words`}
              style={{ wordBreak: 'break-word' }}
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

            <button
              className={`${buttonBg} text-white font-bold py-2 px-4 sm:px-6 rounded-full text-xs sm:text-sm transition pointer`}
            >
              VIEW PROFILE
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default TeamMemberCard;