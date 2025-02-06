"use client"; // Add the client-side directive here

import { usePathname } from "next/navigation"; // Import the hook
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar"; // Assuming SidebarTrigger is a client-side component

export default function RootLayoutClient({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname(); // Get the current path

    const isHomePage = pathname === "/"; // Check if it's the home page

    return (
        <>
            {/* Conditionally render the sidebar based on the route */}
            {!isHomePage && <AppSidebar />}
            <main className="w-full">
                {!isHomePage && <SidebarTrigger />}
                {children}
            </main>
        </>
    );
}
