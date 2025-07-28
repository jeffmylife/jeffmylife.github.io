import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

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
      
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <time className="text-gray-500 dark:text-gray-400">
            {post.date}
          </time>
        </header>
        
        <div className="prose-content">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}