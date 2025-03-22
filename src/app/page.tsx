"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Palette, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power4.out"
      });

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative grid-background">
        <div className="hero-gradient absolute inset-0" />
        <div ref={heroRef} className="container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              We Create <span className="gradient-text">Digital Experiences</span> That Matter
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Transform your brand with cutting-edge web solutions that drive growth and engagement
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5C24FF] hover:bg-[#4a1dd6] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 mx-auto"
            >
              Get Started
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 container mx-auto px-4" id="services">
        <h2 className="text-4xl font-bold text-center mb-16">
          Our <span className="gradient-text">Services</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Palette className="w-8 h-8 text-[#FF3BFF]" />}
            title="UI/UX Design"
            description="Create intuitive and engaging user experiences that convert visitors into customers."
          />
          <ServiceCard
            icon={<Code className="w-8 h-8 text-[#5C24FF]" />}
            title="Web Development"
            description="Build scalable and performant web applications using cutting-edge technologies."
          />
          <ServiceCard
            icon={<Rocket className="w-8 h-8 text-[#0096FF]" />}
            title="Digital Strategy"
            description="Develop comprehensive digital strategies to achieve your business goals."
          />
        </div>
      </section>
    </main>
  );
}

function ServiceCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="service-card bg-secondary p-8 rounded-2xl border border-gray-800"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}