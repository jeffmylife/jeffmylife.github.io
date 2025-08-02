'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TweetImageProps {
  id: string;
  width?: number;
  height?: number;
  className?: string;
}

export function TweetImage({ 
  id, 
  width = 550, 
  height = 400, 
  className = "" 
}: TweetImageProps) {
  // Load metadata dynamically from the static file
  const [tweetData, setTweetData] = React.useState<{
    url: string;
    article: string; 
    fileName: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/static/metadata.json')
      .then(res => res.json())
      .then(metadata => {
        setTweetData(metadata[id] || null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="my-6 mx-auto max-w-full flex justify-center">
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-600">Loading tweet...</p>
        </div>
      </div>
    );
  }
  
  if (!tweetData) {
    return (
      <div className="my-6 mx-auto max-w-full flex justify-center">
        <div className="p-4 border border-red-500 rounded-lg bg-red-50">
          <p className="text-red-600">Tweet image not found: {id}</p>
          <p className="text-sm text-gray-600">
            Make sure the tweet was processed with the tweet-processor script
          </p>
        </div>
      </div>
    );
  }

  // Construct image path: /static/{article}/{fileName}.webp
  const imagePath = `/static/${tweetData.article}/${tweetData.fileName}.webp`;
  
  return (
    <div className="my-6 mx-auto max-w-full flex justify-center">
      <Link 
        href={tweetData.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block hover:opacity-90 transition-opacity"
      >
        <Image
          src={imagePath}
          alt="Tweet screenshot"
          width={width}
          height={height}
          className={`rounded-lg border border-border shadow-lg ${className}`}
          style={{ height: 'auto' }}
        />
      </Link>
    </div>
  );
}