import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Globe, Bot, Cpu, LineChart, ShieldCheck } from "lucide-react";

const SERVICES = [
    {
        title: "Web Development",
        description: "High-performance websites and web applications built with Next.js, React, and modern architectures. Optimized for speed, SEO, and scalability.",
        icon: Globe,
    },
    {
        title: "AI & Automation",
        description: "AI agents, chatbots, and machine learning solutions that automate workflows, reduce manual effort, and improve decision-making.",
        icon: Bot,
    },
    {
        title: "Custom Software",
        description: "Tailored enterprise software, dashboards, CRMs, and internal tools designed around your exact business processes.",
        icon: Code,
    },
    {
        title: "Shopify eCommerce Development",
        description: "Conversion-focused Shopify stores, custom themes, headless commerce, and performance optimization to scale online sales.",
        icon: Cpu,
    },
    {
        title: "Data Analytics",
        description: "Business intelligence dashboards and real-time analytics that turn raw data into actionable insights.",
        icon: LineChart,
    },
    {
        title: "Native Mobile Apps",
        description: "High-quality iOS and Android applications built with react-native for seamless user experiences",
        icon: ShieldCheck,
    }
];

export function ServicesGrid() {
    return (
        <section id="services" className="py-24 bg-surface/50">
            <Container>
                <div className="text-center mb-16">
                    <Heading level={2} className="mb-4">Our Expertise</Heading>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        End-to-end software development, from strategy to deployment.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.map((service) => (
                        <Card key={service.title} className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <service.icon className="h-10 w-10 text-primary mb-4" />
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
