<script>
	import { createEventDispatcher } from 'svelte';
    import CorpusBox from '../textbox/CorpusBox.svelte';

	const dispatch = createEventDispatcher();

    export let task;
    // let prompt;
    // $: prompt = query.prompt;

    // let rankedAnswers;
    // $: rankedAnswers = query.answers;

    // query is the data containing what to evaluate

    let sorted = [];

    const submit = () => {
        dispatch('submit', {sorted: sorted});
    }
    const reset = () => {
        sorted= [];
    }
</script>

Order from best at top to worst at bottom

<div class="question">
    <CorpusBox content={task.prompt.content} label="Question"/>
</div>
<div class="content">
    {#each task.answers as answer}
        {@const th = sorted.indexOf(answer.answerId)}
        <CorpusBox content={answer.content} label={`Answer #${answer.answerId}`} badge={th == -1 ? undefined : th+1}
        on:click={() => {
            console.log("a");
            if (th == -1) sorted = [...sorted, answer.answerId];
        }}/>
    {/each}
</div>
<div class="submit">
    <button on:click={reset}>Reset</button>
    <button on:click={submit}>Submit</button>
</div>

<style>
    .content {
        display: grid;
        flex-wrap: wrap;
        grid-template-columns: repeat(auto-fit,minmax(20em, 1fr));
    }
    .question {
        display: flex;
    }
    button {
        display: flex;
        padding: 0.5em;
        font-size: 2em;
        background-color: gray;
        border-radius: 0.5em;
    }
    .submit {
        display: flex;
        flex-direction: row;
        justify-content: end;
        padding: 1em;
    }
</style>