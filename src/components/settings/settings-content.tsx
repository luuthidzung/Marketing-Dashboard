'use client';

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAppContext } from "@/context/app-context";

export default function SettingsContent() {
    const { t, i18n } = useTranslation();
    const { theme } = useAppContext();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {t("common.settings")}
                </h1>
                <p className="text-muted-foreground">{t("common.settings")}</p>
            </div>

            <Tabs defaultValue="appearance">
                <TabsList>
                    <TabsTrigger value="appearance">{t("settings.theme")}</TabsTrigger>
                    <TabsTrigger value="language">{t("settings.language")}</TabsTrigger>
                    <TabsTrigger value="profile">{t("settings.profile")}</TabsTrigger>
                </TabsList>
                <TabsContent value="appearance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("settings.theme")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label>{t("settings.theme")}</Label>
                                <div className="flex items-center space-x-2">
                                    <Select
                                        value={theme}
                                        onValueChange={(value) => {
                                            const appContext = document.querySelector("[data-app-context]");
                                            if (appContext) {
                                                const setTheme = JSON.parse(appContext.getAttribute("data-set-theme") || "{}");
                                                setTheme(value);
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={t("settings.theme")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">{t("settings.lightMode")}</SelectItem>
                                            <SelectItem value="dark">{t("settings.darkMode")}</SelectItem>
                                            <SelectItem value="system">{t("settings.systemDefault")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ThemeSwitcher />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="language" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("settings.language")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label>{t("settings.language")}</Label>
                                <div className="flex items-center space-x-2">
                                    <Select
                                        value={i18n.language}
                                        onValueChange={(value) => {
                                            i18n.changeLanguage(value);
                                        }}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={t("settings.language")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("settings.profile")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-4">
                                    <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
                                        <img
                                            className="aspect-square h-full w-full"
                                            src="https://i.pravatar.cc/150?img=12"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium">Admin</p>
                                        <p className="text-sm text-muted-foreground">admin@micace.com</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}




