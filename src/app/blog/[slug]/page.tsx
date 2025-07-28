import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import CodeBlock from '@/components/CodeBlock';
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
  const tags = post.tags || [];
  const url = `https://jeffmylife.github.io/blog/${slug}`;
  const imageUrl = `https://jeffmylife.github.io/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title,
    description,
    keywords: tags.join(', '),
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
      tags,
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
    keywords: post.tags?.join(', ') || '',
    articleSection: post.category || 'Technology',
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
      
      <nav className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          ← Back to Home
        </Link>
      </nav>
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="mb-4">
            {post.featured && (
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full mr-3 mb-2">
                Featured Post
              </span>
            )}
            {post.category && (
              <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full mr-3 mb-2">
                {post.category}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{post.title}</h1>
          
          {post.abstract && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {post.abstract}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <time>Published: {post.date}</time>
            {post.updatedOn && post.updatedOn !== post.date && (
              <time>Updated: {post.updatedOn}</time>
            )}
            {post.readingTime && (
              <span>{post.readingTime} minute read</span>
            )}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({children, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props}>{children}</h1>,
              h2: ({children, ...props}) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props}>{children}</h2>,
              h3: ({children, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100" {...props}>{children}</h3>,
              p: ({children, ...props}) => <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300" {...props}>{children}</p>,
              code: ({children, className, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                if (match) {
                  // This is a code block inside a <pre>, let the parent handle it
                  return <code className={className} {...props}>{children}</code>;
                }
                // This is inline code
                return (
                  <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({children, ...props}) => {
                // Extract the code element and its props
                const codeElement = children as React.ReactElement<{className?: string; children: string}>;
                if (codeElement?.props?.className?.startsWith('language-')) {
                  return (
                    <div className="mb-6">
                      <CodeBlock 
                        className={codeElement.props.className}
                        showLineNumbers={true}
                      >
                        {codeElement.props.children}
                      </CodeBlock>
                    </div>
                  );
                }
                // Fallback for pre without language
                return (
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props}>
                    {children}
                  </pre>
                );
              },
              blockquote: ({children, ...props}) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-r" {...props}>
                  {children}
                </blockquote>
              ),
              ul: ({children, ...props}) => <ul className="mb-4 pl-6 list-disc text-gray-700 dark:text-gray-300" {...props}>{children}</ul>,
              ol: ({children, ...props}) => <ol className="mb-4 pl-6 list-decimal text-gray-700 dark:text-gray-300" {...props}>{children}</ol>,
              li: ({children, ...props}) => <li className="mb-2" {...props}>{children}</li>,
              a: ({children, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props}>{children}</a>,
              table: ({children, ...props}) => (
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props}>
                    {children}
                  </table>
                </div>
              ),
              th: ({children, ...props}) => (
                <th className="border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold" {...props}>
                  {children}
                </th>
              ),
              td: ({children, ...props}) => (
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props}>
                  {children}
                </td>
              ),
              hr: (props) => <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}