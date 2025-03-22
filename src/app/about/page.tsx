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
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            We're a team of innovators, designers, and developers passionate about creating digital experiences that transform businesses.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid md:grid-cols-4 gap-6 mb-20">
          <StatCard icon={<Users />} number="50+" text="Team Members" />
          <StatCard icon={<Trophy />} number="200+" text="Projects Completed" />
          <StatCard icon={<Globe />} number="20+" text="Countries Served" />
          <StatCard icon={<Lightbulb />} number="15+" text="Years Experience" />
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="content-block backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-12 mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-400 mb-6">
                To be the catalyst for digital transformation, empowering businesses to thrive in the digital age through innovative solutions and cutting-edge technology.
              </p>
              <p className="text-gray-400">
                We believe in pushing boundaries and challenging the status quo to deliver exceptional results that drive real business value.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
              <p className="text-gray-400 mb-6">
                We combine strategic thinking with technical expertise to create solutions that are not just beautiful but also highly functional and scalable.
              </p>
              <p className="text-gray-400">
                Our agile methodology ensures transparent communication and rapid delivery while maintaining the highest quality standards.
              </p>
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