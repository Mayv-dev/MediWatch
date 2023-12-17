import BoxCompartment from "./BoxCompartment"
import { useState } from 'react'
import CompartmentMenu from "./CompartmentMenu"

function MedicationBox(props) {
    const [chosenBox, setChosenBox] = useState({compartment: null})

    const pillbox = props.schedule
    const schedule = props.schedule
    const medications = props.userInfo.medications

    const handleSelection = (chosenCompartment) => setChosenBox(pillbox.find(compartment => compartment.id == chosenCompartment).id)

    return (
        <div id="medication-box-container" className="w-10/12 h-1/3">
            <div id="medication-box" className="w-11/12 h-60 m-auto">
                {pillbox == undefined ? <h1 class="text-white text-5xl text-center">You have no doses set, you may add some in the <span class="text-[#dddd55]">Doses</span> page</h1>:
                pillbox.map(item => 
                    <BoxCompartment key={item.id} identifier={item.id} schedule={schedule} colour={chosenBox === item.id} onSelection={handleSelection}  />)
                }
            </div>
            {pillbox == undefined ? null 
                : 
                chosenBox.compartment !== null ? <CompartmentMenu pillbox={pillbox} medications={medications} selectedCompartment={chosenBox} /> 
                    : 
                    <h1 class="text-white text-5xl text-center">Click a box to see it's scheduled doses</h1>}
        </div>
    )
}

export default MedicationBox