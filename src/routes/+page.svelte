<script lang="ts">
    import Slots from "../../src/components/Slots/Slots.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: date = data.date;
    $: allClubsInfo = data.allClubsInfo;
</script>

<svelte:head>
    <title
        >⚽ Pontapés na Atmosfera | campos e horários disponíveis no AirCourts
        ⚽</title
    >
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
        right: 0;
        width: 100%;
        text-align: right;
    }
    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>
