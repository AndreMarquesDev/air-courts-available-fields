<script lang="ts">
    import type { Slot } from "src/types/Slot";

    const teste = "cenas";

    export let bananas = "bananas default";
    export let slots: Slot[][];

    console.log("slots", slots);
</script>

<section>
    <p>
        My custom component with the variable <strong>{teste}</strong> and
        <strong>{bananas}</strong>
    </p>

    <ul>
        {#each slots as slot}
            {#if !!slot.length}
                <li>
                    <strong>{slot[0].date}</strong>

                    {#each slot as slot1 (slot1.id)}
                        <p>{slot1.start}</p>
                    {/each}
                </li>
            {/if}
        {/each}
    </ul>
</section>
