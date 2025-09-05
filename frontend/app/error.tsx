"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-16">
			<h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
			<p className="mb-8 text-muted-foreground">
				Failed to load videos. Please check if the backend server is
				running on port 4000.
			</p>
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
}
