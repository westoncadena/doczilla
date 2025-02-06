"use client"; // This directive marks the component as a client component

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"; // Ensure correct import path

const TemplatesPage = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        // Fetch templates from your database or API
        const fetchTemplates = async () => {
            const response = await fetch("/api/templates"); // Adjust the API endpoint as needed
            const data = await response.json();
            setTemplates(data);
        };

        fetchTemplates();
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {templates.map((template) => (
                    <TableRow key={template.id}>
                        <TableCell>{template.name}</TableCell>
                        <TableCell>
                            {/* Add action buttons or links here */}
                            <button>View</button>
                            <button>Download</button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TemplatesPage;
