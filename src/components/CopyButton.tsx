'use client';

import { useState, useEffect } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copy = async () => {
    if (!mounted) return;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded animate-pulse" style={{backgroundColor: 'var(--surface)'}} />
    );
  }

  return (
    <button
      onClick={copy}
      className={`transition-all duration-200 w-8 h-8 flex items-center justify-center rounded hover:scale-110 active:scale-95 ${className}`}
      style={{
        backgroundColor: isCopied ? 'var(--accent-green)' : 'var(--surface)',
        color: isCopied ? 'var(--background)' : 'var(--text-muted)',
        border: `1px solid ${isCopied ? 'var(--accent-green)' : 'var(--border)'}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      title={isCopied ? 'Code copied to clipboard!' : 'Copy code to clipboard'}
    >
      {isCopied ? '✓' : '📋'}
    </button>
  );
}