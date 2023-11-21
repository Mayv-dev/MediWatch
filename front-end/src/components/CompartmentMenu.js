import { useState , useEffect } from "react"

function CompartmentMenu(props) {
    let doses = []
    let medications = []
    let date, hours, minutes

    let [selectedMedications, setSelectedMedications] = useState([])
    useEffect(()=> {
        setSelectedMedications([])
    },[props.selectedCompartment])

    props.schedule.map(scheduledDose => scheduledDose.compartment == props.selectedCompartment ? doses.push(scheduledDose) : null)

    doses = doses.map(dose => {
        medications = []
        date = new Date(dose.datetime)
        if(dose.medications != undefined) dose.medications.map(medication => medications.push(medication))
        return {'time':date,'medications':medications}
    })

    doses.sort((a,b) => a.time > b.time ? 1 : -1)

    doses = doses.map(dose => {
        hours = dose.time.getHours() < 10 ? `0${dose.time.getHours()}` : `${dose.time.getHours()}`
        minutes = dose.time.getMinutes() < 10 ? `0${dose.time.getMinutes()}` : `${dose.time.getMinutes()}`

        dose.medications = dose.medications.map(med => {
            return props.medications.map(outerMed => {
                if (med == outerMed.id) return outerMed.name
            })
        })

        return {'time':hours + ":" + minutes,'medications':dose.medications}
    })

    const handleMedClick = (time) => {
        let newSelections
        time.medications[0] != props.chosenBox || time.medications.length != 0 ? newSelections = time.medications : newSelections = []
        setSelectedMedications(newSelections)
    }

    return (
        <div id="compartment-menu" className="flex justify-evenly bg-white h-40 w-10/12">
            <div id="time-column" class="flex-column bg-gray-200 w-50 mx-10">
                <h2>Doses</h2>
                <ul>{doses.length === 0 ? <li>No medication to be taken</li> : doses.map(dose => <li onClick={() => handleMedClick(dose)}>{dose.time}</li>)}</ul>
            </div>
            <div id="med-column" className="flex-column bg-gray-200 w-50 mx-10">
                <h2>Medications</h2>
                <ul>{selectedMedications.length === 0 ? null : doses.map(time => time.medications.map(med => <li>{med}</li>))}</ul>
            </div>     
        </div>
    )
}

export default CompartmentMenu;