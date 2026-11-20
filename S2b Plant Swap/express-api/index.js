import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import * as plantData from "./lib/plantData.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[plant-api] ${req.method} ${req.path}`);
  next();
});

app.get("/api/plants", async (req, res) => {
  try {
    const { light } = req.query;
    if (light && !["low", "medium", "bright"].includes(light)) {
      return res
        .status(400)
        .json({ error: "light must be low, medium or bright" });
    }

    const plants = await plantData.getAll(light);
    res.json(plants);
  } catch (err) {
    console.error("Failed to read plants:", err.message);
    res.status(500).json({ error: "Could not read plants" });
  }
});

app.get("/api/plants/:id", async (req, res) => {
  try {
    const { id } = req.params;

	if (!mongoose.isValidObjectId(id)) {
		return res.status(404).json({ error: `No plant found with id ${id}` });
	}
	const plant = await plantData.getById(id);
	 if (!plant) {
      return res.status(404).json({ error: `No plant found with id ${id}` });
    }

    res.json(plant);
  } catch (err) {
    console.error("Failed to read plant:", err.message);
    res.status(500).json({ error: "Could not read plant" });
  }
});

app.post("/api/plants", async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "name and species are both required" });
    }

    const { name, species, lightNeeds } = req.body;

    if (!name || !species || !lightNeeds) {
      return res
        .status(400)
        .json({ error: "name and species are both required" });
    }

    const newPlant = await plantData.create({ name, species, lightNeeds });

    res.status(201).json(newPlant);
  } catch (err) {
    console.error("Failed to create plant:", err.message);
    res.status(500).json({ error: "Could not create plant" });
  }
});

app.patch("/api/plants/:id", async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "a JSON body of changes is required" });
    }

    const updated = await plantData.update(req.params.id, req.body);

    if (!updated) {
      return res
        .status(404)
        .json({ error: `No plant found with id ${req.params.id}` });
    }

    res.json(updated);
  } catch (err) {
    console.error("Failed to update plant:", err.message);
    res.status(500).json({ error: "Could not update plant" });
  }
});

app.delete("/api/plants/:id", async (req, res) => {
  try {
    const removed = await plantData.remove(req.params.id);

    if (!removed) {
      return res
        .status(404)
        .json({ error: `No plant found with id ${req.params.id}` });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Failed to delete plant:", err.message);
    res.status(500).json({ error: "Could not delete plant" });
  }
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(
      "Could not connect to MongoDB. Check MONGODB_URI in .env:",
      err.message,
    );
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Plant Swap Shelf API listening on http://localhost:${PORT}`);
  });
}

start();
