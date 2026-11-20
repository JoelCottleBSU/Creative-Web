import { json } from "@sveltejs/kit";
import { updatePlant, deletePlant } from "#lib/server/plantsApi.js";

export async function PATCH({ params, request }) {
  let changes;
  try {
    changes = await request.json();
  } catch (err) {
    return json({ error: "Send a JSON body of changes" }, { status: 400 });
  }

  try {
    const updated = await updatePlant(params.id, changes);

    if (!updated) {
      return json(
        { error: `No plant found with id ${params.id}` },
        { status: 404 },
      );
    }

    return json(updated);
  } catch (err) {
    console.error("Failed to update plant via Express:", err.message);
    return json({ error: "Could not reach the Plants API" }, { status: 502 });
  }
}

export async function DELETE({ params }) {
  try {
    const wasDeleted = await deletePlant(params.id);

    if (!wasDeleted) {
      return json(
        { error: `No plant found with id ${params.id}` },
        { status: 404 },
      );
    }

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("Failed to delete plant via Express:", err.message);
    return json({ error: "Could not reach the Plants API" }, { status: 502 });
  }
}
