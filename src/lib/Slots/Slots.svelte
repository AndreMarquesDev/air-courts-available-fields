<script lang="ts">
	import type { Slot } from 'src/routes/+page.server';

	const teste = 'cenas';

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
</section>
