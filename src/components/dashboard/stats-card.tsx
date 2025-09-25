import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        positive: boolean;
    };
    className?: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className,
}: StatsCardProps) {
    return (
        <Card className={cn("overflow-hidden hover-scale gradient-card", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center shadow-sm">
                    <Icon className="h-5 w-5 text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
                {trend && (
                    <div className="flex items-center mt-3 bg-muted/50 rounded-full px-3 py-1 w-fit">
                        <span
                            className={cn(
                                "text-xs font-medium",
                                trend.positive
                                    ? "text-success"
                                    : "text-destructive"
                            )}
                        >
                            {trend.positive ? "+" : "-"}{trend.value}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">from last month</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
