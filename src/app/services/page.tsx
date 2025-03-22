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
  Search
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
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Comprehensive digital solutions tailored to transform your business and drive growth
          </motion.p>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid md:grid-cols-3 gap-8 mb-20">
          <ServiceCard
            icon={<Code />}
            title="Web Development"
            description="Custom web applications built with cutting-edge technologies for optimal performance and scalability."
            features={[
              "Full-stack Development",
              "API Integration",
              "Progressive Web Apps",
              "E-commerce Solutions"
            ]}
          />
          <ServiceCard
            icon={<Palette />}
            title="UI/UX Design"
            description="User-centered design solutions that create engaging and intuitive digital experiences."
            features={[
              "User Research",
              "Interface Design",
              "Prototyping",
              "Design Systems"
            ]}
          />
          <ServiceCard
            icon={<Smartphone />}
            title="Mobile Development"
            description="Native and cross-platform mobile applications that deliver exceptional user experiences."
            features={[
              "iOS Development",
              "Android Development",
              "React Native",
              "Flutter"
            ]}
          />
          <ServiceCard
            icon={<Cloud />}
            title="Cloud Solutions"
            description="Scalable cloud infrastructure and services for modern digital operations."
            features={[
              "Cloud Migration",
              "DevOps",
              "Serverless Architecture",
              "Cloud Security"
            ]}
          />
          <ServiceCard
            icon={<Shield />}
            title="Cybersecurity"
            description="Comprehensive security solutions to protect your digital assets and data."
            features={[
              "Security Audits",
              "Penetration Testing",
              "Compliance",
              "Security Training"
            ]}
          />
          <ServiceCard
            icon={<Search />}
            title="Digital Marketing"
            description="Strategic digital marketing solutions to boost your online presence and reach."
            features={[
              "SEO Optimization",
              "Content Strategy",
              "Social Media",
              "Analytics"
            ]}
          />
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