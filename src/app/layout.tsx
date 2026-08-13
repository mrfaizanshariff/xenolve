import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { VoiceAssistantWidget } from '@/components/features/voice-assistant-widget';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Enterprise AI Agents & Digital Engineering`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  applicationName: SITE_CONFIG.name,
  authors: [{ name: 'Xenolve Team', url: SITE_CONFIG.url }],
  creator: 'Xenolve',
  publisher: 'Xenolve',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | Enterprise AI Agents & Digital Engineering`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/xenolveLogoBg.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Enterprise AI Agents & Digital Engineering`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | Enterprise AI Agents & Digital Engineering`,
    description: SITE_CONFIG.description,
    images: ['/xenolveLogoBg.png'],
    site: '@xenolve',
    creator: '@xenolve',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/xenolveLogoBg.png`,
  description: SITE_CONFIG.description,
  sameAs: [SOCIAL_LINKS.twitter, SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'mohammed.faizan@xenolve.com',
    contactType: 'customer support',
    areaServed: ['IN', 'AE', 'SA', 'US', 'GB'],
    availableLanguage: ['English'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_CONFIG.name} — Blog & Generative AI Updates`}
          href="/rss.xml"
        />
        <meta name="google-site-verification" content="coV8zdqFgxehypiLSaEQM1vdk7P10c0aEITa_NDgzUk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-2JC8F249GN" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <VoiceAssistantWidget />
          </div>
        </ThemeProvider>
        <Script
          src="https://cdn.botpress.cloud/webchat/v3.5/inject.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://files.bpcontent.cloud/2025/03/15/09/20250315093240-YV6B4YAJ.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
