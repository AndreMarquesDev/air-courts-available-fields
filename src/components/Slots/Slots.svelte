<script lang="ts">
    import { ClubId } from "../../types/ClubId";
    import type { ClubData } from "src/types/ClubData";

    const capitalizeFirstLetter = (string: string): string => {
        return string[0].toUpperCase() + string.slice(1);
    };

    export let clubData: ClubData;

    // TODO: add links to clubs
</script>

<section>
    <h1>{ClubId[clubData.clubId]}</h1>

    <ul>
        {#each clubData.clubSlotsByDateList as club}
            <li>
                <strong class:dayWithNoSlots={!club.slots.length}
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
        margin: 0;
    }

    ul {
        list-style-type: disc;
    }

    li {
        margin: 4px 0;
    }

    .dayWithNoSlots {
        text-decoration: line-through;
        font-weight: normal;
    }

    .timeslots {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 1px;
    }
</style>
