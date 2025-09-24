import { useTranslation } from 'react-i18next';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useAppContext } from '@/context/app-context';

export function Header() {
    const { t } = useTranslation();
    const { notifications } = useAppContext();

    const unreadNotifications = notifications.filter(
        (notification) => !notification.read
    ).length;

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-2 md:hidden">
                <Button variant="outline" size="icon" className="md:hidden">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">{t('common.search')}</span>
                </Button>
            </div>
            <div className="hidden md:flex md:flex-1">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder={t('common.search')}
                        className="w-64 rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                            {unreadNotifications}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex gap-2 items-center"
                >
                    <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                        <img
                            className="aspect-square h-full w-full"
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
