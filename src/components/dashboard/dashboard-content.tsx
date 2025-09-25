'use client';

import { useTranslation } from 'react-i18next';
import { StatsCard } from '@/components/dashboard/stats-card';
import { RecentActivityList } from '@/components/dashboard/recent-activity';
import { CommissionChart } from '@/components/dashboard/commission-chart';
import { TopAffiliates } from '@/components/dashboard/top-affiliates';
import { CampaignPerformanceList } from '@/components/dashboard/campaign-performance';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { Users, DollarSign, BarChart2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardContent() {
    const { t } = useTranslation();
    const { data: dashboardData, isLoading, error } = useDashboardData();

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('dashboard.overview')}</h1>
                <p className="text-muted-foreground">{t('common.dashboard')}</p>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <div className="flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                        <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-64">
                    <div className="p-6 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
                        <p className="text-destructive font-medium">{t('common.error')}</p>
                        <Button variant="outline" className="mt-4">
                            {t('common.retry')}
                        </Button>
                    </div>
                </div>
            )}

            {dashboardData && (
                <>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
                            <StatsCard
                                title={t('dashboard.totalReferrals')}
                                value={dashboardData.totalReferrals.toLocaleString()}
                                icon={Users}
                                trend={{ value: 12, positive: true }}
                            />
                        </div>
                        <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                            <StatsCard
                                title={t('dashboard.totalEarnings')}
                                value={`$${dashboardData.totalEarnings.toLocaleString()}`}
                                icon={DollarSign}
                                trend={{ value: 8, positive: true }}
                            />
                        </div>
                        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                            <StatsCard
                                title={t('dashboard.conversionRate')}
                                value={`${(dashboardData.conversionRate * 100).toFixed(2)}%`}
                                icon={BarChart2}
                                trend={{ value: 3, positive: true }}
                            />
                        </div>
                        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                            <StatsCard
                                title={t('campaigns.active')}
                                value={dashboardData.activeCampaigns}
                                icon={Target}
                                trend={{ value: 2, positive: false }}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
                        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '400ms' }}>
                            <Card className="overflow-hidden hover-scale">
                                <CardHeader className="sm:flex-row sm:items-center sm:justify-between">
                                    <CardTitle className="text-lg">
                                        {t('dashboard.commissionTrends')}
                                    </CardTitle>
                                    <div className="hidden sm:flex space-x-2 mt-2 sm:mt-0">
                                        <Button variant="outline" size="sm">7D</Button>
                                        <Button variant="outline" size="sm">30D</Button>
                                        <Button variant="primary" size="sm">90D</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-2 sm:px-6">
                                    <div className="h-[300px] sm:h-[350px]">
                                        <CommissionChart data={dashboardData.commissionTrends} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
                            <Card className="overflow-hidden h-full hover-scale">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        {t('dashboard.recentActivity')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="max-h-[350px] overflow-auto pr-2">
                                        <RecentActivityList activities={dashboardData.recentActivity} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                        <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                            <Card className="overflow-hidden h-full hover-scale">
                                <CardHeader className="flex-row items-center justify-between">
                                    <CardTitle className="text-lg">
                                        {t('dashboard.topAffiliates')}
                                    </CardTitle>
                                    <Button variant="outline" size="sm" className="hidden sm:flex">
                                        {t('common.viewAll')}
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="max-h-[350px] overflow-auto pr-2">
                                        <TopAffiliates affiliates={dashboardData.topAffiliates} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="animate-slide-up" style={{ animationDelay: '700ms' }}>
                            <Card className="overflow-hidden h-full hover-scale">
                                <CardHeader className="flex-row items-center justify-between">
                                    <CardTitle className="text-lg">
                                        {t('dashboard.campaignPerformance')}
                                    </CardTitle>
                                    <Button variant="outline" size="sm" className="hidden sm:flex">
                                        {t('common.viewAll')}
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="max-h-[350px] overflow-auto pr-2">
                                        <CampaignPerformanceList campaigns={dashboardData.campaignPerformance} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
