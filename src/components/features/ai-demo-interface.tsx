"use client";

import { useState, useRef, useEffect } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { sendMessageToAI } from '@/lib/ai-client';
// import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AIDemoInterface() {
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
