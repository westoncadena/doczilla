import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

interface FillOutEditorProps {
    content: string;
    onUpdate: (content: string) => void;
}

// Custom extension to only allow editing of [field_name] patterns
const FieldsOnly = Extension.create({
    name: 'fieldsOnly',
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleTextInput: (view, from, to,) => {
                        const { doc } = view.state;
                        const currentText = doc.textBetween(from - 50, to + 50);

                        // Find all field positions in the current text segment
                        const fieldPattern = /\[[\w_]+\]/g;
                        let match;
                        let isInField = false;

                        while ((match = fieldPattern.exec(currentText)) !== null) {
                            const fieldStart = match.index + (from - 50);
                            const fieldEnd = fieldStart + match[0].length;

                            // Check if the cursor is within this field
                            if (from >= fieldStart && to <= fieldEnd) {
                                isInField = true;
                                break;
                            }
                        }

                        // Prevent editing if not in a field
                        return !isInField;
                    },
                    // Prevent deleting outside fields
                    handleKeyDown: (view, event) => {
                        if (event.key === 'Backspace' || event.key === 'Delete') {
                            const { from, to } = view.state.selection;
                            const currentText = view.state.doc.textBetween(from - 50, to + 50);

                            const fieldPattern = /\[[\w_]+\]/g;
                            let match;
                            let isInField = false;

                            while ((match = fieldPattern.exec(currentText)) !== null) {
                                const fieldStart = match.index + (from - 50);
                                const fieldEnd = fieldStart + match[0].length;

                                if (from >= fieldStart && to <= fieldEnd) {
                                    isInField = true;
                                    break;
                                }
                            }

                            return !isInField;
                        }
                        return false;
                    },
                },
            }),
        ];
    },
});

const FillOutEditor: React.FC<FillOutEditorProps> = ({ content, onUpdate }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            FieldsOnly,
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
        },
        editable: true,
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-sm">
            <div className="p-4">
                <EditorContent editor={editor} />
            </div>
            <div className="border-t p-2 bg-gray-50">
                <p className="text-sm text-gray-600">
                    Only fields in [brackets] can be edited
                </p>
            </div>
        </div>
    );
};

export default FillOutEditor; 