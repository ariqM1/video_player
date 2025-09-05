"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/Pagination";
import VideoCard from "@/components/VideoCard";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { searchVideos, Video } from "@/lib/api-client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SearchPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Video[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	// Get search query and page from URL
	const queryParam = searchParams.get("q") || "";
	const pageParam = parseInt(searchParams.get("page") || "1", 10);

	// Pagination constants
	const ITEMS_PER_PAGE = 20;

	// Calculate pagination data
	const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedResults = searchResults.slice(startIndex, endIndex);

	useEffect(() => {
		setSearchQuery(queryParam);
		setCurrentPage(Math.max(1, pageParam));
	}, [queryParam, pageParam]);

	useEffect(() => {
		async function performSearch() {
			if (!queryParam.trim()) {
				setSearchResults([]);
				setCurrentPage(1);
				return;
			}

			try {
				setIsLoading(true);
				setError(null);
				const results = await searchVideos(queryParam);
				setSearchResults(results);
				
				// Reset to page 1 if current page exceeds total pages
				const newTotalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
				if (pageParam > newTotalPages && newTotalPages > 0) {
					updateURLWithPage(1);
				}
			} catch (err) {
				console.error("Search error:", err);
				setError(
					`Search failed: ${
						err instanceof Error ? err.message : "Unknown error"
					}`
				);
			} finally {
				setIsLoading(false);
			}
		}

		performSearch();
	}, [queryParam]);

	const updateURLWithPage = (page: number) => {
		const params = new URLSearchParams();
		if (queryParam) params.set("q", queryParam);
		if (page > 1) params.set("page", page.toString());
		
		const newURL = `/search${params.toString() ? `?${params.toString()}` : ""}`;
		router.push(newURL);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		updateURLWithPage(page);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			const params = new URLSearchParams();
			params.set("q", searchQuery.trim());
			router.push(`/search?${params.toString()}`);
		}
	};

	const clearSearch = () => {
		setSearchQuery("");
		router.push("/search");
	};

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center py-16">
					<h2 className="text-2xl font-semibold mb-4">Error</h2>
					<p className="text-muted-foreground mb-8">{error}</p>
					<Button onClick={() => window.location.reload()}>
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Search Results */}
			{searchQuery.trim() ? (
				<div>
					<div className="mb-6">
						<h2 className="text-xl font-semibold">
							Search results for "{searchQuery}"
						</h2>
						{!isLoading && searchResults.length > 0 && (
							<div className="text-muted-foreground space-y-1">
								<p>
									{searchResults.length} video
									{searchResults.length !== 1 ? "s" : ""} found
								</p>
								{totalPages > 1 && (
									<p>
										Showing {startIndex + 1} - {Math.min(endIndex, searchResults.length)} of {searchResults.length} results
										(Page {currentPage} of {totalPages})
									</p>
								)}
							</div>
						)}
					</div>

					{isLoading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{[...Array(20)].map((_, i) => (
								<VideoCardSkeleton key={i} />
							))}
						</div>
					) : searchResults.length > 0 ? (
						<div className="space-y-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
								{paginatedResults.map((video) => (
									<VideoCard
										key={video.id}
										id={video.id}
										title={video.title}
										thumbnail={video.thumbnail}
										category={video.category}
									/>
								))}
							</div>
							
							{totalPages > 1 && (
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={handlePageChange}
									className="mt-8"
								/>
							)}
						</div>
					) : (
						<div className="text-center py-16">
							<h3 className="text-lg font-semibold mb-2">
								No results found
							</h3>
							<p className="text-muted-foreground">
								Try adjusting your search terms or browse our
								categories.
							</p>
						</div>
					)}
				</div>
			) : (
				<div className="text-center py-16">
					<h3 className="text-lg font-semibold mb-2">
						Start searching
					</h3>
					<p className="text-muted-foreground">
						Enter a search term above to find videos by title,
						description, or category.
					</p>
				</div>
			)}
		</div>
	);
}
