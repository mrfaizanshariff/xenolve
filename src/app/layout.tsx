import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/header";
import Footer from "./components/Header/Footer";
import FloatingButtons from "./components/Header/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xenolve",
  description: "Website, custom website, custom software, software services, mysore, college projects, social media marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-black">

        <Header/>
        <div className="fixed z-50 bottom-4 left-4">
          <FloatingButtons/>
        </div>
        <div className="mb-4">
        {children}

        </div>
        <Footer/>
        </div>
      </body>
    </html>
  );
}
