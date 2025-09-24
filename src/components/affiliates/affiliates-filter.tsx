import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface AffiliatesFilterProps {
    search: string;
    setSearch: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
}

export function AffiliatesFilter({
    search,
    setSearch,
    status,
    setStatus,
}: AffiliatesFilterProps) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={t("affiliates.searchPlaceholder")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8"
                />
            </div>
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder={t("affiliates.filterBy")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">{t("affiliates.active")}</SelectItem>
                    <SelectItem value="inactive">{t("affiliates.inactive")}</SelectItem>
                    <SelectItem value="pending">{t("affiliates.pending")}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
