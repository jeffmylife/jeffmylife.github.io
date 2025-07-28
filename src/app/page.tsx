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
        <p className="text-lg text-gray-600 dark:text-gray-400">
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
              <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <Link href={`/blog/${post.slug}`} className="block hover:opacity-80 transition-opacity">
                  <div className="mb-2">
                    {post.featured && (
                      <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                        Featured
                      </span>
                    )}
                    {post.category && (
                      <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400 hover:underline">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <time>{post.date}</time>
                    {post.readingTime && (
                      <span>{post.readingTime} min read</span>
                    )}
                    {post.updatedOn && post.updatedOn !== post.date && (
                      <span>Updated: {post.updatedOn}</span>
                    )}
                  </div>
                  {(post.excerpt || post.abstract) && (
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {post.excerpt || post.abstract}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
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
