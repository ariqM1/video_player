import { Skeleton } from "@/components/ui/skeleton";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";

export default function CategoryCarouselSkeleton() {
	return (
		<section className="relative mb-8 md:mb-12">
			<Skeleton className="mb-4 h-7 w-48 px-4 md:mb-6 md:h-8 md:w-56 md:px-0 lg:h-9 lg:w-64" />
			<div className="-mx-4 md:mx-0">
				<div className="flex gap-3 overflow-hidden px-4 md:gap-4 md:px-0 lg:gap-6">
					{[...Array(5)].map((_, index) => (
						<div
							key={index}
							className="w-[150px] flex-shrink-0 sm:w-[200px] md:w-[280px] lg:w-[320px] xl:w-[360px]"
						>
							<VideoCardSkeleton />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
