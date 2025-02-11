import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
            { error: 'Blob storage not configured' },
            { status: 500 }
        );
    }

    try {
        const { blobs } = await list({
            prefix: 'templates/',
        });

        // Log URLs of all templates
        blobs.forEach(blob => {
            console.log('Template URL:', blob.url);
        });

        const templates = blobs.map(blob => ({
            url: blob.url,
            pathname: blob.pathname,
            uploadedAt: blob.uploadedAt,
        }));

        return NextResponse.json({ templates });

    } catch (error) {
        console.error('Error listing templates:', error);
        return NextResponse.json(
            { error: 'Failed to list templates' },
            { status: 500 }
        );
    }
} 