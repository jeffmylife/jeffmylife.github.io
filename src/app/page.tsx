import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold">
            Jeffrey Lemoine&apos;s{' '}
            <span
              className="relative group cursor-help"
            >
              WeBlog
              <span 
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-3 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50 w-80 text-left shadow-lg"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)'
                }}
              >
                <div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: '6px solid var(--border)'
                  }}
                />
                <div className="font-medium mb-1" style={{color: 'var(--accent-blue)'}}>Etymology</div>
                &ldquo;Weblog&rdquo; is a portmanteau of &ldquo;web&rdquo; and &ldquo;log&rdquo;. The term was coined in 1997 by Jorn Barger to mean a log (journal) on the web. It was later shortened to &ldquo;blog&rdquo;.
              </span>
            </span>
          </h1>
          <DarkModeToggle />
        </div>
        <p className="text-lg" style={{color: 'var(--text-muted)'}}>
          I write about technology and other things.
        </p>
      </header>

      <main>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No blog posts yet. Create your first post in the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">posts/</code> directory.
            </p>
            <p className="text-sm text-gray-500">
              Example: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">posts/my-first-post.mdx</code>
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="pb-8 mb-8" style={{borderBottom: `1px solid var(--border)`}}>
                <Link href={`/blog/${post.slug}`} className="block hover:opacity-90 transition-opacity">
                  <h2 
                    className="text-3xl font-bold mb-3 hover:underline" 
                    style={{color: 'var(--accent-blue)'}}
                  >
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm mb-4" style={{color: 'var(--text-muted)'}}>
                    <time>{post.date}</time>
                    {post.readingTime && (
                      <span>📖 {post.readingTime} min read</span>
                    )}
                    {post.updatedOn && post.updatedOn !== post.date && (
                      <span>🔄 Updated: {post.updatedOn}</span>
                    )}
                  </div>
                  {(post.excerpt || post.abstract) && (
                    <p className="text-lg leading-relaxed mb-4" style={{color: 'var(--foreground)'}}>
                      {post.excerpt || post.abstract}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
