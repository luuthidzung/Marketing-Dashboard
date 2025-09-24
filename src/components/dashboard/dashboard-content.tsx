'use client';

import { useTranslation } from 'react-i18next';
import { StatsCard } from '@/components/dashboard/stats-card';
import { RecentActivityList } from '@/components/dashboard/recent-activity';
import { CommissionChart } from '@/components/dashboard/commission-chart';
import { TopAffiliates } from '@/components/dashboard/top-affiliates';
import { CampaignPerformanceList } from '@/components/dashboard/campaign-performance';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { Users, DollarSign, BarChart2, Target } from 'lucide-react';

export default function DashboardContent() {
    const { t } = useTranslation();
    const { data: dashboardData, isLoading, error } = useDashboardData();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.overview')}</h1>
                <p className="text-muted-foreground">{t('common.dashboard')}</p>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <p>{t('common.loading')}</p>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-64">
                    <p className="text-destructive">{t('common.error')}</p>
                </div>
            )}

            {dashboardData && (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatsCard
                            title={t('dashboard.totalReferrals')}
                            value={dashboardData.totalReferrals.toLocaleString()}
                            icon={Users}
                            trend={{ value: 12, positive: true }}
                        />
                        <StatsCard
                            title={t('dashboard.totalEarnings')}
                            value={`$${dashboardData.totalEarnings.toLocaleString()}`}
                            icon={DollarSign}
                            trend={{ value: 8, positive: true }}
                        />
                        <StatsCard
                            title={t('dashboard.conversionRate')}
                            value={`${(dashboardData.conversionRate * 100).toFixed(2)}%`}
                            icon={BarChart2}
                            trend={{ value: 3, positive: true }}
                        />
                        <StatsCard
                            title={t('campaigns.active')}
                            value={dashboardData.activeCampaigns}
                            icon={Target}
                            trend={{ value: 2, positive: false }}
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <CommissionChart data={dashboardData.commissionTrends} />
                        <RecentActivityList activities={dashboardData.recentActivity} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <TopAffiliates affiliates={dashboardData.topAffiliates} />
                        <CampaignPerformanceList campaigns={dashboardData.campaignPerformance} />
                    </div>
                </>
            )}
        </div>
    );
}
