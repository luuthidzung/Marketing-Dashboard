'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { Providers } from "../providers";
import SettingsContent from "@/components/settings/settings-content";

export default function SettingsPage() {
    return (
        <Providers>
            <MainLayout>
                <SettingsContent />
            </MainLayout>
        </Providers>
    );
}
