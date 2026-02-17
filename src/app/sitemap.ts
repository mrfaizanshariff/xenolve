import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getBlogPosts(true)
    const baseUrl = SITE_CONFIG.url

    const postsUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const routes = [
        '',
        '/about',
        '/#services',
        '/work',
        '/blog',
        '/contact',
        '/pricing',
        '/ai-demo',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.9,
    }))

    return [...routes, ...postsUrls]
}
