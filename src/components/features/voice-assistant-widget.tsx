'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Mic } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function VoiceAssistantWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Floating Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-24 right-7 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            size="icon"
                            className=" flex h-18 w-40 p-2 rounded-3xl shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                            aria-label="Open Voice Assistant"
                        >
                            <span className="text-white text-md">
                                Try Our AI voice Agent
                            </span>
                            <Mic className="h-6 w-6 text-primary-foreground" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl h-[80vh] bg-background rounded-2xl shadow-2xl overflow-hidden border border-border"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header / Close Button */}
                            <div className="absolute top-4 right-4 z-10">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-background/50 hover:bg-background backdrop-blur-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>

                            {/* Iframe */}
                            <div className="w-full h-full bg-muted/20 relative">
                                {!isLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                )}
                                <iframe
                                    src="https://xenolve-ai-voice-agent-using-gemini2-5.onrender.com/test"
                                    className="w-full h-full border-0"
                                    allow="microphone; theme-color"
                                    onLoad={() => setIsLoaded(true)}
                                    title="Xenolve Voice Assistant"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
