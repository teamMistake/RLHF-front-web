<script>
    export let show = true;
</script>

{#if show}
    <div class="loading">
        <span class="loader"></span>
    </div>
{/if}

<style>
    .loading {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #33333333;
        align-items: center;
        justify-content: center;
    }
    .loader {
        width: 48px;
        height: 48px;
        border: 5px solid #FFF;
        border-bottom-color: #FF3D00;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
</style>