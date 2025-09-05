import CategoryCarousel from "@/components/CategoryCarousel";
import { CategoryWithVideos, getCategoriesWithVideos } from "@/lib/api-client";

export default async function Home() {
	let categoriesWithVideos: CategoryWithVideos[] = [];

	try {
		categoriesWithVideos = await getCategoriesWithVideos();
		console.log("Fetched categories:", categoriesWithVideos);
	} catch (error) {
		console.error("Error fetching data:", error);
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-0 py-4 md:px-6 md:py-8 lg:px-8">
				<div className="space-y-0">
					{categoriesWithVideos.length === 0 ? (
						<div className="flex min-h-[60vh] items-center justify-center">
							<div className="text-center">
								<h2 className="mb-4 text-2xl font-bold md:text-3xl">
									No content available
								</h2>
								<p className="mx-auto max-w-md text-muted-foreground">
									Please make sure the backend server is running on
									port 4000 and has video data.
								</p>
							</div>
						</div>
					) : (
						categoriesWithVideos.map((category, categoryIndex) => (
							<CategoryCarousel
								key={category.name}
								title={category.name}
								videos={category.videos}
								isFirstCarousel={categoryIndex === 0}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
