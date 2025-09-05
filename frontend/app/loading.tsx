import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-8">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="space-y-4">
						<Skeleton className="h-8 w-48" />
						<div className="flex gap-4 overflow-hidden">
							{[...Array(4)].map((_, j) => (
								<div
									key={j}
									className="w-[280px] flex-shrink-0 space-y-2 sm:w-[320px] lg:w-[360px]"
								>
									<Skeleton className="aspect-video w-full" />
									<Skeleton className="h-4 w-3/4" />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}