import { useLocation, useNavigate } from "react-router-dom";
import MedicationBox from "../components/MedicationBox"
import { useState, useEffect } from "react"



function HomePage() {
    const URL = "https://demo0726818.mockable.io/dose-data"
    const [data, setData] = useState();
    const {state} = useLocation(); // useLocation code taken from Drew Reese's answer to https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const noLogin = useNavigate()

    useEffect(() => {
        fetch(URL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((responseData) => setData(responseData))
        .then(console.log(data))
        .catch((error) => {
            console.error('Error', error)
        })
    }, [])

    if(data) {
        console.log("State:")
        console.log(state)
        if(state == null) noLogin("/login")
        return (
            <div className="w-screen h-screen flex flex-col align-center justify-center items-center">
                <h1>This is the HomePage</h1>
                <MedicationBox compartments={data} />
            </ div>
        )
    } 

    return (
        <>
            <h1>Loading</h1>
        </>
    )
}

export default HomePage