<script>
    export let label;
    export let content;
</script>

<div class="container">
    <span>{label}</span>
    <div class="corpus">
        <span>{content}</span>
    </div>
</div>

<style>
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
        display: flex;
        word-break: break-word;
        word-wrap: break-word;
        padding: 1em;
        border-radius: 0.5em;
        border-color: black;
        border-style: solid;
    }
</style>