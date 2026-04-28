import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Maximum execution time in seconds (Vercel limit)

const API_BASE_URL = 'https://modern-nice-fish.ngrok-free.app/api/v1';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.file_base64 || !body.filename) {
            return NextResponse.json({ error: "Missing file_base64 or filename" }, { status: 400 });
        }

        // Step 1: Submit PDF for async extraction with timeout protection
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

        try {
            const extractResponse = await fetch(`${API_BASE_URL}/extract/async`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    base64_upload: {
                        file_name: body.filename,
                        file_content_base64: body.file_base64
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!extractResponse.ok) {
                const errorText = await extractResponse.text();
                console.error('Extract API Error:', errorText);
                throw new Error(`Failed to submit PDF for extraction: ${extractResponse.status} ${extractResponse.statusText}`);
            }

            const extractData = await extractResponse.json();
            
            if (!extractData.session_id) {
                throw new Error('No session ID returned from extraction API');
            }

            // Return session ID to frontend for polling
            return NextResponse.json({
                session_id: extractData.session_id,
                status: 'processing'
            });

        } catch (fetchError: any) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                throw new Error('Request to extraction API timed out. Please try again.');
            }
            throw fetchError;
        }

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: error.stack
        }, { status: 500 });
    }
}

// GET endpoint for polling status
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json({ error: "Missing session_id parameter" }, { status: 400 });
        }

        // Step 2: Poll for extraction status with timeout protection
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

        let statusData;
        try {
            const statusResponse = await fetch(`${API_BASE_URL}/status/${sessionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!statusResponse.ok) {
                const errorText = await statusResponse.text();
                console.error('Status API Error:', errorText);
                throw new Error(`Failed to get extraction status: ${statusResponse.status} ${statusResponse.statusText}`);
            }

            statusData = await statusResponse.json();
        } catch (fetchError: any) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                // Return processing status on timeout instead of error
                return NextResponse.json({
                    status: 'processing',
                    progress: 0
                });
            }
            throw fetchError;
        }

        // Check if extraction is complete
        if (statusData.status === 'completed' || statusData.status === 'success') {
            // Extract the Excel file in base64 format
            const excelBase64 = statusData.output?.excel_base64 || statusData.excel_base64 || statusData.file_base64;
            const extractedFields = statusData.extracted_fields || statusData.output?.extracted_fields || {};
            const filename = statusData.file_name || statusData.output?.filename || 'extracted_quotation.xlsx';

            return NextResponse.json({
                status: 'completed',
                file_base64: excelBase64,
                filename: filename
            });
        } else if (statusData.status === 'failed' || statusData.status === 'error') {
            return NextResponse.json({
                status: 'failed',
                error: statusData.error || 'Extraction failed'
            }, { status: 500 });
        } else {
            // Still processing
            return NextResponse.json({
                status: statusData.status || 'processing',
                progress: statusData.progress || 0
            });
        }

    } catch (error: any) {
        console.error("Status API Error:", error);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: error.stack
        }, { status: 500 });
    }
}
