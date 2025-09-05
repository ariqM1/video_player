"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
	if (totalPages <= 1) return null;

	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	return (
		<div className={cn("flex items-center justify-center space-x-2", className)}>
			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage <= 1}
				className="h-9 w-9"
			>
				<ChevronLeft className="h-4 w-4" />
				<span className="sr-only">Previous page</span>
			</Button>

			{getVisiblePages().map((page, index) => (
				<div key={index}>
					{page === '...' ? (
						<span className="flex items-center justify-center px-3 py-2 text-sm text-muted-foreground">
							...
						</span>
					) : (
						<Button
							variant={currentPage === page ? "default" : "outline"}
							size="icon"
							onClick={() => onPageChange(page as number)}
							className="h-9 w-9"
						>
							{page}
						</Button>
					)}
				</div>
			))}

			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
				className="h-9 w-9"
			>
				<ChevronRight className="h-4 w-4" />
				<span className="sr-only">Next page</span>
			</Button>
		</div>
	);
}