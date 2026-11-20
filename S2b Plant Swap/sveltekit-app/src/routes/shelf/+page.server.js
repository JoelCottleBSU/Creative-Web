import { error } from "@sveltejs/kit";
import { fetchPlants } from "#lib/server/plantsApi.js";

export async function load({ url }) {
  const light = url.searchParams.get("light");

  try {
    const plants = await fetchPlants(light);
    return { plants, light };
  } catch (err) {
    console.error("Failed to reach the Plants API:", err.message);

    error(502, "Couldn't reach the Plants API. Is the Express server running?");
  }
}
