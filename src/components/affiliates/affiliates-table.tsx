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
import { Affiliate } from "@/lib/types";
import { AffiliateStatusBadge } from "./affiliate-status-badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AffiliatesTableProps {
    affiliates: Affiliate[];
    sortBy: string;
    sortOrder: "asc" | "desc";
    onSort: (column: string) => void;
}

export function AffiliatesTable({
    affiliates,
    sortBy,
    sortOrder,
    onSort,
}: AffiliatesTableProps) {
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
                            <SortHeader column="name" label={t("affiliates.name")} />
                        </TableHead>
                        <TableHead>
                            <SortHeader column="email" label={t("affiliates.email")} />
                        </TableHead>
                        <TableHead>
                            <SortHeader column="status" label={t("affiliates.status")} />
                        </TableHead>
                        <TableHead className="text-right">
                            <SortHeader column="earnings" label={t("affiliates.earnings")} />
                        </TableHead>
                        <TableHead className="text-right">
                            <SortHeader column="referrals" label={t("affiliates.referrals")} />
                        </TableHead>
                        <TableHead className="text-right">
                            <SortHeader column="conversionRate" label={t("campaigns.conversionRate")} />
                        </TableHead>
                        <TableHead>
                            <SortHeader column="joinDate" label={t("affiliates.joinDate")} />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {affiliates.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8">
                                {t("common.noData")}
                            </TableCell>
                        </TableRow>
                    ) : (
                        affiliates.map((affiliate) => (
                            <TableRow key={affiliate.id}>
                                <TableCell>
                                    <div className="flex items-center">
                                        {affiliate.avatar && (
                                            <img
                                                src={affiliate.avatar}
                                                alt={affiliate.name}
                                                className="mr-2 h-8 w-8 rounded-full"
                                            />
                                        )}
                                        <span className="font-medium">{affiliate.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{affiliate.email}</TableCell>
                                <TableCell>
                                    <AffiliateStatusBadge status={affiliate.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    ${affiliate.earnings.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {affiliate.referrals}
                                </TableCell>
                                <TableCell className="text-right">
                                    {(affiliate.conversionRate * 100).toFixed(2)}%
                                </TableCell>
                                <TableCell>
                                    {new Date(affiliate.joinDate).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}