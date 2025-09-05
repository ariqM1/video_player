import CategoryCarouselSkeleton from "@/components/CategoryCarouselSkeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-0 py-4 md:px-6 md:py-8 lg:px-8">
				<div className="space-y-0">
					{[...Array(3)].map((_, index) => (
						<CategoryCarouselSkeleton key={index} />
					))}
				</div>
			</div>
		</div>
	);
}