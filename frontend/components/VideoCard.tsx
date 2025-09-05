"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface VideoCardProps {
	id: string;
	title: string;
	thumbnail: string;
	category: string;
	priority?: boolean;
}

export default function VideoCard({
	id,
	title,
	thumbnail,
	category,
	priority = false,
}: VideoCardProps) {
	return (
		<Link href={`/videos/${id}`} className="block h-full">
			<Card className="group h-full cursor-pointer overflow-hidden border-muted/40 bg-card/50 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl">
				<div className="relative aspect-video overflow-hidden bg-muted">
					<Image
						src={thumbnail}
						alt={title}
						fill
						loading={priority ? "eager" : "lazy"}
						priority={priority}
						placeholder="blur"
						blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
						className="object-cover transition-transform duration-500 group-hover:scale-110"
						sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, (max-width: 1024px) 280px, (max-width: 1280px) 320px, 360px"
					/>
					{/* Play overlay on hover */}
					<div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
						<div className="scale-0 transform rounded-full bg-white/90 p-3 shadow-lg transition-transform duration-300 group-hover:scale-100 md:p-4">
							<Play className="h-4 w-4 text-black md:h-6 md:w-6" fill="currentColor" />
						</div>
					</div>
					{/* Category badge */}
					<div className="absolute right-1.5 top-1.5 md:right-2 md:top-2">
						<Badge
							variant="secondary"
							className="bg-background/90 px-2 py-0.5 text-xs font-medium backdrop-blur-sm md:px-2.5 md:py-1"
						>
							{category}
						</Badge>
					</div>
				</div>
				<CardContent className="p-2.5 md:p-4">
					<h3 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground/90 transition-colors group-hover:text-foreground sm:text-sm md:text-base md:leading-tight">
						{title}
					</h3>
				</CardContent>
			</Card>
		</Link>
	);
}
