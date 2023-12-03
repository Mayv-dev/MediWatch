import {SERVER_HOST, REACT_PUBLIC_GOOGLE_CLIENT_ID} from "../config/global_constants";
import { GoogleLogin } from 'react-google-login';
import { useState, useEffect } from "react"
import { gapi } from 'gapi-script';

// Form code was made with help from https://www.w3schools.com/react/react_forms.asp
// GoogleLogin and gapi code was taken from https://stackoverflow.com/questions/72172877/having-a-trouble-with-google-oauth2-app-has-no-backend-so-client-side-only

function RegisterPage(props) {
    const [inputs, setInputs] = useState({}) 

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${SERVER_HOST}/user/register`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
              Email:inputs["email"],
              Password:inputs["password"]
          }),
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then((response) => response.json())
      .then(response => response.status == 201 ? handleSuccessfulRegister() : console.log(response))
      .catch((error) => {
          console.error('Error')
      })
  }

  const handleSuccessfulRegister = () => {
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
        .then(response => {
          console.log(response.data)
          props.handleUserData(response.data)
        })
        .catch((error) => {
            console.error('Error')
        })
  }

  const handleChange = (e) => {
    setInputs(values => ({...values, [e.target.name]: e.target.value}))
}

    return (
        <form className="w-screen h-screen flex flex-col align-center justify-center items-center" onSubmit={handleSubmit}>

            <h1 class="text-5xl text-commonTitle-900 my-10">Register</h1>
            
            <input 
                className="my-2 border-2 w-52 border-white p-1 rounded-sm bg-slate-100" 
                placeholder="Email" 
                name="email" 
                onChange={handleChange}
            />
            <input 
                className="my-2 border-2 w-52 border-white p-1 rounded-sm bg-slate-100" 
                placeholder="Password" 
                name="password" 
                type="password" 
                onChange={handleChange}
            />
            
            <div className="flex flex-col w-full justify-center items-center mx-auto">
              <input className="my-2 border-2 w-24 border-black p-2 rounded-lg bg-blue-300" type="submit" value="Enter App"/>
            </div>
            
            <button onClick={e=>props.handlePageSwitch("login")}>Login</button>

        </form>
    )
}

export default RegisterPage