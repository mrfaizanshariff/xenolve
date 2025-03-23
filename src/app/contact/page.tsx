"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  
  const [messageText,setMessageText] = useState("Send Message")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setMessageText("Sending...")
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify({
          access_key: "3f012b44-c25f-46af-a928-a3f36713290f",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Leads From Xenolve.com",
      }),
  });
  const result = await response.json();
  if (result.success) {
      console.log(result);
      setMessageText("Send Message")
      setFormData({ name: '',
    email: '',
    subject: '',
    message: ''})
  }
    console.log(formData);
    setMessageText("Send Message")
    setFormData({ name: '',
    email: '',
    subject: '',
    message: ''})
  };

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
            Let's <span className="gradient-text">Connect</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Ready to transform your digital presence? We're here to help bring your vision to life.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <ContactInfo icon={<Mail />} title="Email" info="admin@xenolve.com" />
                <ContactInfo icon={<Phone />} title="Phone" info="+91 7338006388" />
                <ContactInfo icon={<MapPin />} title="Location" info="India" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#5C24FF] focus:ring-1 focus:ring-[#5C24FF] transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#5C24FF] focus:ring-1 focus:ring-[#5C24FF] transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#5C24FF] focus:ring-1 focus:ring-[#5C24FF] transition-colors"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#5C24FF] focus:ring-1 focus:ring-[#5C24FF] transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#5C24FF] hover:bg-[#4a1dd6] text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {messageText}
                <Send size={18} />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  );
}

function ContactInfo({ icon, title, info }: { icon: React.ReactNode; title: string; info: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-[#5C24FF]">{icon}</div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-gray-400">{info}</p>
      </div>
    </div>
  );
}