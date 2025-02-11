import { head } from '@vercel/blob';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get('url');
    if (!blobUrl) {
        return new Response('URL is required', { status: 400 });
    }
    const blobDetails = await head(blobUrl);

    return Response.json(blobDetails);
}