'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { Providers } from "../providers";
import CampaignsContent from "@/components/campaigns/campaigns-content";

export default function CampaignsPage() {
    return (
        <Providers>
            <MainLayout>
                <CampaignsContent />
            </MainLayout>
        </Providers>
    );
}
