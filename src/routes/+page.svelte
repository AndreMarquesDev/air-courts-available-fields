<script lang="ts">
    import Slots from "$lib/Slots/Slots.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: clubInfo = data.clubInfo;
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
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
