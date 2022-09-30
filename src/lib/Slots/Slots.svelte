<script lang="ts">
	import type { Slot } from 'src/routes/+page.server';

	const teste = 'cenas';

	const urls = [
		'https://jsonplaceholder.typicode.com/posts/1',
		'https://jsonplaceholder.typicode.com/posts/2',
		'https://jsonplaceholder.typicode.com/posts/3'
	];

	let slotsData;

	// TODO: mudar para allSettled?
	let promise = Promise.all(urls.map((url) => fetch(url).then((response) => response.json()))).then(
		(data) => (slotsData = data)
	);

	export let bananas = 'bananas default';
	export let slots: Slot[];
</script>

<section>
	<p>
		My custom component with the variable <strong>{teste}</strong> and <strong>{bananas}</strong>
	</p>

	<ul>
		{#each slots as slot (slot.id)}
			<li>{slot.start}</li>
		{/each}
	</ul>

	{#await promise}
		<p>...waiting</p>
	{:then slotsData}
		<p>slotsData: {slotsData.map((data) => data.id)}</p>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</section>
