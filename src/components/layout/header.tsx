import { useTranslation } from 'react-i18next';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useAppContext } from '@/context/app-context';

export function Header() {
    const { t } = useTranslation();
    const { notifications, sidebarOpen, setSidebarOpen } = useAppContext();

    const unreadNotifications = notifications.filter(
        (notification) => !notification.read
    ).length;

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b glass-effect shadow-sm px-4 md:px-6 animate-fade-in">
            <div className="flex items-center gap-2 md:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden shadow-button"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">{t('common.toggleMenu')}</span>
                </Button>
            </div>
            <div className="hidden md:flex md:flex-1">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder={t('common.search')}
                        className="w-72 rounded-full border border-input bg-background/50 pl-10 pr-4 py-2 text-sm shadow-inner ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300 focus:w-80"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <Button variant="outline" size="icon" className="relative shadow-button hover:shadow-button-hover transition-all duration-300">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                        <span className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-[10px] text-white shadow-sm">
                            {unreadNotifications}
                        </span>
                    )}
                    <span className="sr-only">{t('common.notifications')}</span>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex gap-3 items-center hover:bg-muted/50 transition-all duration-300"
                >
                    <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 shadow-sm">
                        <img
                            className="aspect-square h-full w-full object-cover"
                            src="https://i.pravatar.cc/150?img=12"
                            alt="Avatar"
                        />
                    </span>
                    <div className="flex flex-col items-start text-sm">
                        <span className="font-medium">Admin</span>
                        <span className="text-xs text-muted-foreground">admin@micace.com</span>
                    </div>
                </Button>
            </div>
        </header>
    );
}
