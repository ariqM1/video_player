import express from "express";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 4000;

let videosData = [];

async function loadVideosData() {
	try {
		const videosPath = join(__dirname, "data", "videos.json");
		const data = await readFile(videosPath, "utf8");
		videosData = JSON.parse(data);
		console.log(`Loaded ${videosData.length} videos from data file`);
	} catch (error) {
		console.error("Error loading videos data:", error);
		process.exit(1);
	}
}

app.use(express.json());

app.get("/categories", (req, res) => {
	try {
		const uniqueCategories = [
			...new Set(videosData.map((video) => video.category)),
		];
		res.json({ categories: uniqueCategories });
	} catch (error) {
		console.error("Error getting categories:", error);
		res.status(500).json({ error: "Failed to get categories" });
	}
});

app.get("/videos", (req, res) => {
	try {
		const { category } = req.query;

		let filteredVideos = videosData;

		if (category) {
			filteredVideos = videosData.filter(
				(video) =>
					video.category.toLowerCase() === category.toLowerCase()
			);
		}

		res.json({ videos: filteredVideos });
	} catch (error) {
		console.error("Error getting videos:", error);
		res.status(500).json({ error: "Failed to get videos" });
	}
});

app.get("/videos/:id", (req, res) => {
	try {
		const { id } = req.params;
		const video = videosData.find((video) => video.id === id);

		if (!video) {
			return res.status(404).json({ error: "Video not found" });
		}

		res.json(video);
	} catch (error) {
		console.error("Error getting video by id:", error);
		res.status(500).json({ error: "Failed to get video" });
	}
});

async function startServer() {
	await loadVideosData();

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

startServer();
