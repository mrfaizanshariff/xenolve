import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { CaseStudies } from "@/components/sections/case-studies";

export default function WorkPage() {
    return (
        <div className="py-20">
            <Container>
                <Heading level={1}>Software Development Case Studies & Client Success Stories</Heading>
                <p className="text-xl text-muted-foreground mt-4 mb-16">
                    Explore how Xenolve helps startups and enterprises build scalable web platforms, AI solutions, Shopify eCommerce systems, and custom software that deliver measurable business results. From modernizing legacy infrastructure to launching new digital products, our engineering drives real growth.
                </p>
            </Container>
            <CaseStudies />
        </div>
    );
}
