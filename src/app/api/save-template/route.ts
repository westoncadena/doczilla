import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
            { error: 'Blob storage not configured' },
            { status: 500 }
        );
    }

    try {
        const { content } = await request.json();

        if (!content) {
            return NextResponse.json(
                { error: 'No content provided' },
                { status: 400 }
            );
        }

        const blob = await put(`templates/${Date.now()}.html`, content, {
            access: 'public',
            addRandomSuffix: true, // adds random suffix to prevent naming conflicts
        });

        return NextResponse.json({
            success: true,
            url: blob.url,
            pathname: blob.pathname
        });

    } catch (error) {
        console.error('Error saving template:', error);
        return NextResponse.json(
            { error: 'Failed to save template' },
            { status: 500 }
        );
    }
} 