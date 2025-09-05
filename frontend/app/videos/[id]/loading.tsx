import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VideoDetailLoading() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				<Link href="/">
					<Button variant="ghost" className="mb-6">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Home
					</Button>
				</Link>

				<div className="grid gap-8 lg:grid-cols-2">
					<div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
						<Skeleton className="h-full w-full" />
					</div>

					<div className="space-y-6">
						<div>
							<Skeleton className="mb-4 h-9 w-3/4" />
							<Skeleton className="mb-4 h-6 w-24" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						</div>

						<Card>
							<CardContent className="p-6">
								<Skeleton className="mb-4 h-6 w-32" />
								<div className="space-y-3">
									<div className="flex justify-between">
										<Skeleton className="h-4 w-20" />
										<Skeleton className="h-4 w-16" />
									</div>
									<div className="flex justify-between">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-4 w-20" />
									</div>
									<div className="flex justify-between">
										<Skeleton className="h-4 w-16" />
										<Skeleton className="h-4 w-24" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
