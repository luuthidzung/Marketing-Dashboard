'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DashboardStats } from '@/lib/types';

export function useDashboardData() {
    return useQuery<DashboardStats>({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const { data } = await axios.get('/api/dashboard');
            return data;
        },
    });
}
