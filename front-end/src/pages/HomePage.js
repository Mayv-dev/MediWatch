import { useLocation, useNavigate } from "react-router-dom";
import MedicationBox from "../components/MedicationBox"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar";

function HomePage() {
    const {state} = useLocation(); // useLocation code taken from Drew Reese's answer to https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const noLogin = useNavigate()

    useEffect(() => {
        if(state == null) noLogin("/login")
    }, [])

    //The nav element is a template taken from https://flowbite.com/docs/components/navbar/ , modified to suit our project

    if(state != null) {
        return (
            <>
            <Navbar/>
            <div className="w-screen bg-commonBG-100 h-screen flex flex-col align-center justify-center items-center">
                <MedicationBox userInfo={state.loggedInUser} />
            </ div>
            </>
        )
    }
}

export default HomePage