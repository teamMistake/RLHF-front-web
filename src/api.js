import { derived, get, writable } from "svelte/store";

export const API_URL = "http://localhost:8080"

export const API_TOKEN = writable(undefined);

API_TOKEN.set(localStorage.getItem("token"));
API_TOKEN.subscribe(val => {
    if (val)
        localStorage.setItem("token", val);
    else
        localStorage.removeItem("token");
});

export const USER_INFO = derived(API_TOKEN, token => {
    if (token == undefined) return undefined;
    let claims = token.split(".")[1];
    let plainText = atob(claims);
    let json = JSON.parse(plainText);
    return {
        userId: json.sub,
        nickname: json.name
    };
})