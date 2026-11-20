<script>
	let { data } = $props();
</script>

<main>
	<p><a href="/shelf">← Back to the shelf</a></p>
	<h1>{data.plant.name}</h1>
	<dl>
		<dt>Species</dt>
		<dd>{data.plant.species}</dd>
		<dt>Light needs</dt>
		<dd>☀ {data.plant.lightNeeds}</dd>
		<dt>Status</dt>
		<dd>{data.plant.swapped ? 'Swapped' : 'On the shelf'}</dd>
	</dl>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
	}
	dt {
		font-weight: bold;
		margin-top: 0.75rem;
	}
	dd {
		margin: 0.25rem 0 0;
	}
</style>
