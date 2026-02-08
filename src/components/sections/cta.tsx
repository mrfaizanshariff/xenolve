import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 border-t bg-background">
            <Container>
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-24 text-center text-primary-foreground shadow-2xl sm:px-16">
                    {/* Decorative circles */}
                    <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                    <Heading level={2} className="relative mb-6 text-white max-w-2xl mx-auto">
                        Ready to build software that scales with your business?
                    </Heading>
                    <p className="relative mb-10 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                        Partner with Xenolve to design, develop, and launch secure, high-performance digital products faster.
                    </p>
                    <div className="relative flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" variant="secondary" className="font-semibold" asChild>
                            <Link href="/contact">
                                Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                            <Link href="/about">
                                Learn More
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
