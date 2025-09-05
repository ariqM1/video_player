"use client";

import { SearchDropdown } from "@/components/SearchDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchVideos, Video } from "@/lib/api-client";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Navbar() {
	const [searchQuery, setSearchQuery] = useState("");
	const [mounted, setMounted] = useState(false);
	const [suggestions, setSuggestions] = useState<Video[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isLoading, setIsLoading] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	// Debounced search for suggestions
	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (searchQuery.length >= 3) {
				setIsLoading(true);
				try {
					const results = await searchVideos(searchQuery);
					setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
					setShowDropdown(true);
					setSelectedIndex(-1);
				} catch (error) {
					console.error("Search suggestions error:", error);
					setSuggestions([]);
				} finally {
					setIsLoading(false);
				}
			} else {
				setSuggestions([]);
				setShowDropdown(false);
				setSelectedIndex(-1);
			}
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
				setSelectedIndex(-1);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();

		// If a suggestion is selected, navigate to that video
		if (selectedIndex >= 0 && suggestions[selectedIndex]) {
			const selectedVideo = suggestions[selectedIndex];
			router.push(`/videos/${selectedVideo.id}`);
			setSearchQuery("");
			setShowDropdown(false);
			setSelectedIndex(-1);
			return;
		}

		// Otherwise, perform regular search
		if (searchQuery.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
			setShowDropdown(false);
			setSelectedIndex(-1);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!showDropdown || suggestions.length === 0) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev < suggestions.length - 1 ? prev + 1 : prev
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
				break;
			case "Escape":
				setShowDropdown(false);
				setSelectedIndex(-1);
				break;
		}
	};

	const handleSuggestionClick = (video: Video) => {
		router.push(`/videos/${video.id}`);
		setSearchQuery("");
		setShowDropdown(false);
		setSelectedIndex(-1);
	};

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center px-4">
				{/* Logo */}
				<div className="mr-4 md:mr-8">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-bold md:text-2xl">
							StreamApp
						</span>
					</Link>
				</div>

				{/* Search Bar - Center */}
				<div className="flex-1 flex items-center justify-center px-4">
					<form
						onSubmit={handleSearch}
						className="w-full max-w-sm md:max-w-md lg:max-w-xl"
					>
						<div ref={searchRef} className="relative">
							<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search videos..."
								className="w-full pl-8 pr-4"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={handleKeyDown}
								onFocus={() => {
									if (
										searchQuery.length >= 3 &&
										suggestions.length > 0
									) {
										setShowDropdown(true);
									}
								}}
								autoComplete="off"
							/>
							<SearchDropdown
								suggestions={suggestions}
								isVisible={showDropdown && !isLoading}
								onItemClick={handleSuggestionClick}
								selectedIndex={selectedIndex}
							/>
						</div>
					</form>
				</div>

				{/* Dark Mode Toggle - Right */}
				<div className="ml-4 md:ml-8">
					<Button
						variant="ghost"
						size="icon"
						onClick={() =>
							mounted &&
							setTheme(theme === "dark" ? "light" : "dark")
						}
						className="h-9 w-9"
						disabled={!mounted}
					>
						{!mounted ? (
							<Moon className="h-4 w-4" />
						) : theme === "dark" ? (
							<Sun className="h-4 w-4" />
						) : (
							<Moon className="h-4 w-4" />
						)}
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
		</nav>
	);
}
