// pages/pdf-viewer.tsx
'use client';  // Add this directive at the top

import { EmbedPDF } from '@simplepdf/react-embed-pdf';

const Page = () => {
    // const pdfUrl = 'sales_agreement_template.pdf';  // Update the path to your PDF file

    return (
        <div>
            <EmbedPDF
                mode="inline"
                style={{ width: 900, height: 800 }}
                documentURL="sales_agreement_template.pdf"
            />
        </div>
    );
};

export default Page;
