import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function WorkPage() {
    return (
        <div className="py-20 md:py-32">
            <Container>
                <div className="max-w-3xl mb-16 md:mb-24">
                    <Heading level={1} className="mb-6">Software Development Case Studies & Client Success Stories</Heading>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Explore how Xenolve helps startups and enterprises build scalable web platforms, AI solutions, Shopify eCommerce systems, and custom software that deliver measurable business results. From modernizing legacy infrastructure to launching new digital products, our engineering drives real growth.
                    </p>
                </div>

                <div className="grid gap-16 md:gap-24">
                    {CASE_STUDIES.map((study, index) => (
                        <article key={study.slug} className={`group grid md:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:rtl' : ''}`}>
                            {/* Image Side */}
                            <Link href={`/work/${study.slug}`} className={`block overflow-hidden rounded-xl border bg-muted shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <div className="aspect-video relative overflow-hidden">
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Link>

                            {/* Content Side */}
                            <div className={`${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                                <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                                    <Badge variant="outline">{study.category}</Badge>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{study.results[0].value} {study.results[0].label.split(' ').slice(-1)}</Badge>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    <Link href={`/work/${study.slug}`} className="hover:text-primary transition-colors">
                                        {study.title}
                                    </Link>
                                </h2>

                                <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                                    {study.subtitle}
                                </p>

                                <div className={`flex items-center gap-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                                    <Button asChild variant="ghost" className="group/btn pl-0 hover:pl-2 transition-all">
                                        <Link href={`/work/${study.slug}`}>
                                            View Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </div>
    );
}
