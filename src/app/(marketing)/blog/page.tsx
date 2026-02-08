import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function BlogPage() {
    return (
        <div className="py-20">
            <Container>
                <Heading level={1}>Latest Insights</Heading>
                <p className="text-xl text-muted-foreground mt-4 mb-16">
                    Thoughts on technology, design, and business.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-12 border rounded-xl bg-muted/20 text-center text-muted-foreground col-span-full">
                        Blog posts coming soon...
                    </div>
                </div>
            </Container>
        </div>
    );
}
