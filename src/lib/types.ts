export interface Affiliate {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive' | 'pending';
    earnings: number;
    referrals: number;
    joinDate: string;
    avatar?: string;
    conversionRate: number;
}

export interface Campaign {
    id: string;
    name: string;
    status: 'active' | 'inactive' | 'completed';
    clicks: number;
    conversions: number;
    revenue: number;
    startDate: string;
    endDate?: string;
    description?: string;
    conversionRate: number;
}

export interface Referral {
    id: string;
    affiliateId: string;
    campaignId: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
    commission: number;
    customerEmail: string;
}

export interface DashboardStats {
    totalReferrals: number;
    totalEarnings: number;
    conversionRate: number;
    activeAffiliates: number;
    activeCampaigns: number;
    recentActivity: RecentActivity[];
    commissionTrends: CommissionTrend[];
    topAffiliates: TopAffiliate[];
    campaignPerformance: CampaignPerformance[];
}

export interface RecentActivity {
    id: string;
    type: 'referral' | 'commission' | 'affiliate_joined' | 'campaign_created';
    date: string;
    description: string;
    amount?: number;
}

export interface CommissionTrend {
    date: string;
    amount: number;
}

export interface TopAffiliate {
    id: string;
    name: string;
    earnings: number;
    referrals: number;
    avatar?: string;
}

export interface CampaignPerformance {
    id: string;
    name: string;
    clicks: number;
    conversions: number;
    conversionRate: number;
}




