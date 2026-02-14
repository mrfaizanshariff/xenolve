
import { getBlogPosts, getBlogPost } from '@/lib/blog';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

// For generating static paths
export async function generateStaticParams() {
    const blogPosts = getBlogPosts(true);
    const dailyNewsPosts = getBlogPosts(false);
    const allPosts = [...blogPosts, ...dailyNewsPosts];

    return allPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        let post = getBlogPost(params.slug, true);
        if (!post) {
            post = getBlogPost(params.slug, false);
        }

        if (!post) {
            return {
                title: 'Post Not Found',
            };
        }

        return {
            title: `${post.title} | Xenolve Blog`,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                type: 'article',
                publishedTime: post.date,
                authors: [post.author?.name || 'Xenolve Team'],
                images: post.coverImage ? [post.coverImage] : [],
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.description,
                images: post.coverImage ? [post.coverImage] : [],
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Error | Xenolve Blog',
            description: 'An error occurred while loading this post.',
        };
    }
}

// Custom MDX components
const components = {
    h1: (props: any) => <h1 className="text-3xl font-bold mt-12 mb-6 text-foreground leading-tight" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground border-b border-border/50 pb-2" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mt-8 mb-4 text-foreground" {...props} />,
    p: (props: any) => <p className="text-lg leading-relaxed mb-6 text-muted-foreground/90" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground/90" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground/90" {...props} />,
    li: (props: any) => <li className="pl-1" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl font-medium text-foreground bg-muted/20 rounded-r-lg" {...props} />
    ),
    code: (props: any) => (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props} />
    ),
    pre: (props: any) => (
        <pre className="bg-muted/50 p-6 rounded-xl overflow-x-auto mb-8 border border-border/50 text-sm font-mono" {...props} />
    ),
    hr: (props: any) => <hr className="my-12 border-border" {...props} />,
    a: (props: any) => <a className="text-primary hover:underline underline-offset-4 font-medium" {...props} />,
    img: (props: any) => (
        <div className="my-8 rounded-xl overflow-hidden border border-border/50 shadow-lg">
            <img className="w-full h-auto object-cover" {...props} />
        </div>
    ),
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    try {
        let post = getBlogPost(params.slug, true);
        if (!post) {
            post = getBlogPost(params.slug, false);
        }

        if (!post) {
            notFound();
        }

        return (
            <div className="py-28 min-h-screen">
                <Container className="max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary pb-8 mt-3 transition-colors group">
                        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                        Back to Blog
                    </Link>

                    <article>
                        <header className="mb-12 text-center">
                            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <Heading level={1} className="mb-6 !text-4xl md:!text-5xl lg:!text-6xl !leading-tight tracking-tight">
                                {post.title}
                            </Heading>

                            <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readingTime}</span>
                                </div>
                                {post.author && (
                                    <div className="flex items-center gap-2 font-medium text-foreground">
                                        <span>By {post.author.name}</span>
                                    </div>
                                )}
                            </div>
                        </header>

                        {post.coverImage && (
                            <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl mb-12 border border-border/50 shadow-2xl relative">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                            <MDXRemote source={post.content} components={components} />
                        </div>

                        <hr className="my-12 border-border" />

                        <div className="bg-muted/30 rounded-2xl p-8 border border-border/50 text-center">
                            <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                Subscribe to our newsletter or follow us for more insights on building premium software and AI solutions.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                    Work with Us
                                </Link>
                            </div>
                        </div>
                    </article>
                </Container>
            </div>
        );
    } catch (error: any) {
        console.error('Error rendering blog post:', error);
        return (
            <div className="py-20 min-h-screen text-center">
                <Container>
                    <Heading level={1}>Something went wrong</Heading>
                    <p className="text-red-500 mt-4">{error.message}</p>
                    <p className="text-muted-foreground mt-2 text-sm">{error.stack}</p>
                    <Link href="/blog" className="mt-8 inline-block underline">Back to Blog</Link>
                </Container>
            </div>
        );
    }
}
