"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute w-[500px] h-[500px] -right-48 -bottom-48 rounded-full bg-[#5C24FF] blur-[128px] opacity-20" />
        <div className="absolute w-[500px] h-[500px] -left-48 -bottom-48 rounded-full bg-[#FF3BFF] blur-[128px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="text-2xl font-bold gradient-text mb-6 block">
              Xenolve
            </Link>
            <p className="text-gray-400 mb-6">
              Transforming ideas into digital reality. We create innovative solutions that drive business growth.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <FooterLink href="/services">Web Development</FooterLink>
              <FooterLink href="/services">UI/UX Design</FooterLink>
              <FooterLink href="/services">Mobile Development</FooterLink>
              <FooterLink href="/services">Cloud Solutions</FooterLink>
              <FooterLink href="/services">Digital Marketing</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/work">Our Work</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#5C24FF]" />
                hello@xenolve.com
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#5C24FF]" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#5C24FF]" />
                123 Innovation Street,<br />Tech City, TC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Xenolve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-400 hover:text-white transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#5C24FF] transition-colors duration-200"
    >
      {icon}
    </motion.a>
  );
}