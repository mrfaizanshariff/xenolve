import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/blog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';

export async function DailyNewsSection() {
    const posts = getBlogPosts(false); // false for dailyNews

    if (!posts.length) return null;

    // Structured Data for the collection of news articles
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "headline": "Daily News",
        "description": "Latest daily news and updates.",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": posts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "NewsArticle",
                    "headline": post.title,
                    "description": post.description,
                    "image": post.coverImage ? [post.coverImage] : [],
                    "datePublished": post.date,
                    "author": {
                        "@type": "Person",
                        "name": post.author?.name || "Unknown"
                    },
                    "url": `/blog/${post.slug}` // Ideally absolute URL
                }
            }))
        }
    };

    return (
        <section className="py-12 mb-4 rounded-md border-t bg-muted/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Container>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Daily News</h2>
                </div>

                <div
                    className="flex scroll-box overflow-x-auto pb-8 -mx-4 px-4 md:-mx-0 md:px-0 gap-6 snap-x snap-mandatory scrollbar-hide md:scrollbar-default"
                >
                    {posts.map((post) => (
                        <div key={post.slug} className="snap-center shrink-0 w-[85vw] sm:w-[350px]">
                            <Link href={`/blog/${post.slug}`} className="block h-full hover:no-underline group">
                                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted-foreground/20">
                                    {/* {post.coverImage && (
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 85vw, 350px"
                                            />
                                        </div>
                                    )} */}
                                    <CardHeader className="flex-1 space-y-3 p-5">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            <time dateTime={post.date}>
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-5 pt-0">
                                        <CardDescription className="line-clamp-3 text-sm">
                                            {/* {post.description} */}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
