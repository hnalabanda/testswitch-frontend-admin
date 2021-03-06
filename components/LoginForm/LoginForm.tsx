﻿import React, {FormEvent, useState} from "react";
import scss from "./LoginForm.module.scss";
import {useRouter} from "next/router";
import getConfig from "next/config";


export function LoginForm(): JSX.Element {
    const {publicRuntimeConfig} = getConfig();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const router = useRouter();

    function credentialsAreValid(statusCode: number): boolean {
        switch (statusCode) {
            case 200:
                return true;
            case 400:
                alert("Please enter a valid email and password.")
                return false
            case 401:
                alert("Incorrect login details")
                return false
            default:
                alert("Something went wrong, please try again.");
                return false;
        }
    }
    
    function assertThatCredentialsAreValid (response: Response): Response {
        if (!credentialsAreValid(response.status)){
            throw new Error (response.statusText)
        }
        return response
    }

    function tryLogin(event: FormEvent): void {
        const ATTEMPT_SIGN_IN_API_URL = publicRuntimeConfig.API_URL + "/sign-in";
        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('password', userPassword);

        fetch(ATTEMPT_SIGN_IN_API_URL, {
            method: 'POST',
            body: formData
        })
            .then(assertThatCredentialsAreValid)
            .then(response => response.json())
            .then (json => {
                document.cookie = `sessionId=${json.sessionId}; Secure; SameSite=lax`
            })
            .then(() => router.push('/candidates'))
            .catch(error => {
                console.log(error)
            });
        event.preventDefault();
    }

    return (
        <form onSubmit={tryLogin} className={scss.form}>
            <label className={scss.label}>
                Email:
                <br/>
                <input
                    className={scss.input}
                    type={"email"}
                    value={userEmail}
                    onChange={event => setUserEmail(event.target.value)}
                    required={true}
                />
            </label>
            <label className={scss.label}>
                Password:
                <br/>
                <input
                    className={scss.input}
                    type={"password"}
                    value={userPassword}
                    onChange={event => setUserPassword(event.target.value)}
                    required={true}
                />
            </label>
            <button className={scss.login} type="submit">Log in</button>
        </form>
    );
} 