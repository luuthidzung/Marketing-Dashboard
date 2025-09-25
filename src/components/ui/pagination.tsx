import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className
}: PaginationProps) {
    const { t } = useTranslation();

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages is less than max pages to show
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always include first page
            pageNumbers.push(1);

            // Calculate start and end of page numbers to show
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                startPage = 2;
                endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = Math.max(2, totalPages - maxPagesToShow + 2);
                endPage = totalPages - 1;
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push('...');
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always include last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center space-x-2 py-4", className)}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                aria-label={t('pagination.first')}
            >
                <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label={t('pagination.previous')}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <Button
                            key={index}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => onPageChange(page)}
                            aria-label={t('pagination.page', { page })}
                            className="h-8 w-8"
                        >
                            {page}
                        </Button>
                    ) : (
                        <span key={index} className="px-2">
                            {page}
                        </span>
                    )
                ))}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label={t('pagination.next')}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                aria-label={t('pagination.last')}
            >
                <ChevronsRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
