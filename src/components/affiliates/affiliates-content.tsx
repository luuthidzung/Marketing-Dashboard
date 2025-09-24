'use client';

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAffiliates } from "@/hooks/use-affiliates";
import { AffiliatesTable } from "@/components/affiliates/affiliates-table";
import { AffiliatesFilter } from "@/components/affiliates/affiliates-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AffiliatesContent() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sortBy, setSortBy] = useState("earnings");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const { data: affiliates, isLoading, error } = useAffiliates({
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
                            <AffiliatesTable
                                affiliates={affiliates || []}
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
