import { NextResponse } from 'next/server';
import { mockCampaigns } from '@/lib/mock-data';

export async function GET(request: Request) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    let filteredCampaigns = [...mockCampaigns];

    // Apply search filter
    if (search) {
        filteredCampaigns = filteredCampaigns.filter(
            (campaign) =>
                campaign.name.toLowerCase().includes(search) ||
                (campaign.description && campaign.description.toLowerCase().includes(search))
        );
    }

    // Apply status filter
    if (status) {
        filteredCampaigns = filteredCampaigns.filter(
            (campaign) => campaign.status === status
        );
    }

    // Apply sorting
    if (sortBy) {
        filteredCampaigns.sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
    }

    return NextResponse.json(filteredCampaigns);
}

