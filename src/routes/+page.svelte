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

    const timeout = (sec) => {
        let promise;
        setTimeout(() => {
            promise();
        }, sec);

        return new Promise((resolve, reject) => {
            promise = resolve;
        })
    }

    const pullQueries = async (limit) => {
        if (querying) return;
        querying = true;
            let resp =  await fetch(`${API_URL}/label/tasks?size=${10}`, {
                method: "GET",
                headers: {
                    Authorization: $API_TOKEN
                }
            });
            return await resp.json()
    }
    pullQueries(10).then(res => {
        querying = false;
        queryQueue = res;
        if (queryQueue.length > 0) {
            query = queryQueue.pop();
        } else {
            query = {task: {type: "noQuery"}};
        }
    });

    const refresh = () => {
            query = undefined;
        pullQueries(10).then(res => {
            querying = false;
            queryQueue = res;
            if (queryQueue.length > 0) {
                query = queryQueue.pop();
            } else {
                query = {task: {type: "noQuery"}};
            }
        });
    }

    const submit = async (query2, res) => {
        if (queryQueue.length < 5 && !querying) {
            pullQueries(10).then(res => {
                console.log(queryQueue, res);
                queryQueue = [...queryQueue, ...res];
                querying = false;

                if (query === undefined) {
                    if (queryQueue.length > 0) {
                        query = queryQueue.pop();
                    } else {
                        query = {task: {type: "noQuery"}};
                    }
                }
            });
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
    <p> Loading </p>
{:else}
    {#if query.task.type == "noQuery"}
        <p>Welp no query found for you :/</p>
        <button on:click={refresh}>Try refresh</button>
    {:else}
        <svelte:component this={Raters[query.task.type]} on:submit={(data) => submit(query, data.detail)} task={query.task}/>
    {/if}
{/if}
<style>
    .header {
        display: flex;
        align-items: center;
        flex-direction: column;    
    }
</style>