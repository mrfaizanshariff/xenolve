import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/navigation";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            {SITE_CONFIG.name}
                        </Link>
                        <p className="mt-4 text-muted-foreground max-w-xs">
                            {SITE_CONFIG.description}
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link href={SOCIAL_LINKS.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href={SOCIAL_LINKS.github} className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href={SOCIAL_LINKS.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {FOOTER_LINKS.map((column) => (
                        <div key={column.title}>
                            <h3 className="font-semibold mb-4">{column.title}</h3>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t py-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
