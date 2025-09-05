"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VideoCard from "@/components/VideoCard";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { searchVideos, Video } from "@/lib/api-client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Video[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Get search query from URL
	const queryParam = searchParams.get("q") || "";

	useEffect(() => {
		setSearchQuery(queryParam);
	}, [queryParam]);

	useEffect(() => {
		async function performSearch() {
			if (!queryParam.trim()) {
				setSearchResults([]);
				return;
			}

			try {
				setIsLoading(true);
				setError(null);
				const results = await searchVideos(queryParam);
				setSearchResults(results);
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

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
						{!isLoading && (
							<p className="text-muted-foreground">
								{searchResults.length} video
								{searchResults.length !== 1 ? "s" : ""} found
							</p>
						)}
					</div>

					{isLoading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{[...Array(8)].map((_, i) => (
								<VideoCardSkeleton key={i} />
							))}
						</div>
					) : searchResults.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{searchResults.map((video) => (
								<VideoCard
									key={video.id}
									id={video.id}
									title={video.title}
									thumbnail={video.thumbnail}
									category={video.category}
								/>
							))}
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
