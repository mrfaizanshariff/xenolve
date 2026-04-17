import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.file_base64 || !body.filename) {
            return NextResponse.json({ error: "Missing file_base64 or filename" }, { status: 400 });
        }

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock extracted fields
        const extracted = {
            "Quotation Number": "QT-2024-001",
            "Date": "2024-05-10",
            "Customer Name": "Acme Corp",
            "Total Amount": "$12,450.00",
            "Items": [
                { "Description": "LED Panel Light 60x60", "Quantity": 50, "Unit Price": "$45.00" },
                { "Description": "Downlight 15W", "Quantity": 100, "Unit Price": "$22.00" },
                { "Description": "Installation Service", "Quantity": 1, "Unit Price": "$8000.00" }
            ]
        };

        // Create a dummy simple base64 text for testing download (Not a real Excel, just text file mock to test flow)
        // A real implementation would use something like `xlsx` on the backend.
        // For a mock, a simple CSV content encoded as base64 works if we change the extension to .csv, 
        // but since the endpoint mocks an excel response, we will just return base64 of a simple text. 
        // When downloaded as .xlsx it might be corrupt, so a user might not be able to open it as real Excel without xlsx lib. 
        // We'll provide a simple CSV base64 and name it .csv for the mock so it's readable, 
        // or just return dummy base64 and let it be corrupted .xlsx since it's just a UI test.

        const mockCsv = `Quotation Number,Date,Customer Name,Total Amount\nQT-2024-001,2024-05-10,Acme Corp,$12,450.00\n`;
        const excel_b64 = Buffer.from(mockCsv).toString('base64');

        const output_name = body.filename.replace(".pdf", "_quotation.csv"); // Used .csv so it's viewable after download for mock

        console.log(excel_b64, extracted)
        return NextResponse.json({
            file_base64: excel_b64,
            filename: output_name,
            extracted_fields: extracted
        });

    } catch (error: any) {
        console.error("API Mock Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error", details: error.stack }, { status: 500 });
    }
}
