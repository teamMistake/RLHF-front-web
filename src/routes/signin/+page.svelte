<script>
    import { API_TOKEN, API_URL } from "../../api";
    import Loading from "../../components/loading/Loading.svelte";


    let username, password;

    let loading = false;
    let warning = '';
    $: {
        username, password;
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

    const signin = async () => {
        loading = true;
        try {
            let formdata = new FormData();
            let res = await fetch(`${API_URL}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (res.status != 200) throw new Error(`HTTP ${res.status} : ${await res.text()}`);
            $API_TOKEN = `Bearer ${await res.text()}`;
            location.href = "/";
        } catch (e) {
            warning = e.toString();
        }
        loading = false;
    }
</script>
<Loading show={loading}/>

<div class="container">
<div class="signin">
    <h1>Sign In</h1>
    <input type="text" placeholder="username" bind:value={username}/>
    <input type="password" placeholder="password" bind:value={password}/>
    <button on:click={signin}>Signin</button>
    {#if warning !== ''}
        <span class="warning">{warning}</span>
    {/if}

    <a href="/signup">Or signup</a>
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