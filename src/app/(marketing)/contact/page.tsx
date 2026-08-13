import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ContactForm } from "@/components/sections/contact-form";
import { Metadata } from "next";
import { buildBreadcrumbSchema, ldJson } from "@/lib/seo";
import { SITE_CONFIG, CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Contact Xenolve",
    description: "Get in touch with Xenolve for AI agents, custom software, Next.js applications, and Shopify eCommerce projects. Based in Bengaluru, serving India, Middle East, and global clients.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact Xenolve",
        description: "Get in touch with Xenolve for AI agents, custom software, and eCommerce projects.",
        url: "/contact",
    },
};

const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
]);

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}#localbusiness`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/xenolveLogoBg.png`,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    description: SITE_CONFIG.description,
    address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
    },
    areaServed: ["IN", "AE", "SA", "US", "GB"],
    sameAs: [SOCIAL_LINKS.twitter, SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    priceRange: "$$",
};

export default function ContactPage() {
    return (
        <div className="py-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(breadcrumb)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(localBusinessSchema)} />
            <Container>
                <div className="max-w-2xl mx-auto">
                    <Heading level={1} className="mb-4">Contact Us</Heading>
                    <p className="text-xl text-muted-foreground mb-8">
                        Let's discuss your next project.
                    </p>
                    <ContactForm />
                </div>
            </Container>
        </div>
    );
}
