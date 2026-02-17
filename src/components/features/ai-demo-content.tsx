"use client";

import { motion } from 'framer-motion';
import { AIDemoInterface } from './ai-demo-interface';

export function AIDemoContent() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            Experience our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI Voice Agent</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Interact with our intelligent assistant powered by Gemini 2.5. Ask about our services, case studies, or just say hello using your voice.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center"
                >
                    <AIDemoInterface />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12">
                    {[
                        { title: "Voice & Text", desc: "Seamlessly switch between voice commands and text input." },
                        { title: "Context Aware", desc: "Understand conversational context for better replies." },
                        { title: "Real-time", desc: "Low latency responses powered by advanced edge computing." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                        >
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
