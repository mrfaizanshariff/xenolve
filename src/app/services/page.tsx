"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Rocket, 
  Globe, 
  Smartphone, 
  Shield, 
  LineChart,
  Cloud,
  Search,
  Code2,
  ShoppingCart,
  BotMessageSquareIcon,
  BotMessageSquare,
  BrainCircuit
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top center",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Our <span className="gradient-text">Services</span>
            <p className='text-2xl md:text-4xl font-bold my-2'>Empowering Businesses with Smart, Scalable, and AI-Driven Solutions</p>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
          At <span className='gradient-text'> XENOLVE</span>, we specialize in custom-built digital solutions that enhance efficiency, boost productivity, and drive business growth. Whether you're an entrepreneur, a growing business, or a student looking to learn industry-grade tech, we’ve got you covered.          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {
            [
              {
                title:" Web Development",
                icon:Code2,
                subTitle:"– Scalable & High-Performance Websites",
                desc:"We create fast, secure, and user-friendly websites that help businesses establish a strong online presence.",
                features:[
                  "Custom Websites (Portfolio, Business, Landing Pages)",
                  "Scalable Web Applications (Dashboard, SaaS, CRM)",
                  "Progressive Web Apps (PWA) for mobile-like experience",
                  "SEO Optimization & Speed Enhancement",
                  "Maintenance & Performance Monitoring"
                ]
              },
              {
                title:"Custom Software Development",
                icon:Code,
                subTitle:" – Tailor-Made Solutions for Your Business",
                desc:"We don’t sell generic software—we build solutions that fit your business like a glove",
                features:[
                  "Enterprise Software (CRM, ERP, HRMS)",
                  "Booking & Scheduling Systems",
                  "Inventory & Warehouse Management",
                  "AI-driven Automation for Business Processes",
                  "Custom Dashboard & Reporting Systems"
                ]
              },
              {
                title:"E-commerce Solutions",
                icon:ShoppingCart,
                subTitle:"– Sell Smart, Scale Fast",
                desc:"We build seamless online stores with a focus on conversions, user experience, and automation.",
                features:[
                  "Shopify Development & Customization",
                  "Headless E-commerce (Shopify + Angular, React, Vue)",
                  "Payment Gateway & Order Management System",
                  "AI-powered Product Recommendations & Chatbots",
                  "Multi-vendor Marketplaces & Subscription Models"
                ]
              },
              {
                title:"AI Chatbots & AI Agents",
                icon:BotMessageSquare,
                subTitle:"–  Automate Customer Support & Operations",
                desc:"We develop smart AI chatbots and virtual assistants that can handle customer interactions, automate tasks, and save you time.",
                features:[
                  "AI Chatbots for WhatsApp, Websites & Social Media",
                  "Voice Assistants & NLP-based Virtual Agents",
                  "AI-Powered Support & Lead Generation Bots",
                  "Integration with CRM, E-commerce & Business Tools",
                  "Self-Learning AI Agents that Improve Over Time"
                ]
              },
              {
                title:" AI-Based Software",
                icon:BrainCircuit,
                subTitle:"– Smart Technology for Smarter Businesses",
                desc:"We integrate Artificial Intelligence into business operations, enabling automation, analytics, and data-driven decision-making.",
                features:[
                  "AI-powered Data Analytics & Forecasting",
                  "Machine Learning Solutions for Process Automation",
                  "AI-driven Content & Image Generation Tools",
                  "Smart Recommendation Systems for E-commerce & Media",
                  "Personalized AI Assistants for Business Growth"
                ]
              },
              {
                title:" College Projects & Final-Year Assistance",
                icon:Code2,
                subTitle:"– Industry-Grade Academic Projects",
                desc:"We help students build real-world tech projects that impress professors and recruiters alike.",
                features:[
                  "Final-Year Projects in AI, Web Dev, Mobile Apps, Blockchain",
                  "Project Documentation & Code Explanation",
                  "Hands-on Guidance & Mentorship",
                  "Custom Research-Based Tech Solutions",
                  "Interview & Placement Assistance for IT Jobs"
                ]
              },
              {
                title:"Coding Education & Industry Training",
                icon:Code2,
                subTitle:"– Learn What the Industry Uses",
                desc:"We teach real-world coding skills, preparing students and professionals to build applications that are actually used in the industry.",
                features:[
                  "Frontend Development: HTML, CSS, JavaScript, TypeScript, Angular, React",
                  "Backend Development: Node.js, Firebase, APIs, Databases",
                  "AI & Machine Learning: Python, TensorFlow, NLP, AI Chatbot Development",
                  "E-commerce & SaaS Development",
                  "Project-Based Learning with Hands-on Coding"
                ]
              },
            ].map((service,index)=>
              <motion.div 
              whileHover={{ y: -5 }}
              className="service-card backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10"
            >
              <div className="text-[#5C24FF] mb-6"><service.icon/></div>
              <h3 className="text-2xl font-bold mb-4">{service.title}<span className="text-lg text-gray-300 font-bold mb-4">{service.subTitle}</span></h3>
              <p className="text-gray-400 mb-6">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5C24FF]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>)
          }
        </div>
        

        {/* Process Section */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep
              number="01"
              title="Discovery"
              description="Understanding your business needs and objectives"
            />
            <ProcessStep
              number="02"
              title="Strategy"
              description="Developing a comprehensive plan and approach"
            />
            <ProcessStep
              number="03"
              title="Development"
              description="Implementing solutions with agile methodology"
            />
            <ProcessStep
              number="04"
              title="Launch"
              description="Deploying and optimizing for success"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function ServiceCard({ 
  icon, 
  title, 
  description,
  features 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  features: string[];
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="service-card backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10"
    >
      <div className="text-[#5C24FF] mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#5C24FF]" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold gradient-text mb-4">{number}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}