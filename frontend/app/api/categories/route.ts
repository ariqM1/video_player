import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:4000";

export async function GET() {
	try {
		const backendUrl = `${BACKEND_URL}/categories`;

		console.log("Proxying categories request to:", backendUrl);

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
		console.error("Categories API route error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories from backend" },
			{ status: 500 }
		);
	}
}
