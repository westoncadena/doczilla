"use client";
import { useEffect, useState } from 'react';
import FillOutEditor from '@/components/fill-out';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const FillOutPage = () => {
    const searchParams = useSearchParams();
    const templateId = searchParams.get('template');
    const [content, setContent] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTemplate = async () => {
            if (!templateId) {
                setError('No template specified');
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('templates')
                    .select('*')
                    .eq('id', templateId)
                    .single();

                if (error) throw error;
                if (data) {
                    setContent(data.content);
                    setTemplateName(data.name);
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

    const handleUpdate = (newContent: string) => {
        setContent(newContent);
        // You might want to save the filled out content somewhere
        console.log('Updated content:', newContent);
    };

    if (isLoading) {
        return <div className="p-4">Loading template...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Fill Out: {templateName}
            </h1>
            <FillOutEditor
                content={content}
                onUpdate={handleUpdate}
            />
        </div>
    );
};

export default FillOutPage;
