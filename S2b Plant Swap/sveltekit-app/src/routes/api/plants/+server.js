import { json } from "@sveltejs/kit";
import { createPlant } from "#lib/server/plantsApi.js";

export async function POST({ request }) {
  let data;
  try {
    data = await request.json();
  } catch (err) {
    return json({ error: "Send a JSON body" }, { status: 400 });
  }

  try {
    const newPlant = await createPlant(data);

    return json(newPlant, { status: 201 });
  } catch (err) {
    console.error("Failed to create plant via Express:", err.message);

    return json({ error: "Could not reach the Plants API" }, { status: 502 });
  }
}
