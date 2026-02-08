import { Container } from "@/components/ui/container";

const STATS = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Team Experts" },
    { value: "10M+", label: "Users Impacted" },
];

export function Stats() {
    return (
        <section className="py-20 border-y bg-background">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((stat) => (
                        <div key={stat.label}>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
