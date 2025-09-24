'use client';

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCampaigns } from "@/hooks/use-campaigns";
import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { CampaignsFilter } from "@/components/campaigns/campaigns-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CampaignsContent() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sortBy, setSortBy] = useState("revenue");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const { data: campaigns, isLoading, error } = useCampaigns({
        search,
        status: status === "all" ? "" : status,
        sortBy,
        sortOrder,
    });

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {t("campaigns.manage")}
                </h1>
                <p className="text-muted-foreground">{t("common.campaigns")}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("common.campaigns")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <CampaignsFilter
                            search={search}
                            setSearch={setSearch}
                            status={status}
                            setStatus={setStatus}
                        />

                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <p>{t("common.loading")}</p>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-64">
                                <p className="text-destructive">{t("common.error")}</p>
                            </div>
                        ) : (
                            <CampaignsTable
                                campaigns={campaigns || []}
                                sortBy={sortBy}
                                sortOrder={sortOrder}
                                onSort={handleSort}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
