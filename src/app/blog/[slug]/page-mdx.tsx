import React from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import CopyMarkdownButton from '@/components/CopyMarkdownButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import type { Metadata } from 'next';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.abstract || post.excerpt || '';
  const publishedTime = post.date;
  const modifiedTime = post.updatedOn || post.date;
  const url = `https://jeffmylife.github.io/blog/${slug}`;
  const imageUrl = `https://jeffmylife.github.io/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title,
    description,
    authors: [{ name: 'Jeff', url: 'https://jeffmylife.github.io' }],
    creator: 'Jeff',
    publisher: 'Jeff',
    openGraph: {
      title,
      description,
      url,
      siteName: "Jeff's Blog",
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: ['Jeff'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@jeffmylife',
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Dynamic import of the MDX file
  let MDXContent;
  try {
    const MDXModule = await import(`../../../../posts/${slug}.mdx`);
    MDXContent = MDXModule.default;
  } catch (error) {
    console.error(`Failed to load MDX for ${slug}:`, error);
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.abstract || post.excerpt || '',
    image: `https://jeffmylife.github.io/api/og?title=${encodeURIComponent(post.title)}`,
    datePublished: post.date,
    dateModified: post.updatedOn || post.date,
    author: {
      "@type": "Person",
      name: "Jeff",
      url: "https://jeffmylife.github.io"
    },
    publisher: {
      "@type": "Person",
      name: "Jeff",
      url: "https://jeffmylife.github.io"
    },
    articleSection: 'Technology',
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime || 1}M`,
    url: `https://jeffmylife.github.io/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jeffmylife.github.io/blog/${post.slug}`
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav className="mb-8 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-sm hover:underline transition-colors"
          style={{color: 'var(--accent-blue)'}}
        >
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <CopyMarkdownButton content={post.content} />
          <DarkModeToggle />
        </div>
      </nav>
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-6" style={{color: 'var(--foreground)'}}>{post.title}</h1>
          
          {post.abstract && (
            <p className="text-xl mb-8 leading-relaxed" style={{color: 'var(--text-muted)'}}>
              {post.abstract}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6" style={{color: 'var(--text-muted)'}}>
            <time>📅 Published: {post.date}</time>
            {post.updatedOn && post.updatedOn !== post.date && (
              <time>🔄 Updated: {post.updatedOn}</time>
            )}
            {post.readingTime && (
              <span>📖 {post.readingTime} minute read</span>
            )}
          </div>
        </header>
        
        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </article>
    </div>
  );
}