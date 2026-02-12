import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { DailyNewsSection } from '@/components/daily-news-section';

export const metadata: Metadata = {
    title: 'Blog | Xenolve',
    description: 'Insights, tutorials, and news about software development, AI, and digital transformation.',
};

export default function BlogPage() {
    const posts = getBlogPosts();

    return (
        <div className="py-20 min-h-screen">
            <Container>
                <div className="text-center mb-16">
                    <Heading level={1}>Insights & Updates</Heading>
                    <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Explore the latest trends in software engineering, AI agents, and digital product strategy.
                    </p>
                </div>
                <div>
                    <DailyNewsSection />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                            <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1">
                                <div className="aspect-video w-full overflow-hidden bg-muted relative">
                                    {post.coverImage ? (
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center text-muted-foreground">
                                            <span className="text-4xl opacity-20 font-bold">BLOG</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {post.tags.slice(0, 2).map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="h-3 w-3" />
                                            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{post.readingTime}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex-1 pb-4">
                                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                        {post.description}
                                    </p>
                                </CardContent>

                                <CardFooter className="pt-0 border-t border-border/30 mt-auto p-6">
                                    <span className="text-sm font-medium text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Read Article <ArrowRight className="h-4 w-4" />
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-24 text-muted-foreground">
                        <p className="text-lg">No posts found yet. Check back soon!</p>
                    </div>
                )}
            </Container>
        </div>
    );
}
