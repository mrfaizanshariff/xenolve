"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce platform built with Next.js and Shopify",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    title: "Banking App",
    category: "Mobile Development",
    description: "Secure and intuitive mobile banking application",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    title: "Healthcare Platform",
    category: "Web Application",
    description: "Telemedicine platform connecting patients with healthcare providers",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    title: "Real Estate Portal",
    category: "Web Development",
    description: "Property listing and management platform",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

export default function Work() {
  const projectsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: projectsRef.current,
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
            Our <span className="gradient-text">Work</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Showcasing our latest projects and digital innovations
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 text-center border border-white/10">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your digital vision to life. Our team is ready to help you create something amazing.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#5C24FF] hover:bg-[#4a1dd6] text-white px-8 py-4 rounded-full font-medium inline-flex items-center gap-2"
          >
            Get in Touch
            <ExternalLink size={20} />
          </motion.button>
        </div>
      </div>
    </main>
  );
}

function ProjectCard({ 
  title, 
  category, 
  description, 
  image, 
  link 
}: { 
  title: string; 
  category: string; 
  description: string; 
  image: string; 
  link: string;
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="project-card backdrop-blur-xl bg-white/5 rounded-2xl overflow-hidden border border-white/10"
    >
      <div className="relative h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-8">
        <div className="text-sm text-[#5C24FF] mb-2">{category}</div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        <a 
          href={link}
          className="inline-flex items-center gap-2 text-white hover:text-[#5C24FF] transition-colors"
        >
          View Project <ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
}