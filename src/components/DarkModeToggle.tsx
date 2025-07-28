'use client';

import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check current state
    const currentIsDark = document.documentElement.classList.contains('dark');
    setIsDark(currentIsDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    console.log('Toggling dark mode:', { from: isDark, to: newDarkMode });
    setIsDark(newDarkMode);
    
    // Store preference
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply immediately
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class, current classes:', document.documentElement.className);
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class, current classes:', document.documentElement.className);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 w-9 h-9 animate-pulse">
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
      style={{
        backgroundColor: 'var(--surface)',
        border: `1px solid var(--border)`,
      }}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        // Sun icon for light mode  
        <svg className="w-5 h-5" fill="var(--accent-primary)" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg className="w-5 h-5" fill="var(--text-muted)" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}