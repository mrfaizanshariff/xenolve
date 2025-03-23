"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Trophy, Globe, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const statsRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top center",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });

      gsap.from(".content-block", {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top center",
        },
        y: 50,
        opacity: 0,
        duration: 1,
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
            About <span className="gradient-text">Xenolve</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            
          >
            <span className="text-xl text-gray-100 mb-4 max-w-3xl mx-auto">
            Empowering Businesses & Individuals with Future-Ready Technology
            </span> 
            <p  className="text-md text-gray-400 max-w-3xl mx-auto">
            At <span className="gradient-text">XENOLVE</span>, we believe technology should be a growth enabler, not a barrier. Our mission is to provide precise, industry-grade tech solutions that businesses need to thrive in a competitive market. We don’t offer generic software; we tailor solutions that match your business’s exact requirements.
            </p>
          </motion.p>
        </div>

        {/* Stats Section */}
        {/* <div ref={statsRef} className="grid md:grid-cols-4 gap-6 mb-20">
          <StatCard icon={<Users />} number="50+" text="Team Members" />
          <StatCard icon={<Trophy />} number="200+" text="Projects Completed" />
          <StatCard icon={<Globe />} number="20+" text="Countries Served" />
          <StatCard icon={<Lightbulb />} number="15+" text="Years Experience" />
        </div> */}

        {/* Content Section */}
        <div ref={contentRef} className="content-block backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-12 mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6">
             <strong>Bringing Cutting-Edge Technology to Every Business</strong> – Whether you're a startup, an established enterprise, or a solopreneur, we help you leverage the right technology to streamline operations and increase efficiency.              </p>
              <p className="text-gray-400 mb-6">
              <strong>Making AI & Advanced Tech Accessible </strong>– AI shouldn’t be a luxury for large corporations. We aim to make AI-powered solutions available to businesses of all sizes, helping them scale effortlessly with automation and intelligent systems.              </p>
              <p className="text-gray-400">
              <strong>Educating the Next Generation of Tech Professionals </strong>– We bridge the gap between academic knowledge and real-world industry practices. Our coding education programs are designed to equip students with in-demand skills used in professional development today.</p>
            
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-400 mb-6">
              Technology should be an enabler, not an obstacle. We envision a world where every business, no matter the size, has access to the same powerful technology as the biggest enterprises.              </p>
              <p className="text-gray-400 mb-6">
              Education should create builders, not just job seekers. We want students and professionals to think like developers and innovators, understanding how technology solves real-world problems instead of just memorizing syntax.              </p>
            <p className="text-gray-400 mb-6">The future belongs to those who innovate. Our goal is to equip businesses with the right tech and empower individuals to build the next generation of digital solutions.</p>
            <p className="text-gray-400 ">At XENOLVE, we don’t just develop software—we create impact.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon, number, text }: { icon: React.ReactNode; number: string; text: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="stat-card backdrop-blur-xl bg-white/5 rounded-2xl p-6 text-center border border-white/10"
    >
      <div className="text-[#5C24FF] mb-4 flex justify-center">{icon}</div>
      <h3 className="text-3xl font-bold mb-2">{number}</h3>
      <p className="text-gray-400">{text}</p>
    </motion.div>
  );
}