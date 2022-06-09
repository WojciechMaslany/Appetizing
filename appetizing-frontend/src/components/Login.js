import axios from "axios";
import React from "react";
import { useState } from "react";
import { variables } from "../Variables"

export default function Login() {

    const [user, setUser] = useState({email: "", password: ""});

    function login(event) {
        event.preventDefault();

        axios.post(variables.API_URL + 'User/authenticate', {
            email: user.email,
            password: user.password,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <div>
                <input 
                    name="email" 
                    type="text" 
                    label="Email" 
                    value={user.email} 
                    onChange={(event) => setUser({...user, email: event.target.value})}></input>
                <input 
                    name="password" 
                    type="password" 
                    label="Password"
                    value={user.password}
                    onChange={(event) => setUser({...user, password: event.target.value})}></input>
                <button onClick={login}>Login</button>
            </div>
        </div>
    )
}