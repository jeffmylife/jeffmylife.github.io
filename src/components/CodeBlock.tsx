'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ children, className, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const language = className?.replace('language-', '') || 'text';
  const code = String(children).replace(/\n$/, '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="relative group">
      <div 
        className="flex items-center justify-between px-4 py-2 text-sm rounded-t-lg"
        style={{
          backgroundColor: 'var(--surface-variant)',
          color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <span className="font-mono text-xs uppercase tracking-wide">{language}</span>
        <button
          onClick={copyToClipboard}
          className="transition-all duration-200 px-3 py-1.5 rounded text-xs font-medium hover:scale-105 active:scale-95"
          style={{
            backgroundColor: copied ? 'var(--accent-green)' : 'var(--surface)',
            color: copied ? 'var(--background)' : 'var(--accent-blue)',
            border: `1px solid ${copied ? 'var(--accent-green)' : 'var(--accent-blue)'}`,
            boxShadow: copied ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
          }}
          title={copied ? 'Code copied to clipboard!' : 'Copy code to clipboard'}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <div 
        className="rounded-b-lg overflow-x-auto"
        style={{backgroundColor: 'var(--surface)'}}
      >
        <pre className="p-4 text-sm leading-6" style={{color: 'var(--foreground)'}}>
          <code className={className}>
            {showLineNumbers ? (
              <div className="table w-full">
                {lines.map((line, index) => (
                  <div key={index} className="table-row">
                    <span 
                      className="table-cell pr-4 select-none text-right w-8"
                      style={{color: 'var(--text-muted)'}}
                    >
                      {index + 1}
                    </span>
                    <span className="table-cell" style={{color: 'var(--foreground)'}}>
                      {line}
                      {index < lines.length - 1 && '\n'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              children
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}