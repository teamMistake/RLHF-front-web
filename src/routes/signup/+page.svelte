<script>
    import Loading from "../../components/loading/Loading.svelte";

    let username, password, confirm, file;

    let passwordChk;
    $: {
        passwordChk = password === '' || password === confirm
    }
    let warning = '';
    $: {
        username;
        warning = '';
    }

    const timeout = (sec) => {
        let promise;
        setTimeout(() => {
            promise();
        }, sec);

        return new Promise((resolve, reject) => {
            promise = resolve;
        })
    }
    let loading = false;

    const signup = async () => {
        loading = true;
        await timeout(2000);
        loading = false;
        warning = "Username Taken";
    }
</script>
<Loading show={loading}/>
<div class="container">
    <div class="signin">
        <h1>Sign Up</h1>
        <input type="text" placeholder="username" bind:value={username}/>
        <input type="password" placeholder="password" bind:value={password}/>
        <input type="password" placeholder="confirm password" bind:value={confirm}/>
        {#if !passwordChk}
            <span class="warning">Password Does not Match</span>
        {/if}
        Student ID Pic
        <input type="file" placeholder="Student ID picture" bind:value={file}/>
        <button on:click={signup}>Sign Up</button>
        {#if warning !== ''}
            <span class="warning">{warning}</span>
        {/if}
    
        <a href="/signin">Or signin</a>
    </div>
    </div>
    
    <style>
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .signin {
            display: flex;
            flex-direction: column;
            max-width: fit-content;
            gap: 0.5em;
        }
    </style>