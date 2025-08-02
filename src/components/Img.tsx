import Image from 'next/image';
import Link from 'next/link';

interface ImgProps {
  src: string;
  alt: string; // Required for SEO/accessibility
  size?: number;
  url?: string; // Optional link
  caption?: string;
  priority?: boolean; // For above-the-fold images
}

export function Img({ 
  src, 
  alt, 
  size = 400, 
  url,
  caption,
  priority = false 
}: ImgProps) {
  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size * 0.75} // Reasonable aspect ratio default
      priority={priority}
      className="rounded-lg border"
      style={{
        borderColor: 'var(--border)',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );

  const content = url ? (
    <Link 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block hover:opacity-90 transition-opacity"
    >
      {imageElement}
    </Link>
  ) : (
    imageElement
  );

  return (
    <figure className="my-6 mx-auto max-w-full" style={{ width: 'fit-content' }}>
      {content}
      {caption && (
        <figcaption 
          className="text-sm text-center mt-2 italic"
          style={{ color: 'var(--text-muted)' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}