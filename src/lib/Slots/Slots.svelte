<script lang="ts">
    import { ClubId } from "../../types/ClubId";
    import type { ClubInfo } from "src/types/ClubInfo";

    const capitalizeFirstLetter = (string: string): string => {
        return string[0].toUpperCase() + string.slice(1);
    };

    export let clubInfo: ClubInfo[];

    // console.log("clubInfo", clubInfo);
</script>

<section>
    <h1>{ClubId[clubInfo[0].clubId]}</h1>

    <ul>
        {#each clubInfo as club}
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
    .timeslots {
        display: flex;
        gap: 10px;
    }
</style>
