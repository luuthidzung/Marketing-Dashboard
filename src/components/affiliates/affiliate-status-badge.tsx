import { cn } from "@/lib/utils";

interface AffiliateStatusBadgeProps {
    status: 'active' | 'inactive' | 'pending';
}

export function AffiliateStatusBadge({ status }: AffiliateStatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                status === 'active' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                status === 'inactive' && "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
                status === 'pending' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            )}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

