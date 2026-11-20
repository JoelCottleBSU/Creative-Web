<script>
	let { data } = $props();

	let name = $state('');
	let species = $state('');
	let lightNeeds = $state('medium')
	let submitting = $state(false);
	let submitError = $state('');
	let listError = $state('');

	let plants = $state(data.plants);

	async function handleSubmit(event) {
		event.preventDefault();
		submitting = true;
		submitError = '';

		try {
			const res = await fetch('/api/plants', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, species, lightNeeds })
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			const newPlant = await res.json();
			plants.push(newPlant);

			name = '';
			species = '';
			lightNeeds = 'medium';
		} catch (err) {
			submitError = 'Could not add that plant. Is the API running?';
			console.error(err);
		} finally {
			submitting = false;
		}
	}

	async function toggleSwapped(plant) {
		listError = '';

		try {
			const res = await fetch(`/api/plants/${plant.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ swapped: !plant.swapped })
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			const updated = await res.json();
			plant.swapped = updated.swapped;
		} catch (err) {
			listError = 'Could not update that plant. Is the API running?';
			console.error(err);
		}
	}

	async function deletePlant(plant) {
		listError = '';

		try {
			const res = await fetch(`/api/plants/${plant.id}`, {
				method: 'DELETE'
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			plants = plants.filter((p) => p.id !== plant.id);
		} catch (err) {
			listError = 'Could not delete that plant. Is the API running?';
			console.error(err);
		}
	}
</script>

<main>
	<h1>Plant Swap Shelf</h1>
	<p><a href="/">← Home</a></p>

	{#if listError}
		<p class="error">{listError}</p>
	{/if}

	<nav class="filters">
	<a href="/shelf" data-sveltekit-reload class:active={!data.light}>All</a>
	<a href="/shelf?light=low" data-sveltekit-reload class:active={data.light === 'low'}>Low</a>
	<a href="/shelf?light=medium" data-sveltekit-reload class:active={data.light === 'medium'}>Medium</a>
	<a href="/shelf?light=bright" data-sveltekit-reload class:active={data.light === 'bright'}>Bright</a>
</nav>

	<ul class="plant-list">
		{#each plants as plant (plant.id)}
			<li class="plant-card" class:is-swapped={plant.swapped}>
				<div>
						<strong><a href="/shelf/{plant.id}">{plant.name}</a></strong>
					<span class="species">{plant.species}</span>
					<span class="light">☀ {plant.lightNeeds}</span>
					{#if plant.swapped}
						<span class="badge">Swapped</span>
					{/if}
				</div>
				<div class="buttons">
					<button class="swap-button" onclick={() => toggleSwapped(plant)}>
						{plant.swapped ? 'Back on shelf' : 'Mark swapped'}
					</button>
					<button
						class="icon-button delete"
						onclick={() => deletePlant(plant)}
						title="Remove this plant"
					>
						✕
					</button>
				</div>
			</li>
		{/each}
	</ul>

	<h2>Add a plant</h2>
	<form onsubmit={handleSubmit}>
		<label>
			Name
			<input type="text" bind:value={name} required />
		</label>
		<label>
			Species
			<input type="text" bind:value={species} required />
		</label>
		<label>
	Light needs
	<select bind:value={lightNeeds} required>
		<option value="low">Low</option>
		<option value="medium">Medium</option>
		<option value="bright">Bright</option>
	</select>
</label>
		<button type="submit" disabled={submitting}>
			{submitting ? 'Adding…' : 'Add plant'}
		</button>
		{#if submitError}
			<p class="error">{submitError}</p>
		{/if}
	</form>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
	}
	.plant-list {
		list-style: none;
		padding: 0;
	}
	.plant-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-left: 6px solid #3f9142;
		background: #f8f8f8;
		padding: 0.75rem 1rem;
		margin-bottom: 0.5rem;
		border-radius: 4px;
	}
	.plant-card.is-swapped {
		border-left-color: #bbb;
		opacity: 0.7;
	}
	.species {
		color: #666;
		margin-left: 0.5rem;
		font-size: 0.9rem;
		font-style: italic;
	}
	.badge {
		margin-left: 0.5rem;
		font-size: 0.75rem;
		background: #ddd;
		padding: 0.1rem 0.4rem;
		border-radius: 3px;
	}
	.buttons {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.swap-button {
		font-size: 0.85rem;
		cursor: pointer;
	}
	.icon-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #ccc;
	}
	.icon-button.delete:hover {
		color: #b91c1c;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 20rem;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.9rem;
	}
	.error {
		color: #b91c1c;
	}
	.light {
	margin-left: 0.5rem;
	font-size: 0.8rem;
	color: #8a6d00;
}
.filters {
	display: flex;
	gap: 0.75rem;
	margin-bottom: 1rem;
}
.filters a.active {
	font-weight: bold;
	text-decoration: none;
}
</style>
