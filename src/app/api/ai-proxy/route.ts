import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter (Map<IP, { count: number, resetTime: number }>)
// Note: In a serverless environment like Vercel, this state is ephemeral and may reset.
// For production transparency, use Redis (e.g., Upstash).
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_IP = 200; // Generous limit for demo

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_IP) {
        return true;
    }

    record.count += 1;
    return false;
}

const TARGET_API_URL = 'https://xenolve-ai-voice-agent-using-gemini2-5.onrender.com/test';

export async function POST(req: NextRequest) {
    try {
        // 1. Rate Limiting
        const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // 2. Request Parsing
        // We expect the client to send formData or JSON. The Render service likely accepts FormData or JSON depending on implementation.
        // Assuming standard JSON proxy for now based on "Voice + text input support" 
        // If it's voice *file* upload, we need to handle FormData. 
        // Let's support both.

        const contentType = req.headers.get('content-type') || '';

        let body;
        let headers: Record<string, string> = {};

        if (contentType.includes('application/json')) {
            body = JSON.stringify(await req.json());
            headers['Content-Type'] = 'application/json';
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            body = formData;
            // Fetch will automatically set the correct Content-Type with boundary for FormData
        } else {
            // Fallback for text/plain etc
            body = await req.text();
        }

        // 3. Forward to Render Service
        // We assume the target service handles the "chat" logic at root or specific endpoint.
        // The requirement says: "Forward requests to: ..."
        // We'll trust the path is just the base url for now, or append if client specifies.
        // For safety, let's just proxy to the root for this demo or a specific /chat endpoint if we knew it.
        // We will assume the client sends to this proxy, and we send to TARGET.
        // If the external service has endpoints, we might need to handle query params.

        // Let's assume a simple POST to root or /chat. 
        // We'll use the root for now as per instructions.

        const response = await fetch(TARGET_API_URL, {
            method: 'POST',
            body: body,
            headers: headers,
        });

        if (!response.ok) {
            console.error(`Upstream error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to process request with AI service' },
                { status: response.status }
            );
        }

        const data = await response.json();

        // 4. Transform Response (Verify consistency)
        // We pass through the JSON.
        return NextResponse.json(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
