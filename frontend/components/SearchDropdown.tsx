"use client";

import { Video } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SearchDropdownProps {
	suggestions: Video[];
	isVisible: boolean;
	onItemClick: (video: Video) => void;
	selectedIndex: number;
}


export function SearchDropdown({
	suggestions,
	isVisible,
	onItemClick,
	selectedIndex,
}: SearchDropdownProps) {
	const dropdownRef = useRef<HTMLDivElement>(null);

	if (!isVisible || suggestions.length === 0) {
		return null;
	}

	return (
		<div
			ref={dropdownRef}
			className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
		>
			{suggestions.map((video, index) => (
				<Link
					key={video.id}
					href={`/videos/${video.id}`}
					onClick={() => onItemClick(video)}
					className={cn(
						"flex items-center gap-3 px-4 py-3 hover:bg-accent hover:text-accent-foreground border-b border-border last:border-b-0 transition-colors",
						selectedIndex === index &&
							"bg-accent text-accent-foreground"
					)}
				>
					<Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
					<div className="flex-1 min-w-0">
						<div className="font-medium truncate">
							{video.title}
						</div>
						<div className="text-xs text-muted-foreground truncate">
							{video.category} • {video.duration}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
