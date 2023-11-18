function BoxCompartment(props) {
    let selected = props.colour ?  "compartmentDivSelected" : "compartmentDiv"
    return (
        <div className={selected + " bg-white h-20 w-auto"} onClick={() => props.selected(props.compartmentInfo.compartment)}>
            <p>{props.compartmentInfo.compartment}</p>
            <p>{props.compartmentInfo.doseDatetime}</p>
        </div>
    )
}

export default BoxCompartment