"use client";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Stats } from "@/components/sections/stats";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="py-20">
            <Container>
                <Heading level={1}>About Xenolve</Heading>
                <Heading level={5}>A Premium Software Development & AI Engineering Agency</Heading>
                <p className="text-xl text-muted-foreground mt-4 mb-12 max-w-5xl">
                    Xenolve is a full-stack software development company helping startups, scaleups, and enterprises design, build, and scale custom web applications, AI solutions, Shopify eCommerce platforms, and mobile apps. We combine engineering excellence with business strategy to deliver measurable digital growth.
                </p>
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
            <section id="about-us" className="py-24 bg-surface/50">
                <Container>
                    <div className="text-center mb-16">
                        <Heading level={2}>We Build Software That Moves Businesses Forward</Heading>
                    </div>
                    <p className="text-xl  mt-4 mb-12 max-w-5xl">
                        Xenolve was founded with a simple belief — great software should solve real business problems, not just look impressive.
                        <br /><br />
                        While many agencies focus on design alone, we focus on <strong>engineering depth, scalability, and long-term performance</strong>. Every solution we build is crafted to handle growth, integrate seamlessly with your ecosystem, and deliver measurable ROI.
                        <br /><br />
                        From custom software and AI automation to Shopify commerce and mobile applications, we help companies turn complex ideas into reliable digital products used by thousands — and often millions — of users.
                    </p>
                </Container>
            </section>
            <Stats />
            <section id="services" className="py-24 bg-surface/50">
                <Container>
                    <div className="text-center mb-16">
                        <Heading level={2}>Our Expertise</Heading>
                    </div>
                    <p className="text-xl  mt-4 mb-12 max-w-5xl">
                        We provide end-to-end software development services designed for modern businesses:

                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 list-none">
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Custom Software Development
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Web Application Development (Next.js, React, full-stack)
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            AI & Automation Solutions (AI agents, chatbots, ML systems)
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Shopify eCommerce Development & Headless Commerce
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Native Mobile App Development (iOS & Android)
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Product Strategy & Technical Consulting
                        </li>
                    </ul>
                    <p className="text-xl  mt-4 mb-12 max-w-5xl">
                        Whether you need to launch a new product or modernize legacy systems, we deliver solutions that are secure, scalable, and future-ready.</p>
                </Container>
            </section>
        </div>
    );
}
