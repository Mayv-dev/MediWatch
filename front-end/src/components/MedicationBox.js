import BoxCompartment from "./BoxCompartment"

function MedicationBox(props) {

    const handleSelection = (compartmentNumber) => {
        console.log("You have chosen compartment " + compartmentNumber)
    }

    return (
        <div id="medication-box">
            {props.compartments.map(item => 
            <BoxCompartment compartmentInfo={item} selected={handleSelection} key={item.compartment}/>)}
        </div>
    )
}

export default MedicationBox