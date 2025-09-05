import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:4000";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category");

		// Build the backend URL
		let backendUrl = `${BACKEND_URL}/videos`;
		if (category) {
			backendUrl += `?category=${encodeURIComponent(category)}`;
		}

		console.log("Proxying request to:", backendUrl);

		const response = await fetch(backendUrl, {
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Backend responded with ${response.status}`);
		}

		const data = await response.json();

		return NextResponse.json(data, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods":
					"GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	} catch (error) {
		console.error("API route error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch videos from backend" },
			{ status: 500 }
		);
	}
}
