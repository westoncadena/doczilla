"use client"; // This directive marks the component as a client component

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"; // Ensure correct import path
import { Button } from "@/components/ui/button"


interface Template {
    id: string;
    name: string;
}

const TemplatesPage = () => {
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        // Mock fetch templates from your database or API
        const fetchTemplates = async () => {
            // const response = await fetch("/api/templates"); // Adjust the API endpoint as needed
            // const data: Template[] = await response.json(); // Cast the fetched data to Template[]
            // setTemplates(data);
            // Mock data
            const mockData: Template[] = [
                { id: "1", name: "Sales Agreement Template" },
                { id: "2", name: "Letter of Intent Template" },
                { id: "3", name: "Invoice Template" },
            ];
            // Simulate a delay like a real fetch
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setTemplates(mockData); // Set the mock data
        };

        fetchTemplates();
    }, []);

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {templates.map((template) => (
                    <TableRow key={template.id}>
                        <TableCell>{template.name}</TableCell>
                        <TableCell className="flex space-x-2">
                            <Button>Edit</Button>
                            <Button>Download</Button>
                            <Button>Fill Out</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TemplatesPage;
