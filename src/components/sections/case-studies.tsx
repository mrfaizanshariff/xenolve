import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { CASE_STUDIES } from "@/lib/case-studies";

export function CaseStudies() {
    const featuredCases = CASE_STUDIES.slice(0, 3);

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
                    {featuredCases.map((study) => (
                        <div key={study.slug} className="group relative overflow-hidden rounded-xl bg-muted/20 border transition-colors hover:bg-muted/40 block">
                            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                                <Image
                                    src={study.image}
                                    alt={study.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <Badge variant="secondary" className="mb-3">{study.category}</Badge>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{study.title}</h3>
                                <p className="text-muted-foreground line-clamp-2">{study.subtitle}</p>
                            </div>
                            <Link href={`/work/${study.slug}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View case study</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
