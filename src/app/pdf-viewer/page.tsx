// pages/pdf-viewer.tsx
'use client';  // Add this directive at the top

import { EmbedPDF } from '@simplepdf/react-embed-pdf';

const Page = () => {
    // const pdfUrl = 'sales_agreement_template.pdf';  // Update the path to your PDF file

    return (
        <div>
            <h1>PDF Viewer</h1>
            <EmbedPDF companyIdentifier="yourcompany">
                <a href="sales_agreement_template.pdf">Opens sample.pdf</a>
            </EmbedPDF>
        </div>
    );
};

export default Page;
