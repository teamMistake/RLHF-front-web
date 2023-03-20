<script>
    import Loading from "../../components/loading/Loading.svelte";
    import {API_TOKEN, API_URL} from "../../api";

    let username='', password='', confirm='', file=undefined, nickname='';

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
        if (!passwordChk) return;
        username = username.trim();
        nickname = nickname.trim();
        if (username === '') {
            warning = "Username is Empty";
            return;
        }
        if (password === '') {
            warning = "Password is Empty";
            return;
        }
        if (nickname === '') {
            warning = "Nickname is Empty";
            return;
        }
        console.log(file);
        if (file == undefined || file.length != 1) {
            warning = "Plase upload file";
            return;
        }

        loading = true;
        try {
            let formdata = new FormData();
            formdata.append("request", new Blob([JSON.stringify({
                    username: username,
                    password: password,
                    nickname: nickname
                })], {
                type: "application/json"
            }));
            formdata.append("idcard", file[0]);

            let res = await fetch(`${API_URL}/users/signup`, {
                method: "POST",
                body: formdata
            });
            if (res.status != 200) throw new Error(`HTTP ${res.status} : ${await res.text()}`);
            let body = await res.text();
            console.log(body);
            $API_TOKEN = body;
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
        <h1>Sign Up</h1>
        <input type="text" placeholder="username" bind:value={username}/>
        <input type="password" placeholder="password" bind:value={password}/>
        <input type="password" placeholder="confirm password" bind:value={confirm}/>
        {#if !passwordChk}
            <span class="warning">Password Does not Match</span>
        {/if}
        <input type="text" placeholder="nickname" bind:value={nickname}/>
        Student ID Pic
        <input type="file" placeholder="Student ID picture" bind:files={file} accept="image/png, image/jpeg"/>
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