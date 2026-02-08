
export interface AIResponse {
    answer: string; // The text response from the AI
    audio?: string; // Base64 audio or URL, if available
    // Add other fields as discovered from the actual API
}

export async function sendMessageToAI(input: string | Blob): Promise<AIResponse> {
    const isAudio = input instanceof Blob;

    let body;
    let headers: Record<string, string> = {};

    if (isAudio) {
        const formData = new FormData();
        formData.append('audio', input); // 'audio' is a common field name, verify if 'file' or other is needed
        // If text accompannies audio? Usually one or the other for these demos.
        body = formData;
        // content-type handled by browser for formData
    } else {
        body = JSON.stringify({ message: input });
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch('/api/ai-proxy', {
        method: 'POST',
        body,
        headers: Object.keys(headers).length > 0 ? headers : undefined,
    });

    if (!response.ok) {
        // Handle specific error codes if needed
        if (response.status === 429) {
            throw new Error('You are sending messages too fast. Please slow down.');
        }
        throw new Error('Failed to communicate with AI service');
    }

    return response.json();
}
