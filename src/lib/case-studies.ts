import { Bot, Code, Cpu, Globe, Layout, Smartphone } from "lucide-react";

export const CASE_STUDIES = [
    {
        slug: "quran-by-emaan",
        title: "Quran By Emaan",
        subtitle: "Habit-Based Quran Reading & Listening Mobile App",
        category: "Mobile App Development",
        serviceKeyword: "Mobile App Development",
        overview: "Quran By Emaan is a cross-platform mobile application designed to help Muslims build a consistent Quran reading habit through goal tracking, streaks, and guided listening. Xenolve engineered the app to deliver a smooth, distraction-free experience across both Android and iOS while supporting thousands of daily active users.",
        challenge: "The client needed a scalable mobile app that encouraged daily Quran engagement, tracked reading goals and streaks, supported audio listening, worked seamlessly on both platforms, and handled real-time sync and user data securely. Off-the-shelf solutions lacked personalization, performance, and long-term scalability.",
        solution: "We built a high-performance React Native app with a modern, habit-based UX and real-time backend infrastructure.",
        techStack: ["React Native", "Firebase (Auth, Firestore, Push Notifications)", "Zustand state management"],
        keyFeatures: [
            "Daily goals & streak tracking",
            "Quran reading progress system",
            "Audio listening mode",
            "Smart reminders & notifications",
            "Offline-first performance",
            "Cloud-synced data"
        ],
        results: [
            { value: "2×", label: "Increase in daily reading consistency" },
            { value: "40%", label: "Higher retention through streak mechanics" },
            { value: "50%", label: "Cost reduction via single codebase (iOS + Android)" },
            { value: "Scale", label: "Architecture ready for global growth" }
        ],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop", // Placeholder
        keywords: ["mobile app development", "react native app development", "cross-platform apps", "habit tracking app"],
        icon: Smartphone
    },
    {
        slug: "thread-drop",
        title: "ThreadDrop",
        subtitle: "Premium Shopify eCommerce Store for a Luxury Clothing Brand",
        category: "eCommerce",
        serviceKeyword: "eCommerce Development",
        overview: "ThreadDrop is a premium streetwear and luxury clothing brand focused on rarity and exclusivity. Xenolve designed and developed a high-conversion Shopify eCommerce store optimized for performance, inventory control, and marketing campaigns.",
        challenge: "The brand needed a custom premium theme (not a template), fast performance for mobile shoppers, inventory and SKU management, marketing campaign support, and scalability for drops and flash sales. Standard Shopify setups couldn’t support their growth strategy.",
        solution: "We built a custom Shopify storefront with a tailored UX and backend tools for operations and marketing.",
        techStack: ["Shopify", "Custom Theme Development", "Shopify APIs", "Analytics & Conversion Tracking"],
        keyFeatures: [
            "Custom luxury design",
            "Lightning-fast page loads",
            "Inventory & stock automation",
            "Campaign & drop management",
            "Conversion-optimized checkout",
            "Analytics dashboards"
        ],
        results: [
            { value: "2.3×", label: "Higher conversion rate" },
            { value: "45%", label: "Faster load times" },
            { value: "ROI", label: "Increased campaign ROI" },
            { value: "Scale", label: "Scalable for limited-edition drops" }
        ],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop", // Placeholder
        keywords: ["Shopify development", "Shopify store development", "eCommerce development agency", "headless commerce", "fashion eCommerce"],
        icon: Layout
    },
    {
        slug: "darsas",
        title: "DarSas",
        subtitle: "Corporate Website Modernization with Next.js & SEO Optimization",
        category: "Web Development",
        serviceKeyword: "Corporate Website Development",
        overview: "DarSas required a complete modernization of their outdated corporate website to improve search rankings, mobile usability, and lead generation. Xenolve rebuilt the platform using modern web technologies focused on speed, SEO, and analytics.",
        challenge: "The existing site suffered from slow load speeds, poor mobile experience, weak SEO visibility, and low conversion rates.",
        solution: "We delivered a modern, SEO-first Next.js website with clean architecture and performance optimization.",
        techStack: ["Next.js", "SEO optimization", "Analytics integration", "Responsive design"],
        keyFeatures: [
            "Static generation for speed",
            "Technical SEO best practices",
            "Structured content",
            "Mobile-first UX",
            "Lead capture forms",
            "Analytics dashboards"
        ],
        results: [
            { value: "3×", label: "Faster load speed" },
            { value: "60%", label: "Increase in organic traffic" },
            { value: "Rank", label: "Higher search rankings" },
            { value: "Mobile", label: "Improved mobile engagement" }
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", // Placeholder
        keywords: ["Next.js development", "corporate website development", "SEO optimized website", "business website redesign"],
        icon: Globe
    },
    // {
    //     slug: "lightech",
    //     title: "Lightech",
    //     subtitle: "High-Performance Corporate Website Redesign & SEO Strategy",
    //     category: "Web Development",
    //     serviceKeyword: "Website Modernization",
    //     overview: "Lightech partnered with Xenolve to redesign their corporate presence with a fast, modern, and SEO-optimized website that reflects their brand credibility and attracts enterprise clients.",
    //     challenge: "Outdated design, low search visibility, limited analytics, and not mobile friendly.",
    //     solution: "We created a clean, enterprise-grade website using modern frontend architecture and measurable performance practices.",
    //     techStack: ["Next.js", "Technical SEO", "Analytics tracking", "Responsive design"],
    //     keyFeatures: [
    //         "Blazing-fast performance",
    //         "Structured SEO content",
    //         "Optimized landing pages",
    //         "Integrated analytics",
    //         "Mobile-first layout"
    //     ],
    //     results: [
    //         { value: "SEO", label: "Higher Google rankings" },
    //         { value: "Leads", label: "Increased inbound leads" },
    //         { value: "50%", label: "Better engagement time" },
    //         { value: "Brand", label: "Modern professional brand presence" }
    //     ],
    //     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop", // Placeholder
    //     keywords: ["website modernization", "Next.js website development", "SEO services", "corporate web development"],
    //     icon: Cpu
    // },
    {
        slug: "mosque-of-india",
        title: "Mosque Of India",
        subtitle: "Community Platform with AI-Powered Quran & Hadith Assistant",
        category: "AI & Web App",
        serviceKeyword: "AI & Community Platform",
        overview: "Mosque Of India is a community-focused digital platform built and maintained by Xenolve to make Islamic knowledge and daily religious practices more accessible through technology. The platform combines Quran reading tools, prayer utilities, and an AI-powered assistant into one unified web experience.",
        challenge: "Create a scalable, user-friendly platform that serves thousands of users daily, offers Quran reading & listening, tracks Ramadan habits, provides prayer times by city, and includes an AI assistant for Quran & Hadith queries.",
        solution: "We engineered a full-stack Next.js application with integrated AI and real-time features.",
        techStack: ["Next.js", "AI chat interface", "Modern APIs", "Real-time prayer data"],
        keyFeatures: [
            "AI-powered Quran & Hadith Q&A",
            "Quran reading & audio",
            "Ramadan habit tracker",
            "Prayer times by location",
            "Mobile-optimized experience",
            "Ongoing maintenance & updates"
        ],
        results: [
            { value: "Users", label: "Thousands of monthly active users" },
            { value: "Engagement", label: "High daily engagement" },
            { value: "Community", label: "Centralized platform" },
            { value: "Future", label: "Scalable architecture" }
        ],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop", // Placeholder
        keywords: ["Next.js web app development", "AI chatbot development", "religious app development", "community platform", "habit tracking app"],
        icon: Bot
    }
];
