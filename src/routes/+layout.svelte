<script lang="ts">
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";
    import "../app.css";

    inject({ mode: dev ? "development" : "production" });
</script>

<main>
    <slot />
</main>

<footer>
    <p>
        Developed by <a
            href="https://github.com/AndreMarquesDev"
            target="_blank">AndreMarquesDev</a
        >
    </p>
</footer>

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
    }
</style>
