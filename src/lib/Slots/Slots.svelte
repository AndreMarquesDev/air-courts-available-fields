<script lang="ts">
    import type { ClubInfo } from "src/types/ClubInfo";

    const teste = "cenas";

    const capitalizeFirstLetter = (string: string): string => {
        return string[0].toUpperCase() + string.slice(1);
    };

    export let bananas = "bananas default";
    export let clubInfo: ClubInfo[];

    // console.log("clubInfo", clubInfo);
</script>

<section>
    <p>
        My custom component with the variable <strong>{teste}</strong> and
        <strong>{bananas}</strong>
    </p>

    <ul>
        {#each clubInfo as club}
            <li>
                <strong
                    >{club.date} - {capitalizeFirstLetter(club.weekday)}</strong
                >

                {#if !!club.slots.length}
                    <div class="timeslots">
                        {#each club.slots as slot (slot.id)}
                            <p>{slot.start}</p>
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
