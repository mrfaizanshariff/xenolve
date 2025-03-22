import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BackgroundAnimations } from '@/components/background-animations';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Xenolve - Digital Innovation Agency',
  description: 'Transform your digital presence with Xenolve - Your partner in innovative web solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundAnimations />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}