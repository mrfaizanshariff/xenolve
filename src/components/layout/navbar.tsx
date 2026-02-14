"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../features/theme-toggle";

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b py-3"
                    : "bg-transparent py-5"
            )}
        >
            <Container className="flex items-center justify-between">
                <Link href="/" className="text-2xl w-[80px] h-[40px] md:w-[150px] md:h-[50px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Image src="/xenolveLogoBgCropped.png" alt="Logo" width={150} height={50} />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button>Get Started</Button>
                    <ThemeToggle></ThemeToggle>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </Container>


            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background border-b p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium p-2 hover:bg-muted rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button className="w-full">Get Started</Button>
                    <ThemeToggle></ThemeToggle>

                </div>
            )}
        </header>
    );
}
