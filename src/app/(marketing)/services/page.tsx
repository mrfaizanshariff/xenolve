import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ServicesGrid } from "@/components/sections/services-grid";

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
