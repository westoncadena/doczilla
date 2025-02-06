"use client";
import HTMLEditor from '@/components/html-editor'; // Import the HTMLEditor component
import ChatSupport from '@/components/chat-support';

const TemplateEditorPage: React.FC = () => {
    return (
        <div className="p-4 flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Template Editor</h1>
            <div className="flex flex-1"> {/* Flex container for horizontal split */}
                <div className="flex-1 mr-2"> {/* HTMLEditor takes half the space */}
                    <HTMLEditor />
                </div>
                <div className="flex-1 ml-2"> {/* ChatSupport takes half the space */}
                    <ChatSupport />
                </div>
            </div>
        </div>
    );
};

export default TemplateEditorPage;