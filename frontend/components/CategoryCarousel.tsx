"use client";

import { Button } from "@/components/ui/button";
import VideoCard from "@/components/VideoCard";
import { animate, motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Video {
	id: string;
	title: string;
	thumbnail: string;
	category: string;
}

interface CategoryCarouselProps {
	title: string;
	videos: Video[];
	isFirstCarousel?: boolean;
}

export default function CategoryCarousel({
	title,
	videos,
	isFirstCarousel = false,
}: CategoryCarouselProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const [containerWidth, setContainerWidth] = useState(0);
	const [contentWidth, setContentWidth] = useState(0);

	useEffect(() => {
		if (scrollContainerRef.current) {
			setContainerWidth(scrollContainerRef.current.offsetWidth);
			setContentWidth(scrollContainerRef.current.scrollWidth);
		}
	}, [videos]);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = containerWidth * 0.8;
			const currentX = x.get();
			const maxScroll = -(contentWidth - containerWidth);

			const targetX =
				direction === "left"
					? Math.min(currentX + scrollAmount, 0)
					: Math.max(currentX - scrollAmount, maxScroll);

			animate(x, targetX, {
				type: "spring",
				stiffness: 300,
				damping: 30,
			});
		}
	};

	return (
		<section className="relative mb-8 md:mb-12">
			<h2 className="mb-4 px-4 text-xl font-bold md:mb-6 md:px-0 md:text-2xl lg:text-3xl">
				{title}
			</h2>

			<div className="group relative -mx-4 md:mx-0">
				{/* Left scroll button */}
				<Button
					variant="ghost"
					size="icon"
					className="absolute left-2 top-1/2 z-10 hidden h-16 w-12 -translate-y-1/2 rounded-md bg-background/90 opacity-0 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 group-hover:opacity-100 md:flex md:h-20 md:w-14 lg:left-4"
					onClick={() => scroll("left")}
				>
					<ChevronLeft className="h-8 w-8" />
					<span className="sr-only">Scroll left</span>
				</Button>

				{/* Right scroll button */}
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-2 top-1/2 z-10 hidden h-16 w-12 -translate-y-1/2 rounded-md bg-background/90 opacity-0 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 group-hover:opacity-100 md:flex md:h-20 md:w-14 lg:right-4"
					onClick={() => scroll("right")}
				>
					<ChevronRight className="h-8 w-8" />
					<span className="sr-only">Scroll right</span>
				</Button>

				{/* Scrollable container */}
				<div 
					ref={scrollContainerRef} 
					className="overflow-x-auto overflow-y-hidden px-4 md:overflow-hidden md:px-0"
					style={{
						scrollSnapType: "x mandatory",
						WebkitOverflowScrolling: "touch",
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
				>
					<motion.div
						className="flex gap-3 pb-4 md:gap-4 md:pb-0 lg:gap-6"
						style={{ x }}
						drag="x"
						dragConstraints={{
							left: -(contentWidth - containerWidth),
							right: 0,
						}}
						dragElastic={0.1}
						whileTap={{ cursor: "grabbing" }}
					>
						{videos.map((video, index) => (
							<motion.div
								key={video.id}
								className="w-[150px] flex-shrink-0 snap-center sm:w-[200px] md:w-[280px] lg:w-[320px] xl:w-[360px]"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.4,
									delay: index * 0.1,
									ease: "easeOut",
								}}
								whileHover={{ scale: 1.02 }}
							>
								<VideoCard
									id={video.id}
									title={video.title}
									thumbnail={video.thumbnail}
									category={video.category}
									priority={isFirstCarousel && index < 4}
								/>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}