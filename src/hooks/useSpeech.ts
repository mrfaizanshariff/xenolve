import { useState, useEffect, useRef, useCallback } from 'react';

// Interfaces for Web Speech API
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onstart: (event: Event) => void;
    onend: (event: Event) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

declare global {
    interface Window {
        SpeechRecognition: {
            new(): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
    }
}

export type ListeningState = 'idle' | 'listening' | 'processing';

interface UseSpeechResult {
    isSupported: boolean;
    listeningState: ListeningState;
    transcript: string;
    startListening: () => void;
    stopListening: () => void;
    resetTranscript: () => void;
    speak: (text: string) => void;
    cancelSpeech: () => void;
    error: string | null;
}

export function useSpeech(): UseSpeechResult {
    const [isSupported, setIsSupported] = useState(false);
    const [listeningState, setListeningState] = useState<ListeningState>('idle');
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                setIsSupported(true);
                const recognition = new SpeechRecognition();
                recognition.continuous = false; // Stop after one sentence/fragment for turn-taking
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onstart = () => {
                    setListeningState('listening');
                    setError(null);
                };

                recognition.onend = () => {
                    setListeningState('idle');
                };

                recognition.onresult = (event: SpeechRecognitionEvent) => {
                    let finalTranscript = '';
                    let interimTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        } else {
                            interimTranscript += event.results[i][0].transcript;
                        }
                    }

                    // We update the transcript with what we have. 
                    // If we wanted to "commit" only on final, we'd handle that differently.
                    setTranscript(finalTranscript || interimTranscript);
                };

                recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error('Speech recognition error', event.error);
                    if (event.error === 'no-speech') {
                        setError('No speech detected.');
                    } else if (event.error === 'not-allowed') {
                        setError('Microphone permission denied.');
                    } else {
                        setError(event.error);
                    }
                    setListeningState('idle');
                };

                recognitionRef.current = recognition;
            }

            if ('speechSynthesis' in window) {
                synthRef.current = window.speechSynthesis;
            }
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && listeningState === 'idle') {
            setTranscript('');
            setError(null);
            try {
                recognitionRef.current.start();
            } catch (e) {
                // sometimes it's already started
                console.warn('Speech recognition already started');
            }
        }
    }, [listeningState]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && listeningState === 'listening') {
            recognitionRef.current.stop();
        }
    }, [listeningState]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    const speak = useCallback((text: string) => {
        if (synthRef.current) {
            // Cancel any existing speech
            synthRef.current.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            // Optional: Configurable voice/pitch/rate
            // utterance.voice = ...
            synthRef.current.speak(utterance);
        }
    }, []);

    const cancelSpeech = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
        }
    }, []);

    return {
        isSupported,
        listeningState,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        speak,
        cancelSpeech,
        error,
    };
}
