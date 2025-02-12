import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import RootLayoutClient from "@/components/root-layout-client"; // Import the client layout
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doczilla",
  description: "Document Generator and Signer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SidebarProvider>
          <RootLayoutClient><Suspense fallback={<div>Loading...</div>}>{children}</Suspense></RootLayoutClient>
        </SidebarProvider> */}
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>

    </html>
  );
}
