import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, PenLine, Zap } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center max-w-4xl space-y-6">
        <div className="flex items-center gap-2 text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full">
          <Zap size={16} />
          <span>Powered by AI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Create and Sign Documents with
          <span className="text-blue-600"> AI Superpowers</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl">
          Transform your document workflow with AI-powered creation, editing, and secure digital signatures. Save hours of work with intelligent automation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <Link href="/templates" className="group">
          <div className="flex flex-col gap-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Smart Templates</h3>
            <p className="text-gray-600">
              AI-powered templates that adapt to your needs. Create professional documents in seconds.
            </p>
          </div>
        </Link>

        <Link href="/signatures" className="group">
          <div className="flex flex-col gap-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <PenLine className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Digital Signatures</h3>
            <p className="text-gray-600">
              Secure, legally-binding signatures with built-in verification and audit trails.
            </p>
          </div>
        </Link>

        <Link href="/ai-assistant" className="group">
          <div className="flex flex-col gap-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">AI Assistant</h3>
            <p className="text-gray-600">
              Get intelligent suggestions and automated document analysis in real-time.
            </p>
          </div>
        </Link>
      </div>

      {/* Social Proof */}
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Trusted by innovative teams</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full justify-items-center opacity-70">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}