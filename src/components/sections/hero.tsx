"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
            {/* Background gradients */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

            <Container className="flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge variant="premium" className="mb-6 px-4 py-1.5 text-sm">
                        🎉 Redefining Digital Excellence
                    </Badge>
                </motion.div>

                <motion.h1
                    className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Enterprise Software Development {" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        & AI Engineering That Scales Your Business
                    </span>
                </motion.h1>

                <motion.p
                    className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Xenolve is a premium software development agency delivering custom web applications, AI solutions, Shopify eCommerce platforms, and mobile apps for startups and enterprises. We design, build, and scale high-performance digital products that drive measurable growth.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button size="lg" className="h-12 px-8 text-base">
                        <Link href="/contact">Start Your Project</Link>
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                        <Link href="/work">View Case Studies</Link>
                    </Button>
                </motion.div>

                {/* Dashboard Preview / Visual Element */}
                <motion.div
                    className="mt-20 w-full overflow-hidden rounded-xl border bg-background/50 shadow-2xl backdrop-blur sm:mt-24"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <div className="aspect-[16/9] w-full bg-[url('/dashboard-preview.png')] bg-cover bg-center bg-no-repeat opacity-90"
                        style={{ backgroundImage: 'linear-gradient(to bottom, transparent, hsl(var(--background))), url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop)' }}
                    />
                    {/* Fallback using a gradient if image not present or generic placeholder */}
                </motion.div>
            </Container>
        </section>
    );
}
