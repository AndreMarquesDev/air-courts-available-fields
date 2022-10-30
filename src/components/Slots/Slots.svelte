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
    <h2>{ClubId[clubData.clubId]}</h2>

    <ul class="listOfDays">
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

                    <ul class="timeslotsWrapper">
                        {#each club.slots as slot (slot.id)}
                            <li class="timeslot">
                                <p>
                                    {slot.start}
                                </p>
                                <p
                                    class="price"
                                    class:highPrice={slot.priceMultipliedBy2 >
                                        50}
                                >
                                    {slot.priceMultipliedBy2}€
                                </p>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p class="strikethrough">
                        {club.date} - {capitalizeFirstLetter(club.weekday)}
                    </p>
                {/if}
            </li>
        {/each}
    </ul>
</section>

<style lang="postcss">
    h2 {
        text-align: left;
        margin: 0;
    }

    @media (max-width: 440px) {
        .listOfDays {
            padding-left: 15px;
        }
    }

    .dayWithSlots {
        list-style-type: "⚽ ";
    }

    .dayWithNoSlots {
        list-style-type: "❌ ";
        color: gray;
    }

    .dayWithSlots,
    .dayWithNoSlots {
        margin: 12px 0;
    }

    .strikethrough {
        text-decoration: line-through;
    }

    .timeslotsWrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 5px;
        list-style-type: none;
        padding: 0;
    }

    .timeslot {
        min-width: 43px;
        position: relative;
        text-align: center;

        &::before {
            content: "";
            position: absolute;
            top: 17px;
            left: 50%;
            width: 1px;
            height: 20%;
            background: black;
            rotate: 90deg;
        }

        &:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 0;
            right: -5px;
            width: 1px;
            height: 100%;
            background: black;
        }
    }

    .price {
        color: green;
        margin-top: 5px;
    }

    .highPrice {
        color: red;
    }
</style>
