import BoxCompartment from "./BoxCompartment"
import { useState } from 'react'
import CompartmentMenu from "./CompartmentMenu"

function MedicationBox(props) {
    const [chosenBox, setChosenBox] = useState({compartment: null})

    const handleSelection = (compartmentNumber) => {
        console.log("You have chosen compartment " + compartmentNumber)
        const chosenCompartment = props.compartments.pillbox.compartments.find(item => item.id == compartmentNumber)
        setChosenBox(chosenCompartment)
    }

    return (
        <div id="medication-box-container" className="w-10/12">
            <div id="medication-box" className="w-100">
                {props.compartments.pillbox.compartments.map(item =>
                    <BoxCompartment compartmentInfo={item} schedule={props.compartments.schedule} colour={chosenBox.id === item.id} selected={handleSelection} key={item.compartment} />)
                }
            </div>
            {chosenBox.compartment !== null && <CompartmentMenu compartment={chosenBox}/>}
        </div>
    )
}

export default MedicationBox