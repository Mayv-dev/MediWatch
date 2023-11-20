import { useState , useEffect } from "react"

function CompartmentMenu(props) {
    //TODO: Exchange time.medication ids with props.medications names in line 28
    let times = []
    let medications = []
    let [selectedMedications, setSelectedMedications] = useState([])
    useEffect(()=> {
        setSelectedMedications([])
    },[props.selectedCompartment])

    let date, hours, minutes, timestring
    props.schedule.map(scheduledDose => scheduledDose.compartment == props.selectedCompartment ? times.push(scheduledDose) : null)
    times = times.map(time => {
        date = new Date(time.datetime)
        medications = []
        if(time.medications != undefined) time.medications.map(medication => medications.push(medication))
        console.log({'time':date,'medications':medications})
        return {'time':date,'medications':medications}
    })
    times.sort((a,b) => a.time > b.time ? 1 : -1)
    times = times.map(time => {
        hours = time.time.getHours()
        if (hours < 10) hours = `0${hours}`
        minutes = time.time.getMinutes()
        if (minutes < 10) minutes = `0${minutes}`
        timestring = hours + ":" + minutes
        time.medications = time.medications.map(med => {return props.medications.map(outerMed => {
            if (med == outerMed.id) return outerMed.name})})
        return {'time':timestring,'medications':time.medications}
    })
    console.log(times)

    const handleMedClick = (time) => {
        let newSelections
        time.medications[0] != props.chosenBox || time.medications.length != 0 ? newSelections = time.medications : newSelections = []
        setSelectedMedications(newSelections)
    }

    return (
        <div id="compartment-menu" className="flex justify-stretch bg-white h-40 w-10/12">
            <div id="time-column" class="flex-column bg-gray-200 w-50 mx-10">
                <h2>Doses</h2>
                <ul>{times.length === 0 ? <li>No medication to be taken</li> : times.map(time => <li onClick={() => handleMedClick(time)}>{time.time}</li>)}</ul>
            </div>
            <div id="med-column" className="flex-column w-50 mx-10">
            <h2>Medications</h2>
            {selectedMedications.length === 0 ? null : 
                                                            <ul>{times.map(time => time.medications.map(med => <li>{med}</li>))}</ul>
                                                       }</div>
            
        </div>
    )
}

export default CompartmentMenu;