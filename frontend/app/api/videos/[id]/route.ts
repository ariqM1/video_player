import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:4000";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		const backendUrl = `${BACKEND_URL}/videos/${encodeURIComponent(id)}`;

		console.log("Proxying video request to:", backendUrl);

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
		console.error("Video API route error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch video from backend" },
			{ status: 500 }
		);
	}
}
