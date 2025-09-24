'use client';

import { ReactNode } from 'react';
import { useAppContext } from '@/context/app-context';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const { sidebarOpen } = useAppContext();

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div
                className={cn(
                    'flex flex-1 flex-col transition-all duration-300 ease-in-out',
                    sidebarOpen ? 'ml-64' : 'ml-16'
                )}
            >
                <Header />
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}


