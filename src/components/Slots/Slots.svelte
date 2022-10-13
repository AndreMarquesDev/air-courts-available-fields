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
            <li
                class:dayWithNoSlots={!club.slots.length}
                class:dayWithSlots={!!club.slots.length}
            >
                <strong
                    >{club.date} - {capitalizeFirstLetter(club.weekday)}</strong
                >

                {#if !!club.slots.length}
                    <div class="timeslotsWrapper">
                        {#each club.slots as slot (slot.id)}
                            <p class="timeslot">
                                {slot.start}
                            </p>{/each}
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

    li {
        margin: 5px 0;
    }

    .dayWithSlots {
        list-style-type: "⚽ ";
    }

    .dayWithNoSlots {
        list-style-type: "❌ ";
        color: gray;
    }

    .dayWithNoSlots strong {
        text-decoration: line-through;
        font-weight: normal;
    }

    .timeslotsWrapper {
        display: flex;
        flex-wrap: wrap;
        column-gap: 10px;
        margin-top: 5px;
    }

    .timeslot {
        min-width: 43px;
        position: relative;
        text-align: center;
    }

    .timeslot:not(:last-child)::after {
        content: "|";
        position: absolute;
        right: -7px;
    }
</style>
