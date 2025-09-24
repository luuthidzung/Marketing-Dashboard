'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Affiliate } from '@/lib/types';

interface UseAffiliatesProps {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export function useAffiliates({
    search,
    status,
    sortBy,
    sortOrder = 'asc',
}: UseAffiliatesProps = {}) {
    return useQuery<Affiliate[]>({
        queryKey: ['affiliates', { search, status, sortBy, sortOrder }],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (search) params.append('search', search);
            if (status) params.append('status', status);
            if (sortBy) {
                params.append('sortBy', sortBy);
                params.append('sortOrder', sortOrder);
            }

            const { data } = await axios.get(`/api/affiliates?${params.toString()}`);
            return data;
        },
    });
}
