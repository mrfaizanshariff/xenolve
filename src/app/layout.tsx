import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { VoiceAssistantWidget } from '@/components/features/voice-assistant-widget';
import { SITE_CONFIG } from '@/lib/constants';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-2JC8F249GN" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script src="https://cdn.botpress.cloud/webchat/v3.5/inject.js"></script>
          <script src="https://files.bpcontent.cloud/2025/03/15/09/20250315093240-YV6B4YAJ.js" defer></script>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <VoiceAssistantWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}