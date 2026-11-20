import { error } from "@sveltejs/kit";
import { fetchPlant } from "#lib/server/plantsApi.js";

export async function load({ params }) {
  let plant;

  try {
    plant = await fetchPlant(params.id);
  } catch (err) {
    console.error("Failed to reach the Plants API:", err.message);
    error(502, "Couldn't reach the Plants API. Is the Express server running?");
  }

  if (!plant) {
    error(404, "Plant not found");
  }

  return { plant };
}
