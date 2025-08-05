'use client';

import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { vibeTools, type VibeTool } from '@/lib/vibe-data';
import { Search, ExternalLink, Filter, X } from 'lucide-react';

interface SearchResult {
  item: VibeTool;
  refIndex: number;
  score: number;
}

export default function VibeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Create Fuse instance with search configuration
  const fuse = useMemo(() => {
    return new Fuse(vibeTools, {
      keys: [
        { name: 'name', weight: 0.35 },
        { name: 'description', weight: 0.25 },
        { name: 'category', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
        { name: 'url', weight: 0.1 }
      ],
      includeScore: true,
      threshold: 0.3, // Lower threshold = more strict matching
      minMatchCharLength: 2,
      shouldSort: true
    });
  }, []);

  // Perform search when query or category changes
  useEffect(() => {
    setIsSearching(true);
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      let searchResults: SearchResult[] = [];
      
      if (searchQuery.trim()) {
        searchResults = fuse.search(searchQuery).map(result => ({
          item: result.item,
          refIndex: result.refIndex,
          score: result.score || 0
        }));
      } else {
        // If no search query, show all tools
        searchResults = vibeTools.map((tool, index) => ({
          item: tool,
          refIndex: index,
          score: 0
        }));
      }

      // Filter by category if selected
      if (selectedCategory !== 'all') {
        searchResults = searchResults.filter(result => 
          result.item.category === selectedCategory
        );
      }

      setResults(searchResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, fuse]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(vibeTools.map(tool => tool.category))).sort();
    return ['all', ...cats];
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--accent-blue)'}}>
          Vibe Tools Directory
        </h1>
        <p className="text-lg" style={{color: 'var(--text-muted)'}}>
          Search through {vibeTools.length} AI-powered tools organized by category
        </p>
      </div>

      {/* Search Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{color: 'var(--text-muted)'}} />
          <input
            type="text"
            placeholder="Search tools by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="h-4 w-4" style={{color: 'var(--text-muted)'}} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4" style={{color: 'var(--text-muted)'}} />
          <span className="text-sm font-medium" style={{color: 'var(--text-muted)'}}>Category:</span>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? 'var(--accent-blue)' : 'transparent',
                  color: selectedCategory === category ? 'white' : 'var(--foreground)'
                }}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Clear All */}
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={clearSearch}
            className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="space-y-6">
        {isSearching ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2" style={{color: 'var(--text-muted)'}}>Searching...</p>
          </div>
        ) : results.length > 0 ? (
          // Show organized by category if no search query, otherwise show grid
          !searchQuery.trim() ? (
            <div className="space-y-8">
              {categories.slice(1).map((category) => {
                const categoryTools = results.filter(result => result.item.category === category);
                if (categoryTools.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-4">
                    <h2 className="text-2xl font-bold" style={{color: 'var(--accent-blue)'}}>
                      {category}
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {categoryTools.map((result) => (
                        <div
                          key={result.refIndex}
                          className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                          style={{
                            borderColor: 'var(--border)',
                            backgroundColor: 'var(--background)'
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-base" style={{color: 'var(--accent-blue)'}}>
                              {result.item.name}
                            </h3>
                            <ExternalLink className="h-4 w-4 flex-shrink-0" style={{color: 'var(--text-muted)'}} />
                          </div>
                          
                          <p className="text-sm mb-3" style={{color: 'var(--foreground)'}}>
                            {result.item.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <a
                              href={result.item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                            >
                              Visit →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((result) => (
                <div
                  key={result.refIndex}
                  className="border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--background)'
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg" style={{color: 'var(--accent-blue)'}}>
                      {result.item.name}
                    </h3>
                    <ExternalLink className="h-4 w-4 flex-shrink-0" style={{color: 'var(--text-muted)'}} />
                  </div>
                  
                  <p className="text-sm mb-3" style={{color: 'var(--foreground)'}}>
                    {result.item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800" style={{color: 'var(--text-muted)'}}>
                      {result.item.category}
                    </span>
                    
                    <a
                      href={result.item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Visit →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : searchQuery || selectedCategory !== 'all' ? (
          <div className="text-center py-12">
            <p className="text-lg mb-2" style={{color: 'var(--foreground)'}}>
              No tools found
            </p>
            <p className="text-sm" style={{color: 'var(--text-muted)'}}>
              Try adjusting your search terms or category filter
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg mb-2" style={{color: 'var(--foreground)'}}>
              Browse tools by category or search for specific needs
            </p>
            <p className="text-sm" style={{color: 'var(--text-muted)'}}>
              Use the search bar above to find specific tools or browse by category
            </p>
          </div>
        )}
      </div>

      {/* Results Count */}
      {results.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm" style={{color: 'var(--text-muted)'}}>
            Showing {results.length} of {vibeTools.length} tools
          </p>
        </div>
      )}
    </div>
  );
} 