'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { Providers } from "../providers";
import AffiliatesContent from "@/components/affiliates/affiliates-content";

export default function AffiliatesPage() {
    return (
        <Providers>
            <MainLayout>
                <AffiliatesContent />
            </MainLayout>
        </Providers>
    );
}
