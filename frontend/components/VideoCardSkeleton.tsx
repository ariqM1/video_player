import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function VideoCardSkeleton() {
	return (
		<Card className="overflow-hidden border-muted/50">
			<Skeleton className="aspect-video w-full" />
			<CardContent className="p-4">
				<Skeleton className="mb-2 h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
			</CardContent>
		</Card>
	);
}
