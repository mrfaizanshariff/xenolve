import { getBlogPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

export async function GET(): Promise<Response> {
    const blogPosts = getBlogPosts(true);
    const dailyNewsPosts = getBlogPosts(false);
    const allPosts = [...blogPosts, ...dailyNewsPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 50);

    const baseUrl = SITE_CONFIG.url;
    const buildDate = new Date().toUTCString();
    const latestPost = allPosts[0];
    const latestDate = latestPost ? new Date(latestPost.date).toUTCString() : buildDate;

    const items = allPosts
        .map((post) => {
            const link = `${baseUrl}/blog/${post.slug}`;
            const pubDate = new Date(post.date).toUTCString();
            const author = post.author?.name || 'Xenolve Team';
            const categories = (post.tags || [])
                .map((tag) => `      <category>${escapeXml(tag)}</category>`)
                .join('\n');

            return `    <item>
      <title>${escapeXml(post.title || 'Untitled')}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.description || '')}</description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(author)}</dc:creator>
${categories}
    </item>`;
        })
        .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)} — Blog &amp; Generative AI Updates</title>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE_CONFIG.name)}</copyright>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <generator>Xenolve RSS</generator>
    <image>
      <url>${baseUrl}/xenolveLogoBg.png</url>
      <title>${escapeXml(SITE_CONFIG.name)}</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
