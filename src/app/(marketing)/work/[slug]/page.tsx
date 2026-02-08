
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Factory } from "lucide-react";

import { CASE_STUDIES } from "@/lib/case-studies";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent } from "@/components/ui/card";

interface CaseStudyPageProps {
    params: {
        slug: string;
    };
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
    const study = CASE_STUDIES.find((s) => s.slug === params.slug);

    if (!study) {
        return {
            title: "Case Study Not Found",
        };
    }

    return {
        title: `${study.title} | ${study.serviceKeyword} | Xenolve Case Study`,
        description: study.overview,
    };
}

// Generate Static Params for SSG
export async function generateStaticParams() {
    return CASE_STUDIES.map((study) => ({
        slug: study.slug,
    }));
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
    const study = CASE_STUDIES.find((s) => s.slug === params.slug);

    if (!study) {
        notFound();
    }

    const nextStudy = CASE_STUDIES[CASE_STUDIES.findIndex((s) => s.slug === params.slug) + 1] || CASE_STUDIES[0];

    return (
        <article className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20 bg-muted/20 border-b">
                <Container>
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Link href="/work" className="text-muted-foreground hover:text-primary transition-colors flex items-center text-sm font-medium">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Work
                            </Link>
                            <span className="h-1 w-1 rounded-full bg-border" />
                            <span className="text-sm font-medium text-primary">{study.category}</span>
                        </div>

                        <Heading level={1} className="leading-tight mb-6">{study.subtitle}</Heading>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">{study.overview}</p>
                    </div>
                </Container>
            </section>

            {/* Hero Image */}
            <section className="-mt-12 mb-20">
                <Container>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-background shadow-2xl">
                        <Image
                            src={study.image}
                            alt={study.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </Container>
            </section>

            {/* Project Details */}
            <Container>
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-24 mb-24">
                    {/* Sidebar Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Client</h3>
                            <p className="text-xl font-semibold">{study.title}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Services</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">{study.serviceKeyword}</Badge>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {study.techStack.map((tech) => (
                                    <Badge key={tech} variant="outline">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Challenge */}
                        <section className="space-y-4">
                            <Heading level={2}>The Challenge</Heading>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {study.challenge}
                            </p>
                        </section>

                        {/* Solution */}
                        <section className="space-y-4">
                            <Heading level={2}>The Solution</Heading>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {study.solution}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                {study.keyFeatures.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3 p-4 rounded-lg bg-surface/50 border">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="font-medium text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Results Stats */}
                        <section className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
                            <Heading level={2} className="mb-8">Impact & Results</Heading>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {study.results.map((result) => (
                                    <div key={result.label} className="space-y-1">
                                        <div className="text-3xl md:text-4xl font-bold text-primary">{result.value}</div>
                                        <div className="text-xs uppercase tracking-wide font-medium text-muted-foreground">{result.label}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </Container>

            {/* Footer Navigation */}
            <section className="border-t py-20 bg-muted/20">
                <Container>
                    <div className="flex flex-col items-center text-center">
                        <p className="text-muted-foreground mb-4 uppercase tracking-wider text-sm font-bold">Next Project</p>
                        <Heading level={2} className="mb-8">{nextStudy.title}</Heading>
                        <Button size="lg" asChild>
                            <Link href={`/work/${nextStudy.slug}`}>
                                View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </article>
    );
}
