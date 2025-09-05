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
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-8">
				{categoriesWithVideos.length === 0 ? (
					<div className="text-center py-16">
						<h2 className="text-2xl font-semibold mb-4">
							No content available
						</h2>
						<p className="text-muted-foreground">
							Please make sure the backend server is running on
							port 4000 and has video data.
						</p>
					</div>
				) : (
					categoriesWithVideos.map((category) => (
						<CategoryCarousel
							key={category.name}
							title={category.name}
							videos={category.videos}
						/>
					))
				)}
			</div>
		</div>
	);
}
