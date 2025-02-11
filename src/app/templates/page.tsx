"use client"; // This directive marks the component as a client component

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"; // Ensure correct import path
import { Button } from "@/components/ui/button"
import Link from 'next/link';
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
import { Trash2 } from 'lucide-react';

interface Template {
    id: string;  // Use string for bigint values (IDs) to handle them properly in JS/React
    name: string;
    last_edited: string;  // You can also use Date, but for now string works
    content: string;  // Assuming you want to store the content as text
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

            // Refresh the templates list
            await fetchTemplates();
        } catch (error) {
            console.error('Error deleting template:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Templates</h1>
                <Link href="/template-editor">
                    <Button>New Template</Button>
                </Link>
            </div>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Template Name</TableHead>
                        <TableHead>Last Edited</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {templates.map((template) => (
                        <TableRow key={template.id.toString()}>
                            <TableCell>{template.name}</TableCell>
                            <TableCell>{new Date(template.last_edited).toLocaleDateString()}</TableCell>
                            <TableCell className="flex space-x-2">
                                <Link href={`/template-editor?template=${template.id}`}>
                                    <Button>Edit</Button>
                                </Link>
                                <Button>Download</Button>
                                <Link href={`/fill-out?template=${template.id}`}>
                                    <Button>Fill Out</Button>
                                </Link>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TemplatesPage;
