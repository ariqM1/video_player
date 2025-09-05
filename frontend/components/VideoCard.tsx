"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
	id: string;
	title: string;
	thumbnail: string;
	category: string;
}

export default function VideoCard({
	id,
	title,
	thumbnail,
	category,
}: VideoCardProps) {
	return (
		<Link href={`/videos/${id}`} className="block">
			<Card className="group cursor-pointer overflow-hidden border-muted/50 transition-all hover:border-primary/50 hover:shadow-lg">
				<div className="relative aspect-video overflow-hidden bg-muted">
					<Image
						src={thumbnail}
						alt={title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
					<div className="absolute right-2 top-2">
						<Badge
							variant="secondary"
							className="bg-background/80 backdrop-blur-sm"
						>
							{category}
						</Badge>
					</div>
				</div>
				<CardContent className="p-4">
					<h3 className="line-clamp-2 text-sm font-medium leading-tight">
						{title}
					</h3>
				</CardContent>
			</Card>
		</Link>
	);
}
