export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    coverImage?: string;
    tags: string[];
    readingTime: string;
    content: string; // Raw markdown content for processing
    author?: {
        name: string;
        picture: string;
    };
}

export type BlogPostPreview = Omit<BlogPost, 'content'>;
