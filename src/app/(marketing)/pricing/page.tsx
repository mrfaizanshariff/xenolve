import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Pricing } from "@/components/sections/pricing";

export default function PricingPage() {
    return (
        <div className="py-20">
            <Container>
                <Heading level={1} className="text-center">Pricing Plans</Heading>
                <p className="text-xl text-muted-foreground text-center mt-4 mb-16">
                    Transparent pricing for teams of all sizes.
                </p>
            </Container>
            <Pricing />
        </div>
    );
}
