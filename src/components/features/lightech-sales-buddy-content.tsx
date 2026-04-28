"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LightechSalesBuddyContent() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [processingStatus, setProcessingStatus] = useState<string>('');
    const [result, setResult] = useState<{
        filename: string;
        extracted_fields: Record<string, any>;
        file_base64: string;
    } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== 'application/pdf') {
                setError("Please upload a valid PDF file.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null);
            setResult(null);
        }
    };

    const pollStatus = async (sessionId: string) => {
        const maxAttempts = 60; // Poll for up to 5 minutes (60 * 5 seconds)
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                const statusResponse = await fetch(`/api/extract?session_id=${sessionId}`);
                
                if (!statusResponse.ok) {
                    const errorData = await statusResponse.json();
                    throw new Error(errorData.error || "Failed to check extraction status");
                }

                const statusData = await statusResponse.json();

                if (statusData.status === 'completed') {
                    // Extraction complete
                    setResult({
                        filename: statusData.filename,
                        extracted_fields: statusData.extracted_fields,
                        file_base64: statusData.file_base64
                    });
                    setProcessingStatus('Extraction completed successfully!');
                    setIsLoading(false);
                    return;
                } else if (statusData.status === 'failed') {
                    throw new Error(statusData.error || "Extraction failed");
                } else {
                    // Still processing
                    const progress = statusData.progress || 0;
                    setProcessingStatus(`Processing... ${progress > 0 ? `${progress}%` : 'Please wait'}`);
                }

                // Wait 5 seconds before next poll
                await new Promise(resolve => setTimeout(resolve, 5000));
                attempts++;
            } catch (err: any) {
                setError(err.message || "Error checking extraction status");
                setIsLoading(false);
                return;
            }
        }

        // Timeout
        setError("Extraction timed out. Please try again.");
        setIsLoading(false);
    };

    const handleProcess = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);
        setResult(null);
        setProcessingStatus('Uploading PDF...');

        try {
            // Read file as base64
            const getBase64 = (file: File): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve((reader.result as string).split(',')[1]);
                    reader.onerror = error => reject(error);
                });
            };

            const base64 = await getBase64(file);
            setProcessingStatus('Submitting for extraction...');

            // Step 1: Submit PDF for async extraction
            const response = await fetch('/api/extract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: file.name,
                    file_base64: base64
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to process PDF");
            }

            const data = await response.json();
            
            if (!data.session_id) {
                throw new Error("No session ID received from server");
            }

            setProcessingStatus('PDF submitted. Starting extraction...');

            // Step 2: Poll for completion
            await pollStatus(data.session_id);

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
            setIsLoading(false);
            setProcessingStatus('');
        }
    };

    const handleDownload = () => {
        if (!result) return;

        const link = document.createElement('a');
        // Setting MIME type for csv as our mock returns a .csv
        const extension = result.filename.split('.').pop()?.toLowerCase();
        let mimeType = 'application/octet-stream';
        if (extension === 'csv') mimeType = 'text/csv';
        else if (extension === 'xlsx') mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        link.href = `data:${mimeType};base64,${result.file_base64}`;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Lightech</span> Sales Buddy
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Upload your quotation PDFs to automatically extract data and convert it into a structured spreadsheet using AI.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="p-8 md:p-12 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">

                        {/* Interactive Upload Area */}
                        {!result && (
                            <div className="space-y-8 relative z-10">
                                <div className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${file ? 'border-primary/50 bg-primary/5' : 'border-border/50 hover:border-primary/30 hover:bg-card/50'}`}>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        disabled={isLoading}
                                    />
                                    <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
                                        <div className={`p-4 rounded-full transition-colors ${file ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                            {file ? <FileText className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium text-foreground">
                                                {file ? file.name : "Click to upload or drag and drop"}
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF documents up to 10MB"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-lg"
                                        >
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            <p>{error}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Button
                                    onClick={handleProcess}
                                    disabled={!file || isLoading}
                                    className="w-full h-14 text-lg font-medium rounded-xl relative overflow-hidden group"
                                >
                                    <span className={`flex items-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                                        Extract Data
                                    </span>
                                    {isLoading && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Processing...</span>
                                            </div>
                                            {processingStatus && (
                                                <span className="text-xs text-muted-foreground">{processingStatus}</span>
                                            )}
                                        </div>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Result Area */}
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8 relative z-10"
                            >
                                <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Extraction Complete</h3>
                                    <p className="text-muted-foreground">
                                        Successfully parsed the quotation and generated your file.
                                    </p>
                                </div>

                                {/* <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Extracted Summary</h4>
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Object.entries(result.extracted_fields).map(([key, value]) => {
                                            if (typeof value === 'string' || typeof value === 'number') {
                                                return (
                                                    <div key={key}>
                                                        <dt className="text-sm text-muted-foreground">{key}</dt>
                                                        <dd className="font-medium">{value}</dd>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </dl>
                                </div> */}

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        onClick={handleDownload}
                                        className="flex-1 h-14 text-lg font-medium"
                                        size="lg"
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        Download File
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setResult(null);
                                            setFile(null);
                                        }}
                                        className="flex-1 h-14 text-lg font-medium"
                                        size="lg"
                                    >
                                        Upload Another
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
