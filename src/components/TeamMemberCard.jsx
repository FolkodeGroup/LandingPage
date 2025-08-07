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
    <div className="max-w-sm w-full font-['Roboto'] transition-all">
      <Card className={`${bgColor} border-[10px] ${borderColor} ${textColor}`}>
        <div className="flex flex-col items-center text-center">
          <div className={`rounded-full ${borderColor} ${bgColor} card-member`}>
            <img
              src={avatar}
              alt={`${name} avatar`}
              className="rounded-full avatar-member"
            />
          </div>

          <h3 className={`${textColor} name-member`}>{name}</h3>


          <h4 className="text-3xl mb-2 rol-member" style={{ color: highlightColor }}>
            {role}
          </h4>

          <p className={`text-2sm ${descriptionOpacity} max-w-xs text-member`}>{description}</p>



          <div className="gap-4 icon-member">
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
            className={`${buttonBg} rounded-full text-sm transition button-member`}
          >
            VIEW PROFILE
          </button>
        </div>
      </Card>
    </div>
  );
}
export default TeamMemberCard;