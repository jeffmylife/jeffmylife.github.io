import type { Metadata } from 'next';
import Link from 'next/link';
import VibeSearch from '@/components/VibeSearch';
import DarkModeToggle from '@/components/DarkModeToggle';

export const metadata: Metadata = {
  title: 'Vibe Tools Directory - Jeff\'s Blog',
  description: 'Searchable directory of AI-powered tools organized by category. Find the perfect tool for your needs.',
  keywords: 'AI tools, directory, search, automation, marketing, design, development',
};

export default function VibeIndexPage() {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <nav className="mb-4">
              <Link 
                href="/" 
                className="text-sm hover:underline transition-colors"
                style={{color: 'var(--text-muted)'}}
              >
                ← Back to Blog
              </Link>
            </nav>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <VibeSearch />
    </div>
  );
} 