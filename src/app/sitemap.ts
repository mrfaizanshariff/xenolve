import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url
    const blogPosts = getBlogPosts(true)
    const dailyNewsPosts = getBlogPosts(false)
    const allPosts = [...blogPosts, ...dailyNewsPosts]

    const postsUrls = allPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
    }))

    const routes = [
        '',
        '/about',
        '/services',
        '/work',
        '/blog',
        '/contact',
        '/pricing',
        '/ai-demo',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }))

    return [...routes, ...postsUrls]
}
