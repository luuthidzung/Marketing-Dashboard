'use client';

import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/config';
import { AppProvider } from '@/context/app-context';

export function Providers({ children }: { children: ReactNode }) {
    // Create a client instance for each component instance
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }));

    // Initialize i18n
    useEffect(() => {
        if (!i18n.isInitialized) {
            i18n.init();
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <AppProvider>
                    {children}
                </AppProvider>
            </I18nextProvider>
        </QueryClientProvider>
    );
}
