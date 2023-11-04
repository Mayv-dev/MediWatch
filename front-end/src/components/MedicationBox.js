import BoxCompartment from "./BoxCompartment"
import { useState } from 'react'
import CompartmentMenu from "./CompartmentMenu"

function MedicationBox(props) {
    const [chosenBox, setChosenBox] = useState({compartment: null})

    const handleSelection = (compartmentNumber) => {
        console.log("You have chosen compartment " + compartmentNumber)
        const chosenCompartment = props.compartments.find(item => item.compartment == compartmentNumber)
        setChosenBox(chosenCompartment)
    }

    return (
        <div id="medication-box-container">
            <div id="medication-box">
                {props.compartments.map(item =>
                    <BoxCompartment compartmentInfo={item} colour={chosenBox.compartment === item.compartment} selected={handleSelection} key={item.compartment} />)
                }
            </div>
            {chosenBox.compartment !== null && <CompartmentMenu compartment={chosenBox}/>}
        </div>
    )
}

export default MedicationBox