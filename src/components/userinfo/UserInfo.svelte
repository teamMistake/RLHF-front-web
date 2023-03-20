<script>
    import { API_TOKEN } from "../../api";
    import { USER_INFO } from "../../api";

    const signout = () => {
        $API_TOKEN = undefined;
    }
</script>
{#if $USER_INFO !== undefined}
    <span>Welcome! {$USER_INFO.nickname}</span> <button on:click={signout}>Sign Out</button>
{:else}
    <a href="/signin">Sign in to receive Awesome REWARD</a>
{/if}