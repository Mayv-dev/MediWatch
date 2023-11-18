function BoxCompartment(props) {
    let selected = props.colour ?  "compartmentDivSelected" : "compartmentDiv"
    return (
        <div className={selected + " bg-white h-20 w-20"} onClick={() => props.onSelection(props.identifier)}>
        </div>
    )
}

export default BoxCompartment