import { useState , useEffect } from "react"

function CompartmentMenu(props) {
    let chosenComparment = []
    let medications = []
    let date, hours, minutes

    //props.pillbox.map(e =>console.log(e))
    //console.log(props.medications)
    //console.log(props.selectedCompartment)

    let [selectedMedications, setSelectedMedications] = useState([])
    useEffect(()=> {
        setSelectedMedications([])
    },[props.selectedCompartment])

    props.pillbox.map(compartmentInfo => compartmentInfo.id == props.selectedCompartment ? chosenComparment.push(compartmentInfo) : null)

    console.log(chosenComparment)

    chosenComparment = chosenComparment.map(dose => {
        medications = []
        date = new Date(dose.datetime)
        if(dose.medications != undefined) dose.medications.map(medication => medications.push(medication))
        return {'time':date,'medications':medications}
    })

    chosenComparment.sort((a,b) => a.time > b.time ? 1 : -1)

    chosenComparment = chosenComparment.map(dose => {
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
        <div id="compartmentInfo-menu" className="flex justify-center bg-white h-40 w-10/12">
            <div id="time-column" class="flex-column w-1/4">
                <h2>Doses</h2>
                <ul>{chosenComparment.length === 0 ? <li>No medication to be taken</li> : chosenComparment.map(dose => <li onClick={() => handleMedClick(dose)}>{dose.time}</li>)}</ul>
            </div>
            <div id="med-column" className="flex-column w-1/4">
                <h2>Medications</h2>
                <ul>{selectedMedications.length === 0 ? null : chosenComparment.map(dose => dose.medications.map(medication => <li>{medication}</li>))}</ul>
            </div>     
        </div>
    )
}

export default CompartmentMenu;