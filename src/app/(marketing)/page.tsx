import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Stats } from "@/components/sections/stats";
import { CaseStudies } from "@/components/sections/case-studies";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { DailyNewsSection } from "@/components/daily-news-section";
import { CTA } from "@/components/sections/cta";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Xenolve | Enterprise AI Agents & Digital Engineering",
    description: "Xenolve is a premium digital engineering agency specializing in building AI agents, modern web applications, and enterprise software solutions.",
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    return (
        <>
            <Hero />
            <Logos />
            <ServicesGrid />
            <Stats />
            <CaseStudies />
            {/* <Testimonials /> */}
            <Pricing />
            <DailyNewsSection />
            <CTA />
        </>
    );
}
