import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Stats } from "@/components/sections/stats";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Xenolve | Premium Software & AI Agency",
    description: "Xenolve is a full-stack digital agency building scalable web apps, AI solutions, and enterprise software. Learn about our team and mission.",
};

export default function AboutPage() {
    return (
        <div className="py-20">
            {/* <Container>
                <Heading level={1}>About Xenolve</Heading>
                <Heading level={5}>A Premium Software Development & AI Engineering Agency</Heading>
                <p className="text-xl text-muted-foreground mt-4 mb-12 max-w-5xl">
                    Xenolve is a full-stack software development company helping startups, scaleups, and enterprises design, build, and scale custom web applications, AI solutions, Shopify eCommerce platforms, and mobile apps. We combine engineering excellence with business strategy to deliver measurable digital growth.
                </p>

            </Container> */}
            <section id="about-us" className="py-24 bg-surface/50">
                <Container>
                    <div className="text-center mb-16">
                        <Heading level={2}>We Build Software That Moves Businesses Forward</Heading>
                    </div>
                    <p className="text-xl  mt-4 mb-12 max-w-5xl">
                        Xenolve was founded with a simple belief — great software should solve real business problems, not just look impressive.
                        <br /><br />
                        While many agencies focus on design alone, we focus on <strong>engineering depth, scalability, and long-term performance</strong>. Every solution we build is crafted to handle growth, integrate seamlessly with your ecosystem, and deliver measurable ROI.
                        <br /><br />
                        From custom software and AI automation to Shopify commerce and mobile applications, we help companies turn complex ideas into reliable digital products used by thousands — and often millions — of users.
                    </p>
                </Container>
            </section>
            {/* <Stats /> */}
            <section id="services" className="py-24 bg-surface/50">
                <Container>
                    <div className="text-center mb-16">
                        <Heading level={2}>Our Expertise</Heading>
                    </div>
                    <p className="text-xl  mt-4 mb-12 max-w-5xl">
                        We provide end-to-end software development services designed for modern businesses:

                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 list-none">
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Custom Software Development
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Web Application Development (Next.js, React, full-stack)
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            AI & Automation Solutions (AI agents, chatbots, ML systems)
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Shopify eCommerce Development & Headless Commerce
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Native Mobile App Development (iOS & Android)
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Product Strategy & Technical Consulting
                        </li>
                    </ul>
                    <p className="text-xl  mt-4 mb-12 max-w-5xl">
                        Whether you need to launch a new product or modernize legacy systems, we deliver solutions that are secure, scalable, and future-ready.</p>
                </Container>
            </section>
            {/* </Container>
            </section > */}

            {/* Team Section */}
            < section className="py-24 border-t border-border/50" >
                <Container>
                    <div className="mb-12">
                        <Heading level={2}>Meet Our Team</Heading>
                        <p className="text-xl text-muted-foreground mt-4 max-w-3xl">
                            The minds behind Xenolve. We are a distributed team of engineers, designers, and strategists.
                        </p>
                    </div>

                    <div className="relative w-full overflow-hidden">
                        {/* Blur edges for scroll indication */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                        <div className="flex overflow-x-auto pb-8 gap-8 px-4 snap-x snap-mandatory scrollbar-hide no-scrollbar -mx-4 md:mx-0">
                            {TEAM_MEMBERS.map((member, index) => (
                                <div key={index} className="flex-none w-[280px] snap-center group">
                                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/30 border border-border/50 hover:border-primary/50 transition-colors">
                                        <div className="relative mb-6">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shine-effect">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rounded-full flex items-center justify-center border border-border">
                                                <span className="text-lg">💼</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold">{member.name}</h3>
                                        <p className="text-primary font-medium text-sm mt-1">{member.role}</p>
                                        <p className="text-muted-foreground text-sm mt-3 line-clamp-3">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section >
        </div >
    );
}

const TEAM_MEMBERS = [
    {
        name: "Faizan Shariff",
        role: "Founder & Lead Software Engineer",
        image: "/faizanDp.jpg",
        bio: "Full-stack architect with a passion for scalable systems and AI integration. Previously built solutions for fintech and healthcare."
    },
    {
        name: "Mohammed Maaz",
        role: "Founder & Lead AI Engineer",
        image: "/maazDp.png",
        bio: "Full-stack architect with a passion for scalable systems and AI integration. Previously built solutions for fintech and healthcare."
    },
    // {
    //     name: "Marcus Johnson",
    //     role: "Senior AI Engineer",
    //     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    //     bio: "Specialist in LLMs and computer vision. Transforming complex AI research into practical business applications."
    // },
    // {
    //     name: "Elena Rodriguez",
    //     role: "Mobile Lead",
    //     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    //     bio: "Mobile development expert with 10+ years of experience in iOS and React Native ecosystems."
    // },
    // {
    //     name: "David Kim",
    //     role: "Backend Architect",
    //     image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80",
    //     bio: "Building robust cloud infrastructure and microservices that power high-traffic applications."
    // },
];
