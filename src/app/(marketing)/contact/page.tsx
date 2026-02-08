import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="py-20">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <Heading level={1} className="mb-4">Contact Us</Heading>
                    <p className="text-xl text-muted-foreground mb-8">
                        Let's discuss your next project.
                    </p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input id="name" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Tell us about your project..."
                            />
                        </div>

                        <Button size="lg" className="w-full">Send Message</Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
