import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostPreview } from '@/types/blog';

export function getBlogPosts(isBlogPost: boolean = true): BlogPostPreview[] {
    const DIR = isBlogPost ? path.join(process.cwd(), 'content/blog') : path.join(process.cwd(), 'content/dailyNews');
    console.log('Generating static params for blog posts...');
    // Ensure directory exists
    console.log('Loading blog posts from:', DIR);
    if (!fs.existsSync(DIR)) {
        console.warn('Blog directory not found:', DIR);
        return [];
    }

    const files = fs.readdirSync(DIR);

    const posts = files
        .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
        .map((file) => {
            try {
                const slug = file.replace(/\.mdx?$/, '');
                const fullPath = path.join(DIR, file);
                const fileContents = fs.readFileSync(fullPath, 'utf8');

                const { data, content } = matter(fileContents);
                const readTime = readingTime(content);

                return {
                    slug,
                    title: data.title,
                    description: data.description,
                    date: data.date, // Format date string properly in UI if needed
                    coverImage: data.coverImage,
                    tags: data.tags || [],
                    readingTime: readTime.text,
                    author: data.author,
                } as BlogPostPreview;
            } catch (e) {
                console.error(`Error processing post ${file}:`, e);
                return null;
            }
        })
        .filter(Boolean) as BlogPostPreview[];

    return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getBlogPost(slug: string, isBlogPost: boolean = true): BlogPost | null {
    const DIR = isBlogPost ? path.join(process.cwd(), 'content/blog') : path.join(process.cwd(), 'content/dailyNews');
    const mdPath = path.join(DIR, `${slug}.md`);
    const mdxPath = path.join(DIR, `${slug}.mdx`);

    let fullPath = '';
    if (fs.existsSync(mdPath)) {
        fullPath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
        fullPath = mdxPath;
    } else {
        console.warn(`Post not found for slug: ${slug} at ${DIR}`);
        return null;
    }

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const readTime = readingTime(content);

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            coverImage: data.coverImage,
            tags: data.tags || [],
            readingTime: readTime.text,
            content, // Raw content to be passed to MDXRemote
            author: data.author,
        } as BlogPost;
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

export function getAllTags(isBlogPost: boolean = true): string[] {
    const posts = getBlogPosts(isBlogPost);
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
}
