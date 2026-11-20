import { PLANTS_API_URL } from '$app/env/private';

export async function fetchPlants(light) {
		const url = light
		? `${PLANTS_API_URL}/api/plants?light=${encodeURIComponent(light)}`
		: `${PLANTS_API_URL}/api/plants`;

		const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Plants API responded with ${res.status}`);
	}

	return res.json();
}

export async function createPlant(data) {
	const res = await fetch(`${PLANTS_API_URL}/api/plants`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!res.ok) {
		throw new Error(`Plants API responded with ${res.status}`);
	}

	return res.json();
}

export async function updatePlant(id, changes) {
	const res = await fetch(`${PLANTS_API_URL}/api/plants/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changes)
	});

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`Plants API responded with ${res.status}`);
	}

	return res.json();
}

export async function deletePlant(id) {
	const res = await fetch(`${PLANTS_API_URL}/api/plants/${id}`, {
		method: 'DELETE'
	});

	if (res.status === 404) {
		return false;
	}

	if (!res.ok) {
		throw new Error(`Plants API responded with ${res.status}`);
	}

	return true;
}

export async function fetchPlant(id) {
	const res = await fetch(`${PLANTS_API_URL}/api/plants/${encodeURIComponent(id)}`);

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`Plants API responded with ${res.status}`);
	}

	return res.json();
}
