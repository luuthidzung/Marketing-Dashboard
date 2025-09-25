'use client';

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAffiliates } from "@/hooks/use-affiliates";
import { AffiliatesTable } from "@/components/affiliates/affiliates-table";
import { AffiliatesFilter } from "@/components/affiliates/affiliates-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

export default function AffiliatesContent() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sortBy, setSortBy] = useState("earnings");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const { data: allAffiliates, isLoading, error } = useAffiliates({
        search,
        status: status === "all" ? "" : status,
        sortBy,
        sortOrder,
    });

    const [paginatedAffiliates, setPaginatedAffiliates] = useState<typeof allAffiliates>([]);
    const [totalPages, setTotalPages] = useState(1);

    // Handle pagination
    useEffect(() => {
        if (allAffiliates) {
            setTotalPages(Math.ceil(allAffiliates.length / itemsPerPage));

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setPaginatedAffiliates(allAffiliates.slice(startIndex, endIndex));
        }
    }, [allAffiliates, currentPage, itemsPerPage]);

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
                    {t("affiliates.manage")}
                </h1>
                <p className="text-muted-foreground">{t("common.affiliates")}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("common.affiliates")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <AffiliatesFilter
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
                                <AffiliatesTable
                                    affiliates={paginatedAffiliates || []}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    onSort={handleSort}
                                />

                                <div className="mt-4">
                                    {allAffiliates && allAffiliates.length > 0 && (
                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                            <p className="text-sm text-muted-foreground">
                                                {t('pagination.showing', {
                                                    from: (currentPage - 1) * itemsPerPage + 1,
                                                    to: Math.min(currentPage * itemsPerPage, allAffiliates.length),
                                                    total: allAffiliates.length
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
