// path/to/HTMLEditor.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HTMLEditor: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState(`
<div class="p-4 bg-gray-100 rounded">
  <h1 class="text-2xl font-bold text-blue-600">Hello, World!</h1>
  <p class="mt-2 text-gray-700">
    This is a live HTML editor with preview.
  </p>
</div>
  `.trim());

    const [isPreviewEditable, setIsPreviewEditable] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previewElement = previewRef.current;
        if (previewElement) {
            previewElement.contentEditable = isPreviewEditable.toString();

            if (isPreviewEditable) {
                previewElement.addEventListener('input', handlePreviewEdit);
            } else {
                previewElement.removeEventListener('input', handlePreviewEdit);
            }
        }
    }, [isPreviewEditable]);

    const handlePreviewEdit = (e: Event) => {
        const target = e.target as HTMLDivElement;
        setHtmlContent(target.innerHTML);
    };

    return (
        <Card className="w-[100vh] h-[80vh] max-w-full mx-auto">
            <CardHeader>
                <CardTitle>Template Editor</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="editor" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="preview">Live Preview</TabsTrigger>
                        <TabsTrigger
                            value="interactive"
                            onClick={() => setIsPreviewEditable(!isPreviewEditable)}
                        >
                            {isPreviewEditable ? 'Disable' : 'Enable'} Edit
                        </TabsTrigger>
                        <TabsTrigger value="editor">Edit HTML</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor">
                        <textarea
                            className="w-full min-h-[300px] p-2 border rounded font-mono text-sm"
                            value={htmlContent}
                            onChange={(e) => setHtmlContent(e.target.value)}
                            placeholder="Enter your HTML here..."
                        />
                    </TabsContent>
                    <TabsContent value="preview" className="p-2">
                        <div
                            ref={previewRef}
                            className="w-full min-h-[300px] border rounded p-4"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </TabsContent>
                    <TabsContent value="interactive" className="p-2">
                        <div
                            ref={previewRef}
                            className={`w-full min-h-[300px] border rounded p-4 ${isPreviewEditable ? 'bg-yellow-50 border-yellow-300' : ''
                                }`}
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                        {isPreviewEditable && (
                            <p className="text-sm text-yellow-700 mt-2">
                                * You can now directly edit the preview. Changes will update the HTML code.
                            </p>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default HTMLEditor;