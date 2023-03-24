<script>
    import { API_URL } from "../../api";


    let leaderboard = fetch(`${API_URL}/leaderboard`, {method: 'GET'}).then(a => a.json());

</script>

{#await leaderboard}
    Fetching...
{:then list} 
    {#each list as person}
        <p><span>{person.nickname}</span> Completed <span>{person.count}</span> Labeling Tasks!</p>
    {/each}
{:catch err}
    An error occured: {err.toString()}
{/await}
