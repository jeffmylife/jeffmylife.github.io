'use client';

import { useState } from 'react';

interface HeaderWithAnchorProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function HeaderWithAnchor({ level, children, id, className = '' }: HeaderWithAnchorProps) {
  const [showAnchor, setShowAnchor] = useState(false);
  
  const baseClasses = 'group relative font-bold transition-colors';
  
  const sizeClasses = {
    1: 'text-4xl mt-12 mb-6',
    2: 'text-3xl mt-10 mb-5', 
    3: 'text-2xl mt-8 mb-4',
    4: 'text-xl mt-6 mb-3',
    5: 'text-lg mt-5 mb-2',
    6: 'text-base mt-4 mb-2'
  };

  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const finalClassName = `${baseClasses} ${sizeClasses[level]} ${className}`.trim();

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setShowAnchor(true);
    setTimeout(() => setShowAnchor(false), 2000);
  };

  return (
    <Tag id={id} className={finalClassName} style={{color: 'var(--foreground)'}}>
      <a href={`#${id}`} className="no-underline" style={{color: 'inherit'}}>
        {children}
      </a>
      <button
        onClick={handleCopyLink}
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-lg"
        style={{color: 'var(--accent-blue)'}}
        aria-label="Copy link to section"
        title="Copy link"
      >
        {showAnchor ? '✓' : '#'}
      </button>
    </Tag>
  );
}