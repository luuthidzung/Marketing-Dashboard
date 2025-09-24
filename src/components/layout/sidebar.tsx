import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    Megaphone,
    Settings,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';

export function Sidebar() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen } = useAppContext();

    const navItems = [
        {
            name: t('common.dashboard'),
            href: '/',
            icon: LayoutDashboard,
        },
        {
            name: t('common.affiliates'),
            href: '/affiliates',
            icon: Users,
        },
        {
            name: t('common.campaigns'),
            href: '/campaigns',
            icon: Megaphone,
        },
        {
            name: t('common.settings'),
            href: '/settings',
            icon: Settings,
        },
    ];

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen bg-background transition-all duration-300 ease-in-out border-r',
                sidebarOpen ? 'w-64' : 'w-16'
            )}
        >
            <div className="flex h-full flex-col justify-between">
                <div>
                    <div className="flex h-16 items-center justify-between px-4">
                        {sidebarOpen ? (
                            <h1 className="text-xl font-bold">M'DA System</h1>
                        ) : (
                            <h1 className="text-xl font-bold mx-auto">M'DA System</h1>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="ml-auto"
                            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                        >
                            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                        </Button>
                    </div>
                    <nav className="space-y-1 px-2 py-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
                                    pathname === item.href
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                <item.icon className={cn('h-5 w-5', sidebarOpen ? 'mr-3' : 'mx-auto')} />
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
