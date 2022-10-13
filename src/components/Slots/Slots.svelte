<script lang="ts">
    import { ClubId } from "../../types/ClubId";
    import type { ClubData } from "src/types/ClubData";
    import type { Slot } from "src/types/Slot";
    import { DEFAULT_START_TIME } from "../../utils/apiDataHelpers";

    const capitalizeFirstLetter = (string: string): string => {
        return string[0].toUpperCase() + string.slice(1);
    };

    const isDayWithSlots = (slotsList: Slot[]): boolean => !!slotsList.length;

    export let clubData: ClubData;
</script>

<section>
    <h1>{ClubId[clubData.clubId]}</h1>

    <ul>
        {#each clubData.clubSlotsByDateList as club}
            <li
                class:dayWithNoSlots={!isDayWithSlots(club.slots)}
                class:dayWithSlots={isDayWithSlots(club.slots)}
            >
                {#if isDayWithSlots(club.slots)}
                    <a
                        href={`https://www.aircourts.com/index.php/site/view_club/${clubData.clubId}/${club.apiDate}/${DEFAULT_START_TIME}`}
                        target="_blank"
                    >
                        <strong
                            >{club.date} - {capitalizeFirstLetter(
                                club.weekday
                            )}</strong
                        >
                    </a>
                {:else}
                    <p class="strikethrough">
                        {club.date} - {capitalizeFirstLetter(club.weekday)}
                    </p>
                {/if}

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

    .strikethrough {
        text-decoration: line-through;
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
