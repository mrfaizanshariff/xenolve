import { Container } from "@/components/ui/container";

const LOGOS = [
    { name: "Thread Drop", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" }, // Placeholder URLs
    { name: "Lemon", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" },
    { name: "Son of Adam", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png" },
    { name: "Quran By Emaan", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
    { name: "DarSas", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Lightech", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
    { name: "Hidden Shire", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
];

export function Logos() {
    return (
        <section className="border-y bg-muted/40 py-12">
            <Container>
                <p className="text-center capitalize text-sm font-medium text-muted-foreground mb-8">
                    Trusted by innovative teams and fast-growing businesses worldwide
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 grayscale opacity-70">
                    {LOGOS.map((logo) => (
                        <div key={logo.name} className="flex items-center justify-center">
                            {/* Using text for now as placeholders if images fail, but structure is ready for img tags */}
                            <span className="text-xl font-bold text-muted-foreground/50">{logo.name}</span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
