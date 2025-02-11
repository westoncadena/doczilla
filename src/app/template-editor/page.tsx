"use client";
import { Suspense } from 'react'; // Import Suspense
import TipTapEditor from '@/components/tiptap';
import ChatSupport from '@/components/chat-support';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import React from 'react';

const TemplateEditorPage: React.FC = () => {
    const searchParams = useSearchParams();
    const templateId = searchParams.get('template');
    const [content, setContent] = useState('<h1>New Template</h1><p>Start editing...</p>');
    const [name, setName] = useState(templateId ? '' : 'New Template');
    const [isLoading, setIsLoading] = useState(!!templateId); // Loading if we have an ID
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(!templateId); // Edit mode for new templates

    useEffect(() => {
        const loadTemplate = async () => {
            if (!templateId) return;
            setIsLoading(true);
            setError('');

            try {
                const { data, error } = await supabase
                    .from('templates')
                    .select('*')
                    .eq('id', templateId)
                    .single();

                if (error) throw error;
                if (data) {
                    setContent(data.content);
                    setName(data.name);
                }
            } catch (error) {
                console.error('Error loading template:', error);
                setError('Failed to load template');
            } finally {
                setIsLoading(false);
            }
        };

        loadTemplate();
    }, [templateId]);

    if (isLoading) {
        return <div className="p-4">Loading template...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    const handleSave = async () => {
        try {
            if (templateId) {
                // Update existing template
                const { error } = await supabase
                    .from('templates')
                    .update({
                        content: content,
                        last_edited: new Date().toISOString(),
                        name: name,
                    })
                    .eq('id', templateId);

                if (error) throw error;
            } else {
                // Create new template
                const { error } = await supabase
                    .from('templates')
                    .insert({
                        name: name,
                        content: content,
                        last_edited: new Date().toISOString(),
                    });

                if (error) throw error;
            }

            console.log('Template saved successfully');
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    return (
        <div className="p-4 flex flex-col">
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-4">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-3xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                            placeholder="Enter template name..."
                            autoFocus
                        />
                    ) : (
                        <h1 className="text-3xl font-bold cursor-pointer" onClick={() => setIsEditing(true)}>
                            {name}
                        </h1>
                    )}
                    {isEditing && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(false)}
                        >
                            Done
                        </Button>
                    )}
                </div>
                <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                </Button>
            </div>
            <div className="flex flex-1">
                <div className="flex-1 mr-2">
                    <TipTapEditor
                        content={content}
                        onUpdate={handleContentChange}
                    />
                </div>
                <div className="flex-1 ml-2">
                    <ChatSupport />
                </div>
            </div>
        </div>
    );
};

// Wrap the component in Suspense when using useSearchParams
const TemplateEditorPageWithSuspense: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <TemplateEditorPage />
    </Suspense>
);

export default TemplateEditorPageWithSuspense;
