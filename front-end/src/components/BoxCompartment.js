function BoxCompartment(props) {
    return (
        <div onClick={() => props.selected(props.compartmentInfo.compartment)}>
            <p>{props.compartmentInfo.compartment}</p>
            <p>{props.compartmentInfo.doseDatetime}</p>
        </div>
    )
}

export default BoxCompartment