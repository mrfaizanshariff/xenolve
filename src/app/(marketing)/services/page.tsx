import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Xenolve",
    description: "End-to-end software development services: Custom Web Apps, AI Agents, Shopify Development, Mobile Apps, and Technical Consulting.",
};

export default function ServicesPage() {
    return (
        <div className="py-20">
            <Container className="mb-16">
                <Heading level={1}>Our Services</Heading>
                <p className="text-xl text-muted-foreground mt-4">
                    Comprehensive digital solutions for modern businesses.
                </p>
            </Container>
            <ServicesGrid />
        </div>
    );
}
