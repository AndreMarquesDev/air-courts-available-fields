<script lang="ts">
    import Slots from "$lib/Slots/Slots.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: date = data.date;
    $: allClubsInfo = data.allClubsInfo;

    // console.log(data.allClubsInfo);
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>{date}</h1>

    {#each allClubsInfo as clubsInfoList}
        <Slots clubData={clubsInfoList} />
    {/each}
</section>

<style>
    h1 {
        width: 100%;
        text-align: center;
    }
    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>
