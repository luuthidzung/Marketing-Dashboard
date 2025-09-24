import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/lib/types";
import { CampaignStatusBadge } from "./campaign-status-badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CampaignsTableProps {
    campaigns: Campaign[];
    sortBy: string;
    sortOrder: "asc" | "desc";
    onSort: (column: string) => void;
}

export function CampaignsTable({
    campaigns,
    sortBy,
    sortOrder,
    onSort,
}: CampaignsTableProps) {
    const { t } = useTranslation();

    const SortHeader = ({ column, label }: { column: string; label: string }) => (
        <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 p-0 font-medium hover:bg-transparent"
            onClick={() => onSort(column)}
        >
            {label}
            {sortBy === column ? (
                sortOrder === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                ) : (
                    <ChevronDown className="h-4 w-4" />
                )
            ) : null}
        </Button>
    );

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <SortHeader column="name" label={t("campaigns.name")} />
                        </TableHead>
                        <TableHead>
                            <SortHeader column="status" label={t("campaigns.status")} />
                        </TableHead>
                        <TableHead className="text-right">
                            <SortHeader column="clicks" label={t("campaigns.clicks")} />
                        </TableHead>
                        <TableHead className="text-right">
                            <SortHeader column="conversions" label={t("campaigns.conversions")} />
                        </TableHead>
                        <TableHead className="text-right">
                            <SortHeader column="conversionRate" label={t("campaigns.conversionRate")} />
                        </TableHead>
                        <TableHead className="text-right">
                            <SortHeader column="revenue" label={t("campaigns.revenue")} />
                        </TableHead>
                        <TableHead>
                            <SortHeader column="startDate" label={t("campaigns.startDate")} />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {campaigns.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8">
                                {t("common.noData")}
                            </TableCell>
                        </TableRow>
                    ) : (
                        campaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>
                                    <CampaignStatusBadge status={campaign.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    {campaign.clicks.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {campaign.conversions.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {(campaign.conversionRate * 100).toFixed(2)}%
                                </TableCell>
                                <TableCell className="text-right">
                                    ${campaign.revenue.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(campaign.startDate).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}