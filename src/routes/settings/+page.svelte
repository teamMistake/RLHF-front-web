<script>
    import { API_TOKEN, API_URL } from "../../api";
    import Loading from "../../components/loading/Loading.svelte";


    let oldpassword, confirmpassword, newpassword;

    let nickname;
    let loading = false;

    const changePassword = async () => {
        if (confirmpassword != newpassword) {
            alert("Password no match");
            return;
        }
        loading = true;

        try {
            let resp = await fetch(`${API_URL}/users/password`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: $API_TOKEN
                },
                body: JSON.stringify({oldPassword: oldpassword, newPassword: newpassword})
            });
            if (resp.status !== 200) throw new Error(resp.status+" "+resp.statusText+": "+await resp.text());
            alert("Successfully changed!");
        } catch (e) {
            alert("Error: "+e.toString());   
        }
        loading = false;
    };

    const changeNickname = async () => {
        loading = true;
        try {
            let resp = await fetch(`${API_URL}/users/nickname`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: $API_TOKEN
                },
                body: JSON.stringify({nickname: nickname})
            });
            if (resp.status !== 200) throw new Error(resp.status+" "+resp.statusText+": "+await resp.text());
            let token = await resp.text();
            $API_TOKEN = "Bearer "+token;
            alert("Successfully changed!");
        } catch (e) {
            alert("Error: "+e.toString());   
        }
        loading = false;
    }
</script>

<Loading show={loading}/>
<h1>
    Change Password
</h1>
<input type="password" placeholder="old password" bind:value={oldpassword}/>
<input type="password" placeholder="new password" bind:value={newpassword}/>
<input type="password" placeholder="confirm new password" bind:value={confirmpassword}/>
<button on:click={changePassword}>Change!</button>
<h1>
    Change nickname
</h1>
<input type="text" placeholder="new nickname" bind:value={nickname}/>
<button on:click={changeNickname}>Change!</button>