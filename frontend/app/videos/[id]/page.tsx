import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getVideoById } from "@/lib/api-client";
import { ArrowLeft, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
					<div className="relative aspect-video overflow-hidden rounded-lg bg-muted shadow-xl">
						<Image
							src={video.thumbnail}
							alt={video.title}
							fill
							className="object-cover"
							priority
							placeholder="blur"
							blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
						<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-transparent">
							<Button 
								size="lg" 
								className="gap-2 shadow-lg transition-transform hover:scale-105"
							>
								<Play className="h-5 w-5" fill="currentColor" />
								<span className="hidden sm:inline">Play Video</span>
								<span className="sm:hidden">Play</span>
							</Button>
						</div>
					</div>

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
								</dl>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
