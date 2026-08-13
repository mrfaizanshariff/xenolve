import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Metadata } from "next";
import { buildBreadcrumbSchema, ldJson } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Software Development & AI Services",
    description: "End-to-end software development services from Xenolve: custom web applications, AI agents, Shopify eCommerce, mobile apps, and technical consulting.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Software Development & AI Services | Xenolve",
        description: "Custom software, AI agents, Shopify eCommerce, mobile apps, technical consulting.",
        url: "/services",
    },
};

const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
]);

export default function ServicesPage() {
    return (
        <div className="py-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(breadcrumb)} />
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
