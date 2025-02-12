"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabaseClient';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, FileText, MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Template {
    id: string;
    name: string;
    last_edited: string;
    content: string;
}

const TemplatesPage = () => {
    const [templates, setTemplates] = useState<Template[]>([]);

    const fetchTemplates = async () => {
        try {
            const { data, error } = await supabase
                .from('templates')
                .select('*');

            if (error) throw error;
            setTemplates(data || []);
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleDelete = async (template: Template) => {
        try {
            const { error } = await supabase
                .from('templates')
                .delete()
                .eq('id', template.id);

            if (error) throw error;
            await fetchTemplates();
        } catch (error) {
            console.error('Error deleting template:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-8">
                <h1 className="text-2xl font-bold">Templates</h1>
                <Link href="/template-editor">
                    <Button>New Template</Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {templates.map((template) => (
                    <div key={template.id} className="group relative">
                        <Link href={`/template-editor?template=${template.id}`}>
                            <div className="cursor-pointer">
                                {/* Document Preview Card */}
                                <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                    {/* Document Preview */}
                                    <div className="aspect-[8.5/11] p-2 border-b bg-gray-50 flex items-center justify-center">
                                        <div className="flex flex-col items-center space-y-2">
                                            <FileText className="w-8 h-8 text-gray-600" />
                                            <div className="w-16 h-1 bg-gray-200 rounded" />
                                            <div className="w-12 h-1 bg-gray-200 rounded" />
                                            <div className="w-14 h-1 bg-gray-200 rounded" />
                                        </div>
                                    </div>

                                    {/* Document Info */}
                                    <div className="p-3">
                                        <h3 className="text-base font-medium truncate">{template.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(template.last_edited).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Actions Menu */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 bg-white/90 hover:bg-white">
                                        <MoreVertical className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <Link href={`/template-editor?template=${template.id}`}>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                    <Link href={`/fill-out?template=${template.id}`}>
                                        <DropdownMenuItem>Fill Out</DropdownMenuItem>
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem className="text-red-600">
                                                Delete
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Template</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete &quot;{template.name}&quot;? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(template)}
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatesPage;