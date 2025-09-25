import { NextResponse } from 'next/server';
import { mockAffiliates } from '@/lib/mock-data';

export async function GET(request: Request) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    let filteredAffiliates = [...mockAffiliates];

    // Apply search filter
    if (search) {
        filteredAffiliates = filteredAffiliates.filter(
            (affiliate) =>
                affiliate.name.toLowerCase().includes(search) ||
                affiliate.email.toLowerCase().includes(search)
        );
    }

    // Apply status filter
    if (status) {
        filteredAffiliates = filteredAffiliates.filter(
            (affiliate) => affiliate.status === status
        );
    }

    if (sortBy) {
        filteredAffiliates.sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
    }

    return NextResponse.json(filteredAffiliates);
}

