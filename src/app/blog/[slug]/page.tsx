import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
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
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{post.title}</h1>
          <time className="text-gray-500 dark:text-gray-400">
            {post.date}
          </time>
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
                return match ? (
                  <code className={className} {...props}>{children}</code>
                ) : (
                  <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                )
              },
              pre: ({children, ...props}) => (
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props}>
                  {children}
                </pre>
              ),
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