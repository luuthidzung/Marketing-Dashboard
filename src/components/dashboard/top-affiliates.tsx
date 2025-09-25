import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopAffiliate } from "@/lib/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

interface TopAffiliatesProps {
    affiliates: TopAffiliate[];
}

export function TopAffiliates({ affiliates }: TopAffiliatesProps) {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('dashboard.topAffiliates')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('affiliates.name')}</TableHead>
                            <TableHead className="text-right">{t('affiliates.earnings')}</TableHead>
                            <TableHead className="text-right">{t('affiliates.referrals')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {affiliates.map((affiliate) => (
                            <TableRow key={affiliate.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center">
                                        {affiliate.avatar && (
                                            <img
                                                src={affiliate.avatar}
                                                alt={affiliate.name}
                                                className="mr-2 h-6 w-6 rounded-full"
                                            />
                                        )}
                                        <span>{affiliate.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    ${affiliate.earnings.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {affiliate.referrals}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}




