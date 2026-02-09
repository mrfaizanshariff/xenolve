import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TIERS = [
    {
        name: "E-Commerce Development",
        price: "$1,500",
        description: "For businesses looking to sell products online.",
        popular: true,
        features: [
            "Shopify Setup",
            "Product Listing",
            "Payment Gateway Integration",
            "Custom Theme Development",
            "Performance Optimization",
            "Analytics Dashboard",
            "3 Months Support"
        ],
    },
    {
        name: "Web Development",
        price: "$2,000",
        popular: true,
        description: "Perfect for startups launching MVPs, small businesses, and personal websites.",
        features: [
            "Unlimited Pages",
            "Custom Web Design",
            "Mobile Responsive",
            "Basic SEO Setup",
            "CMS Integration",
            "1 Month Support"
        ],
    },

    {
        name: "Mobile App Development",
        price: "$3,000",
        popular: true,
        description: "For businesses looking to build a mobile app.",
        features: [
            "Native iOS & Android",
            "Custom App Design",
            "Push Notifications",
            "In-App Purchases",
            "App Store Submission",
            "3 Months Support"
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        popular: true,
        description: "Dedicated engineering teams, AI solutions, Shopify scale, and mission-critical software.",
        features: [
            "Everything in Growth",
            "Custom AI Solutions",
            "Enterprise Security",
            "Dedicated Project Manager",
            "SLA Support",
            "Cloud Infrastructure"
        ],
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-surface/30">
            <Container>
                <div className="text-center mb-16">
                    <Heading level={2} className="mb-4">Transparent Engagement Models</Heading>
                    <p className="text-muted-foreground">Flexible pricing for startups, growth companies, and enterprises.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {TIERS.map((tier) => (
                        <Card key={tier.name} className={`relative flex flex-col ${tier.popular ? 'border-primary shadow-lg scale-105 z-10' : ''}`}>
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge variant="default" className="bg-primary text-primary-foreground">Starting at</Badge>
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-xl">{tier.name}</CardTitle>
                                <div className="mt-4 flex items-baseline text-3xl font-bold">
                                    {tier.price}
                                    {tier.price !== "Custom" && <span className="ml-1 text-sm font-medium text-muted-foreground">/project</span>}
                                </div>
                                <CardDescription className="mt-2 text-sm">{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <Check className="mr-2 h-4 w-4 text-primary shrink-0" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                                    {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
