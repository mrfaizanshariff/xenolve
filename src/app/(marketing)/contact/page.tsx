"use client"
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        subject: '',
        message: ''
    });


    const [messageText, setMessageText] = useState("Send Message")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        setMessageText("Sending...")
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "3f012b44-c25f-46af-a928-a3f36713290f",
                name: formData.name,
                email: formData.email,
                message: formData.message,
                subject: "Leads From Xenolve.com",
            }),
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
            setMessageText("Send Message")
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                number: '',
            })
        }
        console.log(formData);
        setMessageText("Send Message")
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            number: '',
        })
    };
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
                                <Input id="name" type="text" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" required={true} value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="number" className="text-sm font-medium">Number</label>
                                <Input id="number" type="number" required={true} value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="1234567890" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Tell us about your project..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <Button size="lg" onClick={handleSubmit} className="w-full">{messageText}</Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
