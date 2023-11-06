function BoxCompartment(props) {
    return (
        <div className={props.colour ?  "compartmentDivSelected" : "compartmentDiv"} onClick={() => props.selected(props.compartmentInfo.compartment)}>
            <p>{props.compartmentInfo.compartment}</p>
            <p>{props.compartmentInfo.doseDatetime}</p>
        </div>
    )
}

export default BoxCompartment