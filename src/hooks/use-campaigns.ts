'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Campaign } from '@/lib/types';

interface UseCampaignsProps {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export function useCampaigns({
    search,
    status,
    sortBy,
    sortOrder = 'asc',
}: UseCampaignsProps = {}) {
    return useQuery<Campaign[]>({
        queryKey: ['campaigns', { search, status, sortBy, sortOrder }],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (search) params.append('search', search);
            if (status) params.append('status', status);
            if (sortBy) {
                params.append('sortBy', sortBy);
                params.append('sortOrder', sortOrder);
            }

            const { data } = await axios.get(`/api/campaigns?${params.toString()}`);
            return data;
        },
    });
}
