<script lang="ts">
    import Slots from "$lib/Slots/Slots.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: clubInfo = data.clubInfo;
    $: teste = data.teste;
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>{teste}</h1>
    <Slots {clubInfo} />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
</style>
