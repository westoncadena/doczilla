"use client";

import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatResponse {
    message: string; // Replace with actual property names
    data: string; // Replace with actual property names
}

interface ChatSupportProps {
    onResponse?: (data: ChatResponse) => void;
}

export default function ChatSupport({ onResponse }: ChatSupportProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const {
        messages,
        setMessages,
        isLoading,
    } = useChat({
        onResponse(response) {
            if (response) {
                setIsGenerating(false);
            }
        },
        onError(error) {
            if (error) {
                setIsGenerating(false);
            }
        },
    });

    const messagesRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue) return;

        setIsGenerating(true);
        try {
            const input = inputValue
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: String(Date.now()),
                    role: 'user',
                    content: input
                },
            ]);
            setInputValue('');

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatInput: input,
                    sessionId: '1'
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: String(Date.now()),
                    role: 'assistant',
                    content: data.message
                },
            ]);

            onResponse?.(data);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: String(Date.now()),
                    role: 'assistant',
                    content: 'Error sending message'
                },
            ]);
        } finally {
            setIsGenerating(false);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (isGenerating || isLoading || !inputValue) return;
            setIsGenerating(true);
            onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    return (
        <ExpandableChat size="xl" position="bottom-right">
            <ExpandableChatHeader className="bg-muted/60 flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Chat with Zilla</h1>
                <p>Use Zilla to create and edit pdf templates</p>
                <div className="flex gap-2 items-center pt-2">
                    <Button variant="secondary" onClick={() => setMessages([])}>
                        New Chat
                    </Button>
                    <Button variant="secondary">See FAQ</Button>
                </div>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ChatMessageList className="bg-muted/25" ref={messagesRef}>
                    {/* Initial message */}
                    <ChatBubble variant="received">
                        <ChatBubbleAvatar src="doczilla-logo.png" fallback="🤖" />
                        <ChatBubbleMessage>
                            Hello! I am Zilla the assistant. How can I help you create a template today?
                        </ChatBubbleMessage>
                    </ChatBubble>

                    {/* Messages */}
                    {messages &&
                        messages.map((message, index) => (
                            <ChatBubble
                                key={index}
                                variant={message.role == "user" ? "sent" : "received"}
                            >
                                <ChatBubbleAvatar
                                    src={message.role == "user" ? "user.jpg" : "doczilla-logo.png"}
                                />
                                <ChatBubbleMessage
                                    variant={message.role == "user" ? "sent" : "received"}
                                >
                                    {message.content
                                        .split("```")
                                        .map((part: string, index: number) => {
                                            if (index % 2 === 0) {
                                                return (
                                                    <Markdown key={index} remarkPlugins={[remarkGfm]}>
                                                        {part}
                                                    </Markdown>
                                                );
                                            } else {
                                                return (
                                                    <pre className=" pt-2" key={index}>
                                                        {/* <CodeDisplayBlock code={part} lang="" /> */}
                                                        <p>code</p>
                                                    </pre>

                                                );
                                            }
                                        })}
                                </ChatBubbleMessage>
                            </ChatBubble>
                        ))}

                    {/* Loading */}
                    {isGenerating && (
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar src="doczilla-logo.png" fallback="🤖" />
                            <ChatBubbleMessage isLoading />
                        </ChatBubble>
                    )}
                </ChatMessageList>
            </ExpandableChatBody>
            <ExpandableChatFooter className="bg-muted/25">
                <form ref={formRef} className="flex relative gap-2" onSubmit={onSubmit}>
                    <ChatInput
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="min-h-12 bg-background shadow-none"
                    />
                    <Button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                        type="submit"
                        size="icon"
                        disabled={isLoading || isGenerating || !inputValue}
                    >
                        <Send className="size-4" />
                    </Button>
                </form>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}