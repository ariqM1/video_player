"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [searchQuery, setSearchQuery] = useState("");
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
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
						<div className="relative">
							<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search videos..."
								className="w-full pl-8 pr-4"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
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
							mounted && setTheme(theme === "dark" ? "light" : "dark")
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
