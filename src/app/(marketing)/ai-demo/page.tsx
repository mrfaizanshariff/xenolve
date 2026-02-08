'use client';

import { Metadata } from 'next';
import { AIAssistantWidget } from '@/components/features/ai-assistant-widget';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Since this is a client component for the demo (page wrapper), we can't export metadata directly if we use hooks.
// But we want SEO tags. So typically we split: page.tsx (Server) -> ClientComponent. 
// However, for simplicity in this demo, I will make the page client-side or use a client wrapper.
// Let's stick to standard Client Component pattern if we need hooks in the main view.
// Actually, the requirements asked for a "Container for the voice bot".
// I will reuse the logic from the widget or make a larger embedded version?
// The requirement says "Reusable component" but also "Demo page". 
// A floating widget is great, but a demo page usually has a larger, centered interface.
// I will create a dedicated `AIDemoView` component locally here or in features if it differs significantly.
// For now, I'll use the Widget on the page, but maybe "open by default" or a larger separate instance.
// Let's create a dedicated persistent view for the page to show off the capabilities better than just a tiny widget.

import { useState, useRef, useEffect } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { sendMessageToAI } from '@/lib/ai-client';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';

function AIDemoInterface() {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        isSupported,
        listeningState,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        speak,
        cancelSpeech
    } = useSpeech();

    useEffect(() => {
        if (listeningState === 'listening') {
            setInput(transcript);
        }
    }, [transcript, listeningState]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const text = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsProcessing(true);
        resetTranscript();

        try {
            const res = await sendMessageToAI(text);
            const answer = res.answer;
            setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
            speak(answer);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to AI." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Card className="w-full max-w-4xl min-h-[500px] flex flex-col md:flex-row overflow-hidden border-border/40 shadow-2xl bg-card/30 backdrop-blur-xl">
            {/* Left Panel: Conversation */}
            <div className="flex-1 flex flex-col p-6 border-r border-border/40">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                            <Volume2 className="h-16 w-16 mb-4" />
                            <p>Start chatting or speaking...</p>
                        </div>
                    )}
                    {messages.map((m, i) => (
                        <div key={i} className={cn("p-4 rounded-2xl max-w-[90%]", m.role === 'user' ? "ml-auto bg-primary/10 text-primary-foreground" : "bg-muted/50")}>
                            <p className={cn(m.role === 'user' ? "text-primary" : "text-foreground")}>{m.content}</p>
                        </div>
                    ))}
                    {isProcessing && (
                        <div className="p-4 bg-muted/50 rounded-2xl max-w-[80%] animate-pulse">
                            Thinking...
                        </div>
                    )}
                </div>

                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-background/50 border border-border px-4 py-3 pr-24 rounded-xl focus:ring-2 ring-primary/20 outline-none resize-none min-h-[60px]"
                        placeholder="Type or speak..."
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    />
                    <div className="absolute right-2 bottom-2 flex gap-2">
                        {isSupported && (
                            <Button
                                size="icon"
                                variant={listeningState === 'listening' ? "destructive" : "ghost"}
                                onClick={listeningState === 'listening' ? stopListening : startListening}
                                className={cn("h-10 w-10 rounded-lg", listeningState === 'listening' && "animate-pulse")}
                            >
                                {listeningState === 'listening' ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            </Button>
                        )}
                        <Button size="icon" onClick={handleSend} disabled={isProcessing || !input.trim()} className="h-10 w-10 rounded-lg">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Panel: Visualizer / Status (Hidden on mobile maybe, or stacked) */}
            <div className="hidden md:flex w-1/3 bg-background/20 items-center justify-center p-8 flex-col text-center">
                <div className={cn(
                    "w-32 h-32 rounded-full border-4 flex items-center justify-center mb-6 transition-all duration-500",
                    listeningState === 'listening' ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-110" :
                        isProcessing ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-spin" :
                            "border-muted shadow-none"
                )}>
                    {listeningState === 'listening' ? <Mic className="h-12 w-12 text-red-500" /> :
                        isProcessing ? <div className="h-12 w-12 rounded-full bg-blue-500/20" /> :
                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                    }
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    {listeningState === 'listening' ? "Listening..." : isProcessing ? "Processing..." : "Ready"}
                </h3>
                <p className="text-sm text-muted-foreground">
                    Use the microphone to ask questions about our agency.
                </p>
            </div>
        </Card>
    );
}


export default function AIDemoPage() {
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

            {/* We still include the floating widget? Or hide it on this page? 
            Common pattern is to hide floating widget if the main feature is on page.
            But user asked for "Floating AI chat widget accessible on every page".
            Let's keep it, or maybe conditionally hide. 
            For now, I'll assume users might want to navigate away and keep chatting.
            But having two on the same page is confusing.
            I will leave it up to layout.tsx injection.
        */}
        </div>
    );
}
