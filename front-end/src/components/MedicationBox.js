import BoxCompartment from "./BoxCompartment"
import { useState } from 'react'
import CompartmentMenu from "./CompartmentMenu"

function MedicationBox(props) {
    const [chosenBox, setChosenBox] = useState({compartment: null})

    const handleSelection = (compartmentNumber) => {
        console.log("You have chosen compartment " + compartmentNumber)
        console.log(props.compartments.pillbox.compartments.find(item => item.id == compartmentNumber))
        setChosenBox(props.compartments.pillbox.compartments.find(item => item.id == compartmentNumber).id)
        console.log(chosenBox)
    }

    return (
        <div id="medication-box-container" className="w-10/12">
            <div id="medication-box" className="w-100">
                {props.compartments.pillbox.compartments.map(item =>
                    <BoxCompartment compartmentInfo={item} schedule={props.compartments.schedule} colour={chosenBox === item.id} selected={handleSelection} key={item.compartment} />)
                }
            </div>
            {chosenBox.compartment !== null && <CompartmentMenu schedule={props.compartments.schedule} compartment={chosenBox}/>}
        </div>
    )
}

export default MedicationBox