import { useEffect, useState } from "react"
import {SERVER_HOST} from "../config/global_constants";

function ScheduleMenu(props) { 
    let [newDateTime,setNewDateTime] = useState()
    let [newDate,setNewDate] = useState()
    let [newTime,setNewTime] = useState()
    let [newCompartment,setNewCompartment] = useState()
    let [newMedications,setNewMedications] = useState([])
    let userPrescriptions = props.meds.map(med => {return {"id":med.id,"dose":med.dose}})


    const handleNewDose = (value) => {
        let e = Date.parse(newDate)
        console.log(e)
        let hours = newTime.substring(0,2)
        hours = parseInt(hours) * 3600000
        let minutes = newTime.substring(3)
        minutes = parseInt(minutes) * 60000
        e = e+hours+minutes
        let x = new Date(e).toISOString()
        setNewDateTime(x.toString())
        console.log(newDateTime)
        console.log(newCompartment)
        let medIDs = newMedications.map(newMed => newMed.id)
        console.log(medIDs)

        fetch(`${SERVER_HOST}/user/${props.userID}/schedule`, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify({
                datetime:newDateTime,
                compartment:parseInt(newCompartment),
                medications:medIDs
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then(response => response.status == 200 ? props.handleUserData(response.data) : console.log("something happened"))
        .catch((error) => {
            console.error('Error')
        })
    }

    const handleMedSelect = (med) => {
        console.log(med)
        let medicationID = (med.substring(0,med.indexOf("||")))
        let medicationName = (med.substring(med.indexOf("||")+2))
        let sizeCheck = newMedications.filter(newMed => newMed.id == medicationID)
        let array = newMedications.map(newMed => newMed)
        array.push({"id":medicationID,"name":medicationName})
        sizeCheck.length != 0 ? setNewMedications(newMedications.filter(newMed => newMed.id != medicationID)) : setNewMedications(array)
    }
    return (
        <>
        <div className="w-1/2">
            <h2>Schedule</h2>
            <ul>
                {newMedications.map(med => <li>{med.name}</li>)}
            </ul>
            <select onChange={e => handleMedSelect(e.target.value)}>
                {props.meds.map(med => <option value={med.id + "||" + med.name}>{med.name}</option>)}
            </select>
            <input value={newDate} onChange={e => setNewDate(e.target.value)}type="date" name="Date"></input>
            <input value={newTime} onChange={e => setNewTime(e.target.value)}type="time" name="Time"></input>
            <input type="number" min="1" max="7" value={newCompartment} onChange={e => setNewCompartment(e.target.value)}name="Compartment"></input>
            <button onClick={e => handleNewDose("test")}className="rounded-full bg-red-500 hover:bg-red-700 active:bg-red-900 px-3 py-1">Add a dose</button>
        </div>
        </>
    )
}

export default ScheduleMenu