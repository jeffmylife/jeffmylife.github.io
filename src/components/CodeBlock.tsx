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
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-gray-300 px-4 py-2 text-sm rounded-t-lg">
        <span className="font-mono text-xs uppercase tracking-wide">{language}</span>
        <button
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-700 dark:hover:bg-gray-800 px-2 py-1 rounded text-xs"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 rounded-b-lg overflow-x-auto">
        <pre className="p-4 text-sm leading-6">
          <code className={className}>
            {showLineNumbers ? (
              <div className="table w-full">
                {lines.map((line, index) => (
                  <div key={index} className="table-row">
                    <span className="table-cell pr-4 text-gray-400 select-none text-right w-8">
                      {index + 1}
                    </span>
                    <span className="table-cell">
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