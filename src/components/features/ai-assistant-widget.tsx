'use client';

import { useState, useRef, useEffect } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { sendMessageToAI } from '@/lib/ai-client';
// import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function AIAssistantWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
        isSupported,
        listeningState,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        speak,
        cancelSpeech,
        error: speechError
    } = useSpeech();

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    // Handle transcript updates from voice input
    useEffect(() => {
        if (listeningState === 'listening' && transcript) {
            setInputValue(transcript);
        }
    }, [transcript, listeningState]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue;
        setInputValue('');
        resetTranscript(); // Clear speech transcript if any

        // Add user message to UI
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);
        // trackEvent('ai_message_sent', { type: 'text' }); // or voice if applicable, but we send text content

        try {
            const response = await sendMessageToAI(userMessage);

            const assistantMessage = response.answer;
            setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);

            // Auto-play audio if available or TTS
            if (response.audio) {
                // Play returned audio blob/url
                const audio = new Audio(response.audio);
                audio.play();
            } else {
                // Fallback to browser TTS
                speak(assistantMessage);
            }

            // trackEvent('ai_message_received');

        } catch (error) {
            console.error('Error sending message:', error);
            // trackEvent('ai_error', { message: 'Failed to send/receive' });
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleListening = () => {
        if (listeningState === 'listening') {
            stopListening();
        } else {
            startListening();
            // trackEvent('ai_demo_start', { method: 'voice' });
            // If we stop listening manually, let's not auto-send yet, just fill input.
            // Or we can implement auto-send on silence logic in hook. 
            // For this widget, explicit send is safer for UX unless using advanced VAD.
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-24 right-6 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            size="icon"
                            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                            aria-label="Open AI Assistant"
                        >
                            <Mic className="h-6 w-6 text-primary-foreground" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] shadow-2xl"
                    >
                        <Card className="flex flex-col h-full border-primary/20 shadow-xl overflow-hidden glass-morphism">
                            <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary/5 border-b border-border/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <CardTitle className="text-sm font-medium">Xenolve AI Assistant</CardTitle>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-background/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>

                            <CardContent className="flex-1 p-0 overflow-hidden bg-background/50 backdrop-blur-sm">
                                <ScrollArea className="h-full p-4">
                                    <div className="flex flex-col gap-4">
                                        {messages.length === 0 && (
                                            <div className="text-center text-muted-foreground text-sm my-8">
                                                <p>How can I help you regarding Xenolve?</p>
                                                <p className="mt-2 text-xs">Try asking about our services or case studies.</p>
                                            </div>
                                        )}

                                        {messages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    "flex w-full",
                                                    msg.role === 'user' ? "justify-end" : "justify-start"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                                        msg.role === 'user'
                                                            ? "bg-primary text-primary-foreground rounded-br-sm"
                                                            : "bg-muted text-foreground rounded-bl-sm"
                                                    )}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}

                                        {isLoading && (
                                            <div className="flex justify-start w-full">
                                                <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce delay-0" />
                                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce delay-150" />
                                                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce delay-300" />
                                                </div>
                                            </div>
                                        )}
                                        {/* Invisible div to scroll to */}
                                        <div ref={scrollRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>

                            <CardFooter className="p-3 bg-background border-t border-border/50">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                    className="flex w-full items-center gap-2"
                                >
                                    {isSupported && (
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant={listeningState === 'listening' ? "destructive" : "secondary"}
                                            className={cn(
                                                "rounded-full transition-all",
                                                listeningState === 'listening' && "animate-pulse"
                                            )}
                                            onClick={toggleListening}
                                            title={listeningState === 'listening' ? "Stop Recording" : "Start Recording"}
                                        >
                                            {listeningState === 'listening' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                        </Button>
                                    )}

                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 rounded-full bg-background/50 focus:bg-background transition-colors"
                                        disabled={isLoading || listeningState === 'listening'}
                                    />

                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={!inputValue.trim() || isLoading}
                                        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
