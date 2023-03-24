<script>
    import { API_TOKEN, API_URL, USER_INFO } from "../api";
    import Rater from "../components/rater/Rater.svelte";
    import UserInfo from "../components/userinfo/UserInfo.svelte";

    const Raters = {
        "order": Rater
    };

    let query = undefined;
    let queryQueue = [];
    let querying = false;
    let err;

    const pullQueries = async (limit) => {
        if (querying) return;
        querying = true;
        err = undefined;
        try {
            let resp =  await fetch(`${API_URL}/label/tasks?size=${10}`, {
                method: "GET",
                headers: {
                    Authorization: $API_TOKEN
                }
            });
            if (resp.status !== 200) throw new Error(resp.status+" "+resp.statusText+": "+await resp.text());
            let json = await resp.json();

            queryQueue = [...queryQueue, ...json];
            if (query === undefined) {
                query = queryQueue.pop();
            }
        } catch (error) {
            err = error;
        }
        querying = false;
    }
    pullQueries(10);

    const submit = async (query2, res) => {
        if (queryQueue.length < 5 && !querying) {
            pullQueries(10);
        }
        query = queryQueue.pop();
        await fetch(`${API_URL}/label/${query2.labelId}`, {
            method: 'PUT', 
            headers: {
                Authorization: $API_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(res)
        })
        console.log(query2, res);
    }

</script>
<div class="header">
    <h1>RLHF Reward Model Trainer</h1>
    <UserInfo/>

    <a href="/leaderboard">View leaderboard</a>
</div>
{#if query === undefined}
    {#if err != undefined}
        <p>An Error Occured: {err.toString()}</p>
        <button on:click={() => {pullQueries(10)}}>Try refresh</button>
    {:else if querying === true}
        <p> Loading </p>
    {:else}
        <p>Welp no query found for you :/</p>
        <button on:click={() => {pullQueries(10)}}>Try refresh</button>
    {/if}
{:else}
    <svelte:component this={Raters[query.task.type]} on:submit={(data) => submit(query, data.detail)} task={query.task}/>
{/if}
<style>
    .header {
        display: flex;
        align-items: center;
        flex-direction: column;    
    }
</style>