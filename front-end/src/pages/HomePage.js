import { useLocation, useNavigate } from "react-router-dom";
import MedicationBox from "../components/MedicationBox"
import { useState, useEffect } from "react"



function HomePage() {
    const [data, setData] = useState();
    const {state} = useLocation(); // useLocation code taken from Drew Reese's answer to https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const noLogin = useNavigate()

    useEffect(() => {
        if(state == null) noLogin("/login")
    }, [])

    if(state != null) {
        return (
            <div className="w-screen h-screen flex flex-col align-center justify-center items-center">
                <h1>This is the HomePage</h1>
                <MedicationBox compartments={state.loggedInUser.pillbox.compartments} />
            </ div>
        )
    }
}

export default HomePage