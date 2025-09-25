'use client';

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCampaigns } from "@/hooks/use-campaigns";
import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { CampaignsFilter } from "@/components/campaigns/campaigns-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

export default function CampaignsContent() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sortBy, setSortBy] = useState("revenue");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const { data: allCampaigns, isLoading, error } = useCampaigns({
        search,
        status: status === "all" ? "" : status,
        sortBy,
        sortOrder,
    });

    const [paginatedCampaigns, setPaginatedCampaigns] = useState<typeof allCampaigns>([]);
    const [totalPages, setTotalPages] = useState(1);

    // Handle pagination
    useEffect(() => {
        if (allCampaigns) {
            setTotalPages(Math.ceil(allCampaigns.length / itemsPerPage));

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setPaginatedCampaigns(allCampaigns.slice(startIndex, endIndex));
        }
    }, [allCampaigns, currentPage, itemsPerPage]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, status, sortBy, sortOrder]);

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
                            <>
                                <CampaignsTable
                                    campaigns={paginatedCampaigns || []}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    onSort={handleSort}
                                />

                                <div className="mt-4">
                                    {allCampaigns && allCampaigns.length > 0 && (
                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                            <p className="text-sm text-muted-foreground">
                                                {t('pagination.showing', {
                                                    from: (currentPage - 1) * itemsPerPage + 1,
                                                    to: Math.min(currentPage * itemsPerPage, allCampaigns.length),
                                                    total: allCampaigns.length
                                                })}
                                            </p>
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={setCurrentPage}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
