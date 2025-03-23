"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookCheck, Bot, BotMessageSquareIcon, Code, Computer, Globe, Palette, Rocket, School, ShoppingBag } from 'lucide-react';

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
              Create. <span className="gradient-text">Innovate. Teach</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
            At XENOLVE, we bridge the gap between innovative technology and business success. Whether it’s AI-driven automation, e-commerce solutions, or custom software, we empower businesses to scale efficiently and thrive in the digital era.
            </p>
            <p className="text-lg gradient-text">
            Web Development | E-commerce | AI Chatbots | AI Agents | Custom Software | College Projects | Coding Education
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5C24FF] hover:bg-[#4a1dd6] text-white mt-3 px-8 py-4 rounded-full font-medium flex items-center gap-2 mx-auto"
            >
              Get Started
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 container mx-auto px-4" id="services">
        <h2 className="text-4xl font-bold text-center mb-16">
          About <span className="gradient-text">XENOLVE</span>
        </h2>
        <div className="md:flex flex-col gap-4">
        <div className='font-["normal-bold-font"] glass-card flex-1 p-8 rounded-2xl text-3xl '>
          <p className="text-gray-50">
          At
          <span className="gradient-text"> XENOLVE </span>
          we believe technology should be accessible to all businesses—from startups to enterprises. Our team of experienced developers, AI engineers, and educators is committed to pushing the boundaries of innovation and delivering cutting-edge solutions that solve real-world problems.
          </p>

        </div>
        <div className="glass-card p-8 rounded-2xl flex flex-[0.7] flex-col justify-around text-lg ">
          <p className="text-gray-400"> <span className="gradient-text">Our Vision: </span> To make businesses smarter, faster, and more efficient with future-ready technology.</p>
          <h3 className="text-xl font-bold mb-2">Why Choose Us?</h3>
          <ul>
            {
              [
                {
                  text:"✔ Industry Experts in AI & Software Development"

                },
                {
                  text:"✔ Scalable & Future-Proof Solutions"
                },
                {
                  text:"✔ Transparent Communication & Support"
                },
                {
                  text:"✔ Affordable & Customizable Pricing"
                }
              ].map((item,i)=>
              <li key={i}>{item.text}</li>)
            }
          </ul>
        </div>
        </div>  
        
      </section>
      {/* Services Section */}
      <section  className="py-20 container mx-auto px-4" id="services">
        <h2 className="text-4xl font-bold text-center mb-16">
          Our <span className="gradient-text">Services</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {
            [
              {
                icon:Globe,iconClass:"w-8 h-8 text-[#FF3BFF]" , title:'Web Development ',description:'Fast, secure, and scalable websites tailored for your brand.',
              },
              {
                icon:ShoppingBag,iconClass:"w-8 h-8 text-[#FF3BFF]" , title:'E-commerce Solutions',description:'Seamless online stores with top-tier user experience and conversions.',
              },
              {
                icon:Computer,iconClass:"w-8 h-8 text-[#FF3BFF]" , title:'Custom Software Development ',description:'Business-specific software solutions to streamline operations.',
              },
              {
                icon:Bot,iconClass:"w-8 h-8 text-[#FF3BFF]" , title:' AI Chatbots & AI Agents ',description:'Intelligent, conversational AI to enhance customer support and automation.',
              },
              {
                icon:BotMessageSquareIcon,iconClass:"w-8 h-8 text-[#FF3BFF]" , title:'AI-Based Software ',description:' Leverage artificial intelligence to optimize business efficiency and decision-making.',
              },
              {
                icon:BookCheck,iconClass:"w-8 h-8 text-[#FF3BFF]" , title:'College Projects  ',description:'High-quality academic projects backed by industry expertise.',
              },
              {
                icon:School,iconClass:"w-8 h-8 text-[#FF3BFF]" , title:'Coding Education ',description:'Learn to build real-world applications with our expert coding programs.',
              },
            ].map((service,index) =>
              <div key={index} className='glass-card  p-8 rounded-2xl'>
                <div className="mb-6">
                  <service.icon className={`${service.iconClass}`} />
                  </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>)
          }
          
        </div>
      </section>
    </main>
  );
}

{/* function ServiceCard({
  icon,
  title,
  description
}: {
  icon: any;
  title: string;
  classname:string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="service-card glass-card  p-8 rounded-2xl "
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
} */}