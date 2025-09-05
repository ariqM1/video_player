// Unified API client that works in both server and client environments

export interface Video {
	id: string;
	title: string;
	thumbnail: string;
	category: string;
	description: string;
	duration: string;
}

export interface CategoryWithVideos {
	name: string;
	videos: Video[];
}

// Environment detection
const isServer = typeof window === 'undefined';
const BACKEND_URL = 'http://localhost:4000';
const API_PROXY_URL = '/api';

/**
 * Unified fetch function that works in both server and client environments
 */
async function universalFetch(endpoint: string): Promise<any> {
	let url: string;
	let options: RequestInit = {};

	if (isServer) {
		// Server-side: Direct call to backend
		url = `${BACKEND_URL}${endpoint}`;
		options = { cache: 'no-store' };
	} else {
		// Client-side: Use Next.js API routes as proxy
		url = `${API_PROXY_URL}${endpoint}`;
	}

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`API request failed: ${url}`, error);
		throw error;
	}
}

/**
 * Helper function to handle different response formats
 */
function extractArray(data: any, arrayKey?: string): any[] {
	if (Array.isArray(data)) {
		return data;
	} else if (arrayKey && data[arrayKey] && Array.isArray(data[arrayKey])) {
		return data[arrayKey];
	} else {
		console.error("Unexpected response format:", data);
		throw new Error("Invalid response format");
	}
}

/**
 * Helper function to extract single object from response
 */
function extractObject(data: any, objectKey?: string): any {
	if (data && typeof data === "object" && data.id) {
		return data;
	} else if (objectKey && data[objectKey] && typeof data[objectKey] === "object") {
		return data[objectKey];
	} else {
		console.error("Unexpected response format:", data);
		throw new Error("Invalid response format");
	}
}

// API Functions

export async function getCategories(): Promise<string[]> {
	const data = await universalFetch('/categories');
	return extractArray(data, 'categories');
}

export async function getAllVideos(): Promise<Video[]> {
	const data = await universalFetch('/videos');
	return extractArray(data, 'videos');
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
	const data = await universalFetch(`/videos?category=${encodeURIComponent(category)}`);
	return extractArray(data, 'videos');
}

export async function getVideoById(id: string): Promise<Video> {
	const data = await universalFetch(`/videos/${encodeURIComponent(id)}`);
	return extractObject(data, 'video');
}

export async function getCategoriesWithVideos(): Promise<CategoryWithVideos[]> {
	const categories = await getCategories();
	
	const categoriesWithVideos = await Promise.all(
		categories.map(async (category) => {
			const videos = await getVideosByCategory(category);
			return {
				name: category,
				videos,
			};
		})
	);

	return categoriesWithVideos.filter((category) => category.videos.length > 0);
}

// Search functionality
export async function searchVideos(query: string): Promise<Video[]> {
	const allVideos = await getAllVideos();
	
	if (!query.trim()) {
		return [];
	}

	const searchTerm = query.toLowerCase().trim();
	return allVideos.filter(
		(video) =>
			video.title.toLowerCase().includes(searchTerm) ||
			video.description.toLowerCase().includes(searchTerm) ||
			video.category.toLowerCase().includes(searchTerm)
	);
}