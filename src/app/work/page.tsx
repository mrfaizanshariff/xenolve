"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);


const projects = [
  {
    title: "Drone Light Show | 3D Projection Mapping company ",
    category: "Web Development",
    description: "Brand Website completely built in HTML,CSS and JavaScript without any frameworks",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://studiotrika.com/"
  },
  {
    title: "Dynamic Real-estate Company",
    category: "Web Development",
    description: "Brand Website built in WordPress and conversational Chat-bot",
    image: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://vibezestates.com/"
  },
  {
    title: "A Jungle Resort",
    category: "Web Development, Web Design",
    description: "Brand Website built in NextJs",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://wildearthjunglecamp.com/"
  },
  {
    title: "A Financial Services Company Based In Dubai",
    category: "Web Application",
    description: "Brand Website Built in Angular-16, Website Design, Website Content",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.gulfex.co/"
  },
  {
    title: "A Premium Clothing Brand",
    category: "E-Commerce Development",
    description: "End to end E-commerce website built in custom shopify theme along with email and whatsapp marketing",
    image: "https://images.unsplash.com/photo-1614231125961-38323d6c485b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://wwww.threaddrop.in/"
  },
  {
    title: "WhatsApp Bot to handle delivery",
    category: "Custom Software Development",
    description: "We Built a custom whatsapp bot that handles delivery system by giving the delivery personnel the customer details (location,orderId,contact,Image) when the delivery personnel sends a message to the Bot",
    image: "https://images.unsplash.com/photo-1633675254245-efd890d087b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/work"
  },
  {
    title: "Order Management System",
    category: "Custom Software Development",
    description: "We built a custom software in NextJs to handle very specific features for a booking system applicaion",
    image: "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/work"
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
            <Link href="/contact">
            
            Get in Touch
            
            </Link>
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
        <Link 
          href={link}
          target='_blank'
          className="inline-flex items-center gap-2 text-white hover:text-[#5C24FF] transition-colors"
        >
          View Project <ExternalLink size={18} />
        </Link>
      </div>
    </motion.div>
  );
}