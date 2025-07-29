import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold">Jeff&apos;s Blog</h1>
          <DarkModeToggle />
        </div>
        <p className="text-lg" style={{color: 'var(--text-muted)'}}>
          Personal thoughts and tech insights
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
