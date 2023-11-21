// The form method should be switched to POST asap
import {SERVER_HOST} from "../config/global_constants";
import { useState } from "react"

// Form code was made with help from https://www.w3schools.com/react/react_forms.asp

function LoginPage(props) {
    const [inputs, setInputs] = useState({}) 
    const [invalidCredentials, setInvalidCredentials] = useState(false) 

    const handleSubmit = (e) => {
        e.preventDefault();
        let userFound = false;
        fetch(`${SERVER_HOST}/user/login`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                email:inputs["email"],
                password:inputs["password"]
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then(response => props.handleUserData(response.data))
        .catch((error) => {
            console.error('Error')
        })
    }

    const handleChange = (e) => {
        setInputs(values => ({...values, [e.target.name]: e.target.value}))
    }

    //The icon to reveal/hide password could be improved by us, as the option disappears entirely after clicking away
    return (
        <form className="w-screen bg-commonBG-900 h-screen flex flex-col align-center justify-center items-center" onSubmit={handleSubmit}>

            <h1 class="text-5xl text-commonTitle-900 my-4">MediWatch</h1>
            
            <input 
                className="my-2 border-2 border-white p-1 rounded-sm bg-slate-100" 
                placeholder="Email" 
                name="email" 
                onChange={handleChange}
            />
            <input 
                className="my-2 border-2 border-white p-1 rounded-sm bg-slate-100" 
                placeholder="Password" 
                name="password" 
                type="password" 
                onChange={handleChange}
            />

            {invalidCredentials ? <div className="bg-rose-600 p-2 text-white"><p>The supplied user information is invalid, please try again</p></div>:null}
            
            <input className="my-3 border-2 border-black p-2 rounded-lg bg-blue-300" type="submit" value="Enter App"/>

        </form>
    )
}

export default LoginPage