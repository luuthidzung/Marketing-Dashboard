import { NextResponse } from 'next/server';
import { mockReferrals, mockAffiliates, mockCampaigns } from '@/lib/mock-data';

export async function GET(request: Request) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { searchParams } = new URL(request.url);
    const affiliateId = searchParams.get('affiliateId');
    const campaignId = searchParams.get('campaignId');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    let filteredReferrals = [...mockReferrals];

    // Apply affiliate filter
    if (affiliateId) {
        filteredReferrals = filteredReferrals.filter(
            (referral) => referral.affiliateId === affiliateId
        );
    }

    // Apply campaign filter
    if (campaignId) {
        filteredReferrals = filteredReferrals.filter(
            (referral) => referral.campaignId === campaignId
        );
    }

    // Apply status filter
    if (status) {
        filteredReferrals = filteredReferrals.filter(
            (referral) => referral.status === status
        );
    }

    // Apply sorting
    if (sortBy) {
        filteredReferrals.sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
    }

    // Enhance referrals with affiliate and campaign details
    const enhancedReferrals = filteredReferrals.map(referral => {
        const affiliate = mockAffiliates.find(a => a.id === referral.affiliateId);
        const campaign = mockCampaigns.find(c => c.id === referral.campaignId);

        return {
            ...referral,
            affiliate: affiliate ? { id: affiliate.id, name: affiliate.name } : null,
            campaign: campaign ? { id: campaign.id, name: campaign.name } : null,
        };
    });

    return NextResponse.json(enhancedReferrals);
}


