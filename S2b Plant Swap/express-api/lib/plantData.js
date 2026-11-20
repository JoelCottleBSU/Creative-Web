import Plants from '../models/Plants.js';

export async function getAll(light) {
	const filter = light ? { lightNeeds: light } : {};
	return Plants.find(filter);
}

export async function create(data) {
	return Plants.create(data);
}

export async function update(id, changes) {
	return Plants.findByIdAndUpdate(id, changes, { returnDocument: 'after', runValidators: true });
}

export async function remove(id) {
	return Plants.findByIdAndDelete(id);
}

export async function getById(id) {
	return Plants.findById(id);
}
