'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Providers } from './providers';
import DashboardContent from '@/components/dashboard/dashboard-content';

export default function Home() {
    return (
        <Providers>
            <MainLayout>
                <DashboardContent />
            </MainLayout>
        </Providers>
    );
}