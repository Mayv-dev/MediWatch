import BoxCompartment from "./BoxCompartment"
import {useState} from 'react'

function MedicationBox(props) {
    const [chosenBox, setChosenBox] = useState("")

    const handleSelection = (compartmentNumber) => {
        console.log("You have chosen compartment " + compartmentNumber)
        setChosenBox(compartmentNumber)
    }

    return (
        <div id="medication-box">
            {props.compartments.map(item => 
            <BoxCompartment compartmentInfo={item} colour={chosenBox === item.compartment} selected={handleSelection} key={item.compartment}/>)}
        </div>
    )
}

export default MedicationBox