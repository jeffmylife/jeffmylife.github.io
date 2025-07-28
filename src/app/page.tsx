import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Jeff&apos;s Blog</h1>
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
                  <h2 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400 hover:underline">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500 dark:text-gray-400 mb-3 block">
                    {post.date}
                  </time>
                  {post.excerpt && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {post.excerpt}
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
