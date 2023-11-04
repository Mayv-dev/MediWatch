import MedicationBox from "../components/MedicationBox"
import { useState, useEffect } from "react"

// let temp = [
//     { "compartment": "1", "doseDatetime": "3-11-23 17:00" },
//     { "compartment": "2", "doseDatetime": "3-11-23 17:00" },
//     { "compartment": "3", "doseDatetime": "3-11-23 17:00" },
//     { "compartment": "4", "doseDatetime": "3-11-23 17:00" },
//     { "compartment": "5", "doseDatetime": "3-11-23 17:00" },
//     { "compartment": "6", "doseDatetime": "3-11-23 17:00" },
//     { "compartment": "7", "doseDatetime": "3-11-23 17:00" },
// ]

function HomePage() {
    const URL = "https://demo0726818.mockable.io/dose-data"
    const [data, setData] = useState();

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
        return (
            <>
                <h1>This is the HomePage</h1>
                <MedicationBox compartments={data} />
            </>
        )
    } 

    return (
        <>
            <h1>This is the HomePage</h1>
        </>
    )
}

export default HomePage