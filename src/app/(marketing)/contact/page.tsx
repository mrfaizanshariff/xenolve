import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ContactForm } from "@/components/sections/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Xenolve",
    description: "Get in touch with Xenolve for your software development and AI needs. Let's build something great together.",
};

export default function ContactPage() {
    return (
        <div className="py-20">
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
