import React from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MarkdownAsync } from 'react-markdown';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { preProcess, postProcess } from '@/lib/rehype-pre-raw';
import CopyButton from '@/components/CopyButton';
import CopyMarkdownButton from '@/components/CopyMarkdownButton';
import DarkModeToggle from '@/components/DarkModeToggle';
import HeaderWithAnchor from '@/components/HeaderWithAnchor';
import MermaidDiagram from '@/components/MermaidDiagram';
import { Img } from '@/components/Img';
import { generateSlug } from '@/lib/utils';
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
          <MarkdownAsync
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[preProcess, rehypeHighlight, postProcess, rehypeRaw]}
            components={{
              h1: ({children, ...props}) => <HeaderWithAnchor level={1} id={generateSlug(String(children))} {...props}>{children}</HeaderWithAnchor>,
              h2: ({children, ...props}) => <HeaderWithAnchor level={2} id={generateSlug(String(children))} {...props}>{children}</HeaderWithAnchor>,
              h3: ({children, ...props}) => <HeaderWithAnchor level={3} id={generateSlug(String(children))} {...props}>{children}</HeaderWithAnchor>,
              h4: ({children, ...props}) => <HeaderWithAnchor level={4} id={generateSlug(String(children))} {...props}>{children}</HeaderWithAnchor>,
              h5: ({children, ...props}) => <HeaderWithAnchor level={5} id={generateSlug(String(children))} {...props}>{children}</HeaderWithAnchor>,
              h6: ({children, ...props}) => <HeaderWithAnchor level={6} id={generateSlug(String(children))} {...props}>{children}</HeaderWithAnchor>,
              p: ({children, ...props}) => <p className="mb-4 leading-7" style={{color: 'var(--foreground)'}} {...props}>{children}</p>,
              code: ({children, className, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                if (match) {
                  const language = match[1];
                  // Check if this is a Mermaid diagram
                  if (language === 'mermaid') {
                    return <MermaidDiagram>{String(children)}</MermaidDiagram>;
                  }
                  // This is a regular code block inside a <pre>, let the parent handle it
                  return <code className={className} {...props}>{children}</code>;
                }
                // This is inline code
                return (
                  <code 
                    className="px-1.5 py-0.5 rounded text-sm font-mono" 
                    style={{backgroundColor: 'var(--surface)', color: 'var(--accent-red)'}}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: (props: React.HTMLProps<HTMLPreElement> & { raw?: string }) => {
                const { children, raw, ...otherProps } = props;
                
                // Check if this is a Mermaid diagram by checking raw content
                const isMermaidDiagram = raw && raw.includes('language-mermaid');
                
                return (
                  <div className="relative group mb-6">
                    {/* Copy button positioned absolutely - skip for Mermaid diagrams */}
                    {raw && typeof raw === 'string' && !isMermaidDiagram && (
                      <div className="absolute top-3 right-3 z-10">
                        <CopyButton text={raw} />
                      </div>
                    )}
                    {/* Code content - let it render normally */}
                    <pre 
                      className="p-4 rounded-lg overflow-x-auto text-sm m-0" 
                      style={{
                        backgroundColor: 'var(--surface)',
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)'
                      }}
                      {...otherProps}
                    >
                      {children}
                    </pre>
                  </div>
                );
              },
              blockquote: ({children, ...props}) => (
                <blockquote 
                  className="border-l-4 pl-4 my-4 italic"
                  style={{
                    borderColor: 'var(--text-muted)',
                    color: 'var(--text-muted)'
                  }}
                  {...props}
                >
                  {children}
                </blockquote>
              ),
              ul: ({children, ...props}) => <ul className="mb-4 pl-6 list-disc" style={{color: 'var(--foreground)'}} {...props}>{children}</ul>,
              ol: ({children, ...props}) => <ol className="mb-4 pl-6 list-decimal" style={{color: 'var(--foreground)'}} {...props}>{children}</ol>,
              li: ({children, ...props}) => <li className="mb-2" {...props}>{children}</li>,
              a: ({children, ...props}) => <a className="hover:underline transition-colors" style={{color: 'var(--accent-blue)'}} {...props}>{children}</a>,
              table: ({children, ...props}) => (
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse border" style={{borderColor: 'var(--border)'}} {...props}>
                    {children}
                  </table>
                </div>
              ),
              th: ({children, ...props}) => (
                <th 
                  className="border px-4 py-2 text-left font-semibold" 
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--foreground)'
                  }}
                  {...props}
                >
                  {children}
                </th>
              ),
              td: ({children, ...props}) => (
                <td 
                  className="border px-4 py-2" 
                  style={{borderColor: 'var(--border)', color: 'var(--foreground)'}}
                  {...props}
                >
                  {children}
                </td>
              ),
              hr: (props) => <hr className="my-8" style={{borderColor: 'var(--border)'}} {...props} />,
              div: (props: React.HTMLProps<HTMLDivElement> & { 
                'data-img-src'?: string;
                'data-img-alt'?: string;
                'data-img-url'?: string;
                'data-img-size'?: string;
                'data-img-caption'?: string;
              }) => {
                // Check if this is an image placeholder
                if (props['data-img-src']) {
                  return (
                    <Img
                      src={props['data-img-src']}
                      alt={props['data-img-alt'] || 'Image'}
                      url={props['data-img-url']}
                      size={parseInt(props['data-img-size'] || '400')}
                      caption={props['data-img-caption']}
                    />
                  );
                }
                return <div {...props} />;
              },
            }}
          >
            {post.content}
          </MarkdownAsync>
        </div>
      </article>
    </div>
  );
}