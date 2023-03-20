<script>
    import Rater from "../components/rater/Rater.svelte";
    import UserInfo from "../components/userinfo/UserInfo.svelte";

    let query = undefined;

    let queryQueue = [];
    let querying = true;

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
        await timeout(2000);

        return Array.from({length: limit}, (v, i) => ({
            queryId: i,
            prompt: {
                promptId: '',
                content: 'Question'
            },
            answers: [{
                answerId: '1',
                content: 'A1'
            },{
                answerId: '2',
                content: 'A2'
            },{
                answerId: '3',
                content: 'A3'
            },{
                answerId: '4',
                content: 'A4'
            }]
        }));
    }
    pullQueries(10).then(res => {
        querying = false;
        queryQueue = res;
        query = queryQueue.pop();
    });

    const submit = (query, res) => {
        if (queryQueue.length < 5 && !querying) {
            querying = true;
            pullQueries(10).then(res => {
                queryQueue = [...queryQueue, ...res];
                querying = false;

                if (query === undefined)
                    query = queryQueue.pop();
            });
        }

        query = queryQueue.pop();

        console.log(query, res);
    }

</script>
<div class="header">
    <h1>RLHF Reward Model Trainer</h1>
    Below is the model output. Rate the outputs
    <UserInfo/>
</div>

{#if query === undefined}
    <p> Loading </p>
{:else}
    <Rater query={query} on:submit={submit}/>
{/if}
<style>
    .header {
        display: flex;
        align-items: center;
        flex-direction: column;    
    }
</style>