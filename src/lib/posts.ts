import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export interface Post {
  slug: string;
  title: string;
  seoTitle?: string;
  date: string;
  updatedOn?: string;
  excerpt?: string;
  abstract?: string;
  content: string;
  isPublished?: boolean;
  readingTime?: number;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        seoTitle: data.seoTitle,
        date: data.date || '',
        updatedOn: data.updatedOn,
        excerpt: data.excerpt || data.abstract || '',
        abstract: data.abstract,
        content,
        isPublished: data.isPublished !== false, // Default to true unless explicitly false
        readingTime: data.readingTime || calculateReadingTime(content),
      };
    });

  return allPostsData
    .filter(post => post.isPublished)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      seoTitle: data.seoTitle,
      date: data.date || '',
      updatedOn: data.updatedOn,
      excerpt: data.excerpt || data.abstract || '',
      abstract: data.abstract,
      content,
      isPublished: data.isPublished !== false,
      readingTime: data.readingTime || calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}