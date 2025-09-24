import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignPerformance } from "@/lib/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

interface CampaignPerformanceListProps {
    campaigns: CampaignPerformance[];
}

export function CampaignPerformanceList({ campaigns }: CampaignPerformanceListProps) {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('dashboard.campaignPerformance')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('campaigns.name')}</TableHead>
                            <TableHead className="text-right">{t('campaigns.clicks')}</TableHead>
                            <TableHead className="text-right">{t('campaigns.conversions')}</TableHead>
                            <TableHead className="text-right">{t('campaigns.conversionRate')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">
                                    {campaign.name}
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


