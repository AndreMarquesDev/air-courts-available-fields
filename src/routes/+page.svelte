<script lang="ts">
    import Slots from "src/components/Slots/Slots.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: date = data.date;
    $: allClubsInfo = data.allClubsInfo;
</script>

<svelte:head>
    <title>air-courts-available-fields</title>
</svelte:head>

<section>
    {#each allClubsInfo as clubsInfoList}
        <Slots clubData={clubsInfoList} />
    {/each}

    <p>{date}</p>
</section>

<style>
    p {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        text-align: left;
    }
    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>
