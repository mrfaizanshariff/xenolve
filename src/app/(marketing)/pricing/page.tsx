import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Pricing } from "@/components/sections/pricing";
import { Metadata } from "next";
import { buildBreadcrumbSchema, ldJson } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Pricing — Software Development & AI Engagement Plans",
    description: "Transparent pricing for Xenolve's software development and AI engineering engagements. Choose the plan that fits your team, project scope, and budget.",
    alternates: { canonical: "/pricing" },
    openGraph: {
        title: "Pricing — Software Development & AI Engagement Plans | Xenolve",
        description: "Transparent engagement pricing for AI agents, custom software, and eCommerce projects.",
        url: "/pricing",
    },
};

const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
]);

export default function PricingPage() {
    return (
        <div className="py-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(breadcrumb)} />
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
