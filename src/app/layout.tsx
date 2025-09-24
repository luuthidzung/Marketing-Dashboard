import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/app-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Affiliate Marketing Dashboard',
    description: 'Dashboard for affiliate marketing management',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}


