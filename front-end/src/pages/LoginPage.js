// The form method should be switched to POST asap
import {SERVER_HOST} from "../config/global_constants";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

// Form code was made with help from https://www.w3schools.com/react/react_forms.asp

function LoginPage() {
    const [inputs, setInputs] = useState({}) 
    const [invalidCredentials, setInvalidCredentials] = useState(false) 
    const successfulLogin = useNavigate() // As the <redirect> component used in Full stack Development has been discontinued, we must now use useNavigate()
                                          // used code by Noushad from https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router

    const handleSubmit = (e) => {
        e.preventDefault();
        let userFound = false;
        fetch(`${SERVER_HOST}/users`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((responseData) => responseData.data.map(user => user["email"] == inputs["email"] && user["password"] == inputs["password"] ? successfulLogin("/home", {state:{loggedInUser:user}}): setInvalidCredentials(true)))
        .catch((error) => {
            console.error('Error')
        })
    }

    const handleChange = (e) => {
        setInputs(values => ({...values, [e.target.name]: e.target.value}))
    }

    //The icon to reveal/hide password could be improved by us, as the option disappears entirely after clicking away
    return (
        <form className="w-screen h-screen flex flex-col align-center justify-center items-center" onSubmit={handleSubmit}>
            <h1 class="text-5xl text-yellow-200 my-4">MediWatch</h1>
            <input className="my-2 border-2 border-white p-1 rounded-sm bg-slate-100" placeholder="Email" name="email" onChange={handleChange}/>
            <input className="my-2 border-2 border-white p-1 rounded-sm bg-slate-100" placeholder="Password" name="password" type="password" onChange={handleChange}/>
            {invalidCredentials ? <div className="bg-rose-600 p-2 text-white"><p>The supplied user information is invalid, please try again</p></div>:null}
            <input className="my-3 border-2 border-black p-2 rounded-lg bg-blue-300" type="submit" value="Enter App"/>
        </form>
    )
}

export default LoginPage