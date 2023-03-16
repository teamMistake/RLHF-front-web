<script>
	import { createEventDispatcher } from 'svelte';
    import CorpusBox from '../textbox/CorpusBox.svelte';
    import SortableList from 'svelte-sortable-list';

	const dispatch = createEventDispatcher();

    export let query;
    let sorted;
    $: sorted = query.answers;
    // let prompt;
    // $: prompt = query.prompt;

    // let rankedAnswers;
    // $: rankedAnswers = query.answers;

    // query is the data containing what to evaluate

    const submit = () => {
        dispatch('submit', {query: query, rated: sorted});
    }
</script>

Order from best at top to worst at bottom

<div class="question">
    <CorpusBox content={query.prompt.content} label="Question"/>
</div>
<div class="content">
    <SortableList list={sorted} on:sort={(ev) => {sorted = ev.detail;}} let:item key="answerId">
        <CorpusBox content={item.content} label={`Answer #${item.answerId}`}/>
    </SortableList>
</div>
<div class="submit">
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