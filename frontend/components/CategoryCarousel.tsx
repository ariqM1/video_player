"use client";

import { Button } from "@/components/ui/button";
import VideoCard from "@/components/VideoCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface Video {
	id: string;
	title: string;
	thumbnail: string;
	category: string;
}

interface CategoryCarouselProps {
	title: string;
	videos: Video[];
}

export default function CategoryCarousel({
	title,
	videos,
}: CategoryCarouselProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
			const currentScroll = scrollContainerRef.current.scrollLeft;
			const targetScroll =
				direction === "left"
					? currentScroll - scrollAmount
					: currentScroll + scrollAmount;

			scrollContainerRef.current.scrollTo({
				left: targetScroll,
				behavior: "smooth",
			});
		}
	};

	return (
		<section className="relative">
			<h2 className="mb-4 text-2xl font-semibold">{title}</h2>

			<div className="group relative">
				{/* Left scroll button */}
				<Button
					variant="ghost"
					size="icon"
					className="absolute left-0 top-1/2 z-10 h-20 w-10 -translate-y-1/2 rounded-r-md bg-background/80 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background/90 group-hover:opacity-100"
					onClick={() => scroll("left")}
				>
					<ChevronLeft className="h-6 w-6" />
					<span className="sr-only">Scroll left</span>
				</Button>

				{/* Right scroll button */}
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-0 top-1/2 z-10 h-20 w-10 -translate-y-1/2 rounded-l-md bg-background/80 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background/90 group-hover:opacity-100"
					onClick={() => scroll("right")}
				>
					<ChevronRight className="h-6 w-6" />
					<span className="sr-only">Scroll right</span>
				</Button>

				{/* Scrollable container */}
				<div
					ref={scrollContainerRef}
					className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
						WebkitScrollbar: { display: "none" },
					}}
				>
					{videos.map((video) => (
						<div
							key={video.id}
							className="w-[210px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[360px]"
						>
							<VideoCard
								id={video.id}
								title={video.title}
								thumbnail={video.thumbnail}
								category={video.category}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
