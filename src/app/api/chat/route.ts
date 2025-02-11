import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://westoncadena.app.n8n.cloud/webhook/invoke_agent';

export async function POST(req: Request) {
    try {
        // Parse incoming request body
        const { chatInput, sessionId } = await req.json();

        if (!chatInput || !sessionId) {
            return NextResponse.json({ error: 'chatInput and sessionId are required' }, { status: 400 });
        }

        // Prepare the payload for the webhook
        const payload = [
            {
                chatInput,
                sessionId,
            }
        ];

        // Send POST request to the webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            return NextResponse.json({ error: `Failed to invoke agent: ${errorMessage}` }, { status: response.status });
        }

        // Get the response from the webhook (assuming it sends a success message)
        const webhookResponse = await response.json();

        return NextResponse.json({
            message: webhookResponse.output,
            data: webhookResponse.document,
        });
    } catch (error) {
        console.error('Error in webhook request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
