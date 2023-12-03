import {SERVER_HOST, REACT_PUBLIC_GOOGLE_CLIENT_ID} from "../config/global_constants";
import { GoogleLogin } from 'react-google-login';
import { useState, useEffect } from "react"
import { gapi } from 'gapi-script';

// Form code was made with help from https://www.w3schools.com/react/react_forms.asp
// GoogleLogin and gapi code was taken from https://stackoverflow.com/questions/72172877/having-a-trouble-with-google-oauth2-app-has-no-backend-so-client-side-only

function LoginPage(props) {
    const [inputs, setInputs] = useState({}) 
    const [invalidCredentials, setInvalidCredentials] = useState(false) 

    const handleSubmit = (e) => {
        e.preventDefault();
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
        .then(response => response.status == 200 ? props.handleUserData(response.data) : setInvalidCredentials(true))
        .catch((error) => {
            console.error('Error')
        })
    }

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: REACT_PUBLIC_GOOGLE_CLIENT_ID,
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);
    
    
      // **you can access the token like this**
      // const accessToken = gapi.auth.getToken().access_token;
      // console.log(accessToken);
    
      const onSuccess = response => {
        fetch(`${SERVER_HOST}/user/googlelogin`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
              email:response.profileObj.email
          }),
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then((response) => response.json())
      .then(response => response.status == 200 ? props.handleUserData(response.data) : setInvalidCredentials(true))
      .catch((error) => {
          console.error('Error')
      })
      };
      const onFailure = response => {
        console.log('FAILED', response);
      };

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }

    const handleChange = (e) => {
        setInputs(values => ({...values, [e.target.name]: e.target.value}))
    }

    //The icon to reveal/hide password could be improved by us, as the option disappears entirely after clicking away
    return (
        <form className="w-screen h-screen flex flex-col align-center justify-center items-center" onSubmit={handleSubmit}>

            <h1 class="text-5xl text-commonTitle-900 my-10">Log In</h1>
            
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



            {invalidCredentials ? <div className="bg-rose-600 p-2 text-white"><p>The supplied user information is invalid, please try again</p></div>:null}
            
            <div className="flex flex-col w-full justify-center items-center mx-auto">
              <input className="my-2 border-2 w-24 border-black p-2 rounded-lg bg-blue-300" type="submit" value="Enter App"/>

              <p className="my-1 text-white">or</p>

              <div className=" w-42 my-2">
                <GoogleLogin
                  clientId={REACT_PUBLIC_GOOGLE_CLIENT_ID}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                />
              </div>

              </div>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>

        </form>
    )
}

export default LoginPage