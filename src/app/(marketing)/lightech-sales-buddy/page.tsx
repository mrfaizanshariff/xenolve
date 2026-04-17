import { Metadata } from 'next';
import { LightechSalesBuddyContent } from '@/components/features/lightech-sales-buddy-content';

export const metadata: Metadata = {
    title: "Lightech Sales Buddy | Extract Quotation Data",
    description: "Upload Lightech quotation PDFs to automatically extract data and download as a formatted spreadsheet.",
};

export default function LightechSalesBuddyPage() {
    return <LightechSalesBuddyContent />;
}
