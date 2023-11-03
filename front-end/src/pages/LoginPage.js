// The form method should be switched to POST asap

import { useState } from "react"
import { useNavigate } from "react-router-dom";

// Form code was made with help from https://www.w3schools.com/react/react_forms.asp

function LoginPage() {
    const [inputs, setInputs] = useState({}) 
    const successfulLogin = useNavigate() // As the <redirect> component used in Full stack Development has been discontinued, we must now use useNavigate()
                                          // used code by Noushad from https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router

    const handleSubmit = (e) => {
        e.preventDefault();

        //The below logs must be removed, especially password
        console.log("Username: " + inputs.username)
        console.log("Password: " + inputs.password)

        successfulLogin("/home")
    }

    const handleChange = (e) => {
        setInputs(values => ({...values, [e.target.name]: e.target.value}))
    }

    //The icon to reveal/hide password could be improved by us, as the option disappears entirely after clicking away
    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange}/>
            <input name="password" type="password" onChange={handleChange}/>
            <input type="submit" value="Enter App"/>
        </form>
    )
}

export default LoginPage