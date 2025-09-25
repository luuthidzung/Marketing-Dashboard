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
                'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out glass-effect border-r shadow-lg',
                sidebarOpen ? 'w-64 translate-x-0' : 'w-16 translate-x-0 sm:translate-x-0',
                !sidebarOpen && 'max-sm:-translate-x-full'
            )}
        >
            <div className="flex h-full flex-col justify-between">
                <div>
                    <div className={cn(
                        "flex h-16 items-center justify-between px-4 gradient-primary",
                        sidebarOpen ? "px-6" : "px-3"
                    )}>
                        {sidebarOpen ? (
                            <>
                                <h1 className="text-xl font-bold text-white">M'DA System</h1>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="ml-auto text-white hover:bg-white/10"
                                    aria-label={t('common.closeSidebar')}
                                >
                                    <ChevronLeft size={18} />
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="mx-auto text-white hover:bg-white/10"
                                aria-label={t('common.openSidebar')}
                            >
                                <ChevronRight size={18} />
                            </Button>
                        )}
                    </div>
                    <nav className="space-y-2 px-3 py-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover-scale',
                                    pathname === item.href
                                        ? 'gradient-primary text-white shadow-button'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                <item.icon className={cn('h-5 w-5', sidebarOpen ? 'mr-3' : 'mx-auto')} />
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        ))}
                    </nav>
                </div>
                {sidebarOpen && (
                    <div className="m-3 p-3 rounded-lg bg-muted/50 text-xs text-center text-muted-foreground">
                        <p className="mt-1">© 2025 All Rights Reserved</p>
                    </div>
                )}
            </div>
        </aside>
    );
}
