import { useEffect, useState } from "react"
import {SERVER_HOST} from "../config/global_constants";

function ScheduleMenu(props) { 
    let [inputError,setInputError] = useState(false)

    
    let [newMedications,setNewMedications] = useState([])
    let [newDate,setNewDate] = useState()
    let [newTime,setNewTime] = useState()
    let [newCompartment,setNewCompartment] = useState()

    let [newDateTime,setNewDateTime] = useState()

    let [missingValues,setMissingValues] = useState(["bg-white","bg-white","bg-white","bg-white"])

    const handleNewDose = (value) => {
        let hours,minutes,x,medIDs,e;
        try {
            if(newCompartment == null) throw console.error();
            e = Date.parse(newDate)
            console.log(e)
            hours = newTime.substring(0,2)
            hours = parseInt(hours) * 3600000
            minutes = newTime.substring(3)
            minutes = parseInt(minutes) * 60000
            e = e+hours+minutes
            x = new Date(e).toISOString()
            setNewDateTime(x.toString())
            console.log(newDateTime)
            console.log(newCompartment)
            if(newMedications.length == 0) throw console.error();
            medIDs = newMedications.map(newMed => newMed.id)
            console.log(medIDs)
            }
        catch(e) {
            setInputError(true)
            let missingCheck = [false, false, false, false]
            missingCheck[0] = newMedications.length == 0 ? "bg-red-200" : "bg-white"
            missingCheck[1] = newDate == null || newDate == "" ? "bg-red-200" : "bg-white"
            missingCheck[2] = newTime == null || newTime == "" ? "bg-red-200" : "bg-white"
            missingCheck[3] = newCompartment == null || newCompartment == "" ? "bg-red-200" : "bg-white"
            setMissingValues(missingCheck)
            return
        }
        setInputError(false)

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
        if (newMedications.find(newMed => newMed.id == medicationID)) return
        let medicationName = (med.substring(med.indexOf("||")+2))
        let array = newMedications.map(newMed => newMed)
        array.push({"id":medicationID,"name":medicationName})
        setNewMedications(array)
    }

    const handleMedDelete = (med) => setNewMedications(newMedications.filter(newMed => newMed.id != med.id))

    return (
        <>
        <div className="flex flex-col items-center m-auto w-1/2 h-3/4">
                <div className="flex flex-col items-center border-t-2 h-full border-2 w-3/5 m-auto rounded-md border-gray-300 bg-white">
                    <h2 className="border-b-2 rounded-tr rounded-tl w-full border-gray-300 bg-gray-200 mb-5">Add Dose</h2>
                    <label className="mt-3" for="Medication">Medication: </label>
                    <ul className="flex flex-row justify-center w-full">
                        {newMedications.length == 0 ? <li>No medications to display</li> :
                        newMedications.map(med => <li onClick={e => handleMedDelete(med)} className="border-2 border-black rounded-md bg-white hover:bg-red-400 mx-0.5 my-2  p-0.5">{med.name}</li>)}
                    </ul>
                    <select className={"flex flex-col border-2 border-gray-300 rounded-md w-4/6 mx-auto "+missingValues[0]} name="Medication" onChange={e => handleMedSelect(e.target.value)}>
                        {props.meds == undefined ? null : props.meds.map(med => <option value={med.id + "||" + med.name}>{med.name}</option>)}
                    </select>
                    
                    <label className="mt-3" for="Date">Date: </label>
                    <input className={"border-2 border-gray-300 rounded-md w-4/6 mx-auto "+missingValues[1]} value={newDate} onChange={e => setNewDate(e.target.value)}type="date" name="Date"></input>
                    <label className="mt-3" for="Time">Time: </label>
                    <input className={"border-2 border-gray-300 rounded-md w-4/6 mx-auto "+missingValues[2]}  value={newTime} onChange={e => setNewTime(e.target.value)}type="time" name="Time"></input>
                    <label className="mt-3" for="Compartment">Compartment: </label>
                    <input className={"border-2 border-gray-300 rounded-md w-4/6 mx-auto "+missingValues[3]} type="number" min="1" max="7" value={newCompartment} onChange={e => setNewCompartment(e.target.value)}name="Compartment"></input>
                    {inputError ? <div className="mt-3 rounded bg-rose-600 p-2 text-white"><p>Error: Please fill in all fields</p></div>:null}
                    <button onClick={e => handleNewDose("test")}className="mt-3 w-3/4 my-auto text-center rounded-full bg-blue-400 border-2 border-gray-300 hover:bg-blue-500 active:bg-blue-700 px-3 py-1">Add a dose</button>
                </div>
            
        </div>
        </>
    )
}

export default ScheduleMenu