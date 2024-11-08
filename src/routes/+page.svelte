<script lang="ts">
    import Slots from "../../src/components/Slots/Slots.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: allClubsInfo = data.allClubsInfo;

    console.log("date", data.date);
</script>

<svelte:head>
    <title
        >⚽ Pontapés na Atmosfera ⚽ campos e horários disponíveis no AirCourts</title
    >
</svelte:head>

<section>
    <p>
        This is no longer working since it relied on the
        <a href="https://www.aircourts.com" target="_blank">AirCourts</a> website
        API which was deprecated. It was still a fun project and served its purpose
        🙂
    </p>

    <h1>⚽ Pontapés na Atmosfera ⚽</h1>

    {#each allClubsInfo as clubsInfoList}
        <Slots clubData={clubsInfoList} />
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    p {
        width: 100%;
        text-align: center;
    }

    h1 {
        width: 100%;
        text-align: center;
    }
</style>
