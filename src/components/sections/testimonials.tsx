import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

// Need Avatar component, will use simple div fallback for now if not available or implement it rapidly.
// Check if Avatar is available in ui/avatar.tsx? No, I haven't implemented it.
// I will implement a basic avatar usage here or create the component.
// I'll assume I need to create src/components/ui/avatar.tsx or just inline it for now to save steps.
// Better: Create src/components/ui/avatar.tsx in the next step or alongside this.

const TESTIMONIALS = [
    {
        quote: "Xenolve didn't just build a website; they re-engineered our entire digital strategy. The results were immediate.",
        author: "Sarah J.",
        role: "CTO, TechFlow",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
        quote: "Their expertise in AI integration saved us hundreds of hours in manual processing. Highly recommended.",
        author: "Michael C.",
        role: "Founder, DataStream",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
        quote: "Professional, scalable, and future-proof code. The best engineering team we've worked with.",
        author: "Emily R.",
        role: "VP Product, CloudScale",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-surface text-center">
            <Container>
                <Heading level={2} className="mb-16">Trusted by Founders, CTOs & Product Teams</Heading>
                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <Card key={i} className="border-none shadow-none bg-transparent">
                            <CardContent className="flex flex-col items-center">
                                <Quote className="h-8 w-8 text-primary/40 mb-6" />
                                <p className="text-lg font-medium mb-6 italic">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                                        <img src={t.avatar} alt={t.author} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-sm">{t.author}</div>
                                        <div className="text-xs text-muted-foreground">{t.role}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
