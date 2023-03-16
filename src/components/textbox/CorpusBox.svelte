<script>
    export let label;
    export let content;
    export let badge;
</script>

<div class="container">
    <span>{label}</span>
    <div class="corpus" on:click>
        {#if badge !== undefined}
            <div class="badge">
                <span>{badge}</span>
            </div>
        {/if}
        <span>{content}</span>
    </div>
</div>

<style>
    .badge {
        position: absolute;
        top: -0.7em;
        right: -0.7em;
        width: 1.4em;
        height: 1.4em;
        border-radius: 0.7em;
        border-color: aqua;
        background-color: aqua;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .container {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        padding: 0.5em;
        flex-grow: 1;
        align-content: stretch;
    }
    .container > span {
        padding-left: 0.5em;
    }
    .corpus {
        position: relative;
        display: flex;
        word-break: break-word;
        word-wrap: break-word;
        padding: 1em;
        border-radius: 0.5em;
        border-color: black;
        border-style: solid;
    }
</style>