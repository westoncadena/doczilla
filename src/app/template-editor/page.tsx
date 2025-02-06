"use client";
import HTMLEditor from '@/components/html-editor'; // Import the HTMLEditor component
import ChatSupport from '@/components/chat-support';

const TemplateEditorPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Template Editor</h1>
            <HTMLEditor></HTMLEditor>
            <ChatSupport></ChatSupport>
        </div>
    );
};

export default TemplateEditorPage;