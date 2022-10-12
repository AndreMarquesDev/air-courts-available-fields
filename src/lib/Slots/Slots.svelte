<script lang="ts">
    import { ClubId } from "../../types/ClubId";
    import type { ClubData } from "src/types/ClubData";

    const capitalizeFirstLetter = (string: string): string => {
        return string[0].toUpperCase() + string.slice(1);
    };

    export let clubData: ClubData;
</script>

<section>
    <h1>{ClubId[clubData.clubId]}</h1>

    <ul>
        {#each clubData.clubSlotsByDateList as club}
            <li>
                <strong
                    >{club.date} - {capitalizeFirstLetter(club.weekday)}</strong
                >

                {#if !!club.slots.length}
                    <div class="timeslots">
                        {#each club.slots as slot, index (slot.id)}
                            <p>
                                {slot.start}
                                {club.slots.length === index + 1 ? "" : "|"}
                            </p>
                        {/each}
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
</section>

<style>
    h1 {
        text-align: left;
    }

    .timeslots {
        display: flex;
        gap: 10px;
    }
</style>
