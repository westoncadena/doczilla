'use client';
import VoiceComponent from "@/components/voice-component";
import { EmbedPDF } from '@simplepdf/react-embed-pdf';


export default function Home() {
    return (
        <main className="flex min-h-screen relative overflow-hidden">
            <div className="flex w-full">
                <div>
                    <EmbedPDF
                        mode="inline"
                        style={{ width: 900, height: 800 }}
                        documentURL="donation-receipt-doc.pdf"
                    />
                </div>
                <div className="w-1/2 flex items-center justify-center relative px-8">
                    <div className="w-full max-w-md text-center">
                        <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[100px] animate-pulse" />
                        <h1 className="text-4xl font-bold mb-6">Realtime Voice Agent</h1>
                        <VoiceComponent />
                        <div className="space-y-2">
                            <small className="block text-sm text-gray-500">Powered by ElevenLabs</small>
                            <small className="block text-xs text-gray-500">
                                The app requires microphone access to work.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};