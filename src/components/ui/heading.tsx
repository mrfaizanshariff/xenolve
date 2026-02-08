import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

export function Heading({ children, level = 2, className, ...props }: HeadingProps) {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    const baseStyles = "font-bold tracking-tight text-foreground";

    const sizes = {
        1: "text-4xl md:text-6xl lg:text-7xl",
        2: "text-3xl md:text-4xl lg:text-5xl",
        3: "text-2xl md:text-3xl",
        4: "text-xl md:text-2xl",
        5: "text-lg md:text-xl",
        6: "text-base md:text-lg",
    };

    return (
        <Tag className={cn(baseStyles, sizes[level as keyof typeof sizes], className)} {...props}>
            {children}
        </Tag>
    );
}
