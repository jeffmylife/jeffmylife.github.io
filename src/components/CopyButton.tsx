'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={copy}
      className={`transition-all duration-200 px-3 py-1.5 rounded text-xs font-medium hover:scale-105 active:scale-95 ${className}`}
      style={{
        backgroundColor: isCopied ? 'var(--accent-green)' : 'var(--surface)',
        color: isCopied ? 'var(--background)' : 'var(--accent-blue)',
        border: `1px solid ${isCopied ? 'var(--accent-green)' : 'var(--accent-blue)'}`,
        boxShadow: isCopied ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
      }}
      title={isCopied ? 'Code copied to clipboard!' : 'Copy code to clipboard'}
    >
      {isCopied ? '✓ Copied!' : '📋 Copy'}
    </button>
  );
}