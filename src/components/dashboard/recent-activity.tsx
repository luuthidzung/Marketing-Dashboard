import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentActivity } from "@/lib/types";

interface RecentActivityListProps {
    activities: RecentActivity[];
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
    const { t } = useTranslation();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'referral':
                return t('icons.user');
            case 'commission':
                return t('icons.money');
            case 'affiliate_joined':
                return t('icons.celebration');
            case 'campaign_created':
                return t('icons.announcement');
            default:
                return t('icons.clipboard');
        }
    };

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
                <div className="space-y-8">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                            <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.description}
                                </p>
                                <div className="flex items-center pt-2">
                                    <time className="text-xs text-muted-foreground">
                                        {formatDate(activity.date)}
                                    </time>
                                    {activity.amount && (
                                        <span className="ml-4 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                                            ${activity.amount.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}