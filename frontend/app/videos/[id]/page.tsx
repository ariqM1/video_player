import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getVideoById } from "@/lib/api-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";

interface VideoPageProps {
	params: {
		id: string;
	};
}

export default async function VideoPage({ params }: VideoPageProps) {
	const video = await getVideoById(params.id);

	if (!video) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-4 md:px-6 md:py-8 lg:px-8">
				<Link href="/">
					<Button variant="ghost" className="mb-4 md:mb-8" size="sm">
						<ArrowLeft className="mr-2 h-4 w-4" />
						<span className="hidden sm:inline">Back to Home</span>
						<span className="sm:hidden">Back</span>
					</Button>
				</Link>

				<div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:gap-12">
					<VideoPlayer 
						thumbnail={video.thumbnail}
						title={video.title}
					/>

					<div className="space-y-4 md:space-y-6">
						<div>
							<h1 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl">
								{video.title}
							</h1>
							<Badge variant="secondary" className="mb-4 px-3 py-1">
								{video.category}
							</Badge>
							<p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg">
								{video.description}
							</p>
						</div>

						<Card className="border-muted/50">
							<CardContent className="p-4 md:p-6">
								<h2 className="mb-4 text-base font-semibold md:text-lg">
									Video Details
								</h2>
								<dl className="space-y-3 text-sm md:text-base">
									<div className="flex justify-between">
										<dt className="text-muted-foreground">
											Duration
										</dt>
										<dd className="font-medium">
											{video.duration}
										</dd>
									</div>
									{video.releaseDate && (
										<div className="flex justify-between">
											<dt className="text-muted-foreground">
												Release Date
											</dt>
											<dd className="font-medium">
												{video.releaseDate}
											</dd>
										</div>
									)}
									{video.director && (
										<div className="flex justify-between">
											<dt className="text-muted-foreground">
												Director
											</dt>
											<dd className="font-medium">
												{video.director}
											</dd>
										</div>
									)}
									{video.cast && video.cast.length > 0 && (
										<div>
											<dt className="mb-2 text-muted-foreground">
												Cast
											</dt>
											<dd className="flex flex-wrap gap-2">
												{video.cast.map((actor, index) => (
													<Badge 
														key={index} 
														variant="outline" 
														className="px-2 py-1 text-xs"
													>
														{actor}
													</Badge>
												))}
											</dd>
										</div>
									)}
								</dl>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
