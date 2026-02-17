import { AIDemoContent } from '@/components/features/ai-demo-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AI Voice Agent Demo | Xenolve",
    description: "Experience our advanced AI Voice Agent. Interact with our intelligent assistant to learn more about Xenolve's services and capabilities.",
};

export default function AIDemoPage() {
    return <AIDemoContent />;
}
