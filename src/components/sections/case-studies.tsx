import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const CASES = [
    {
        title: "Fintech Platform Modernization",
        description: "Re-architecting a legacy banking system for 10x scalability.",
        tag: "Fintech",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "AI-Powered Supply Chain",
        description: "Optimizing logistics with predictive machine learning models.",
        tag: "Logistics",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "Healthcare Data Exchange",
        description: "Secure and compliant patient data interoperability platform.",
        tag: "Healthcare",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    }
];

export function CaseStudies() {
    return (
        <section id="work" className="py-24">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
                    <div>
                        <Badge variant="outline" className="mb-4">Selected Work</Badge>
                        <Heading level={2}>Real Engineering. Measurable Impact.</Heading>
                        <p className="text-muted-foreground max-w-2xl mb-4">We partner with ambitious companies to modernize legacy systems, launch new products, and build scalable platforms that handle millions of users.</p>
                    </div>
                    <Button variant="ghost" asChild>
                        <Link href="/work" className="group">
                            View All Case Studies <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CASES.map((study) => (
                        <div key={study.title} className="group relative overflow-hidden rounded-xl bg-muted/20 border transition-colors hover:bg-muted/40 block">
                            <div className="aspect-video w-full overflow-hidden bg-muted">
                                {/* Placeholder for real images */}
                                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${study.image})` }}
                                />
                            </div>
                            <div className="p-6">
                                <Badge variant="secondary" className="mb-3">{study.tag}</Badge>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{study.title}</h3>
                                <p className="text-muted-foreground">{study.description}</p>
                            </div>
                            <Link href={`/work/${study.title.toLowerCase().replace(/\s+/g, '-')}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View case study</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
