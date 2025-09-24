import React from 'react';

interface IconProps {
  className?: string;
}

export const TargetIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

export const MarketIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

export const CompetitionIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22V2L6 8" />
    <path d="M18 8l-6-6" />
    <path d="M2 12h10" />
  </svg>
);

export const PotentialIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3.85 8.62 1.42-1.42a2 2 0 0 1 2.82 0l1.41 1.41a2 2 0 0 1 0 2.82l-1.42 1.42a2 2 0 0 1-2.82 0z" />
    <path d="m12 12 6 6" />
    <path d="m12 6 6-6" />
    <path d="m6 18-6 6" />
    <path d="M12.01 11.99 12 12" />
  </svg>
);

export const SocialIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7c0-2.2-1.8-4-4-4S10 4.8 10 7c0 2 .3 3.2 1.5 4.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7v0A2.5 2.5 0 0 1 7 9.5v0A2.5 2.5 0 0 1 4.5 12v0A2.5 2.5 0 0 1 7 14.5v0A2.5 2.5 0 0 1 9.5 17v0A2.5 2.5 0 0 1 12 19.5v0A2.5 2.5 0 0 1 14.5 17v0A2.5 2.5 0 0 1 17 14.5v0A2.5 2.5 0 0 1 19.5 12v0A2.5 2.5 0 0 1 17 9.5v0A2.5 2.5 0 0 1 14.5 7v0A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M12 12a2.5 2.5 0 0 0-2.5 2.5v0A2.5 2.5 0 0 0 12 17v0a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 12 12z" />
    <path d="M12 4.5a2.5 2.5 0 0 0-2.5-2.5" />
    <path d="M14.5 7A2.5 2.5 0 0 0 12 4.5" />
    <path d="M17 9.5A2.5 2.5 0 0 0 14.5 7" />
    <path d="M19.5 12A2.5 2.5 0 0 0 17 9.5" />
    <path d="M17 14.5a2.5 2.5 0 0 0 2.5-2.5" />
    <path d="M14.5 17a2.5 2.5 0 0 0 2.5-2.5" />
    <path d="M12 19.5a2.5 2.5 0 0 0 2.5-2.5" />
    <path d="M9.5 17A2.5 2.5 0 0 0 12 19.5" />
    <path d="M7 14.5A2.5 2.5 0 0 0 9.5 17" />
    <path d="M4.5 12A2.5 2.5 0 0 0 7 14.5" />
    <path d="M7 9.5A2.5 2.5 0 0 0 4.5 12" />
    <path d="M9.5 7A2.5 2.5 0 0 0 7 9.5" />
  </svg>
);